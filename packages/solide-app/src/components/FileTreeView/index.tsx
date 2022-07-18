import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from 'react-spring';
import { TransitionProps } from '@mui/material/transitions';
import { Folder, FolderOpenOutlined, InsertDriveFileOutlined } from '@mui/icons-material';
import { orange } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../core/redux/app/hooks';
import { openNewFile, selectWorkspace } from '../../core/redux/slices/workspaceSlice';
import { formatFileName } from '../../utils';
import { FileType } from '../../types';

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 10,
    paddingLeft: 10,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .${treeItemClasses.focused}`]: {
    color: orange[500],
  },
  [`& .${treeItemClasses.selected}`]: {
    color: orange[700],
  },
}));

export default function FileTreeView() {
  const { selectedWorkspace } = useAppSelector(selectWorkspace);
  const dispatch = useAppDispatch();

  const handleFileOpen = (file: FileType) => {
    dispatch(openNewFile(file));
  };

  const handleFileClick = (file: FileType) => {
    handleFileOpen(file);
  };

  const renderTreeView = (files: FileType[]): React.ReactNode[] => {
    return files.map<React.ReactNode>(file =>
      typeof file.content == 'string' ? (
        <StyledTreeItem
          key={file.id}
          nodeId={file.id}
          onClick={() => handleFileClick(file)}
          label={formatFileName(file)}
        />
      ) : (
        <StyledTreeItem key={file.id} nodeId={file.id} label={formatFileName(file)}>
          {renderTreeView(file.content)}
        </StyledTreeItem>
      )
    );
  };

  return (
    <TreeView
      aria-label="customized"
      defaultCollapseIcon={<FolderOpenOutlined style={{ fontSize: 13 }} />}
      defaultExpandIcon={<Folder style={{ fontSize: 13 }} />}
      defaultEndIcon={<InsertDriveFileOutlined style={{ fontSize: 13 }} />}
      style={{ textAlign: 'left' }}>
      {renderTreeView(selectedWorkspace.files)}
    </TreeView>
  );
}
