import React, { useEffect } from 'react';
import { theme } from '../../utils/theme';
import {
  Box,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import {
  AnchorOutlined,
  ComputerOutlined,
  FolderCopyOutlined,
  NoteAddOutlined,
  UploadFile,
} from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../core/redux/app/hooks';
import {
  selectWorkspace,
  setSelectedWorkspace,
  setWorkspaces,
} from '../../core/redux/slices/workspaceSlice';
import FileTreeView from '../FileTreeView';
import WorkspaceDbService from '../../services/WorkspaceDbService';

type Props = {};

const actions = [
  { actionName: 'Create a new file', icon: <NoteAddOutlined style={{ fontSize: 12 }} /> },
  { actionName: 'Create a new folder', icon: <FolderCopyOutlined style={{ fontSize: 12 }} /> },
  { actionName: 'Upload', icon: <UploadFile style={{ fontSize: 12 }} /> },
];

const FileExplorer = (props: Props) => {
  const dispatch = useAppDispatch();
  const { selectedWorkspace, workspaces } = useAppSelector(selectWorkspace);

  const handleSelectWorkspaceChange = (event: SelectChangeEvent<number>) => {
    const workspaceId = event.target.value as number;
    const workspace = workspaces.find(w => w.id === workspaceId);
    if (workspace) {
      dispatch(setSelectedWorkspace(workspace));
    }
  };

  useEffect(() => {
    const initWorkspaces = async () => {
      const workspaces = await WorkspaceDbService.getAllWorkspaces();
      dispatch(setWorkspaces(workspaces));
      dispatch(setSelectedWorkspace(workspaces[0]));
    };
    initWorkspaces();
  }, [dispatch]);

  return (
    <div style={{ padding: '20px 10px' }}>
      <FormControl size="small" fullWidth>
        <InputLabel id="workspace-input">Workspace</InputLabel>
        <Select
          style={{ backgroundColor: theme.palette.primary.dark, fontSize: 13, padding: '5px 0px' }}
          fullWidth
          labelId="select-workspace"
          id="select-workspace"
          value={selectedWorkspace.id}
          label="Workspace"
          onChange={handleSelectWorkspaceChange}>
          {workspaces.map(({ workspace, id }) => (
            <MenuItem key={id} value={id}>
              {workspace}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Chip
          style={{ backgroundColor: theme.palette.primary.dark, marginTop: 10 }}
          label={
            <div style={{ display: 'flex' }}>
              <AnchorOutlined fontSize="small" style={{ marginRight: 10 }} />
              Anchor
            </div>
          }
          variant="filled"
        />
        <Chip
          style={{ backgroundColor: theme.palette.primary.dark, marginTop: 10 }}
          label={
            <div style={{ display: 'flex' }}>
              <ComputerOutlined fontSize="small" style={{ marginRight: 10 }} />
              Local
            </div>
          }
          variant="filled"
        />
      </div>
      <Divider style={{ backgroundColor: grey[800], margin: '15px 0px 10px 0px' }} />
      <Box style={{ padding: '10px 16px', marginTop: 10 }}>
        <Stack>
          {actions.map(action => (
            <div
              key={action.actionName}
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
              }}>
              <Typography className="action-list-item" color={grey[500]} fontSize={12}>
                {action.actionName}
              </Typography>
              {action.icon}
            </div>
          ))}
        </Stack>
      </Box>
      <Divider style={{ backgroundColor: grey[800], margin: '15px 0px 10px 0px' }} />
      <Box>
        <Typography
          fontSize={13}
          fontWeight={600}
          color={'white'}
          style={{ marginBottom: 20, marginTop: 20 }}>
          File Explorer
        </Typography>
        <FileTreeView />
      </Box>
    </div>
  );
};

export default FileExplorer;
