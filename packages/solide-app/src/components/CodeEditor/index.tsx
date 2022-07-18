import Editor from '@monaco-editor/react';
import { CloseOutlined } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material';
import { grey, orange } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { extensionLanguageMap } from '../../constants/languageExtensionMap';
import { useAppDispatch, useAppSelector } from '../../core/redux/app/hooks';
import {
  removeFile,
  selectWorkspace,
  setSelectedFile,
} from '../../core/redux/slices/workspaceSlice';
import { FileChangeStatus, FileType } from '../../types';
import { formatFileName, formatFilePath } from '../../utils';

type Props = {};

const CodeEditor = (props: Props) => {
  const { openedFiles, selectedFile } = useAppSelector(selectWorkspace);
  const [value, setValue] = useState((selectedFile?.content as string) || '');
  const dispatch = useAppDispatch();

  const handleEditorChange = (value: any) => {
    setValue(value);
  };

  const handleCloseFile = (file: FileType) => {
    dispatch(removeFile(file));
  };

  const handleSwitchTab = (file: FileType) => {
    dispatch(setSelectedFile(file));
  };

  useEffect(() => {
    setValue((selectedFile?.content as string) || '');
  }, [selectedFile]);

  return (
    <React.Fragment>
      <Box>
        <Tabs defaultValue={1} onChange={() => {}} variant="scrollable" scrollButtons="auto">
          {openedFiles.map(file => (
            <Tab
              defaultChecked
              onClick={() => handleSwitchTab(file)}
              style={{
                textTransform: 'none',
                backgroundColor: selectedFile?.id === file.id ? '#1E1E1E' : 'transparent',
                color: selectedFile?.id === file.id ? 'white' : grey[600],
              }}
              label={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  {formatFileName(file)}
                  <CloseOutlined
                    onClick={() => handleCloseFile(file)}
                    style={{ fontSize: 15, marginLeft: 10 }}
                  />
                </div>
              }
            />
          ))}
        </Tabs>
      </Box>
      {selectedFile ? (
        <React.Fragment>
          <Box
            style={{
              backgroundColor: '#1E1E1E',
              padding: '10px',
              color: grey[600],
              display: 'flex',
              justifyContent: 'space-evenly',
            }}>
            <div>
              path:{' '}
              <span
                style={{
                  fontWeight: 'bold',
                }}>
                {formatFilePath(selectedFile)}
              </span>
            </div>
            <div>
              language:{' '}
              <span style={{ fontWeight: 'bold' }}>
                {(extensionLanguageMap as any)[selectedFile.extension]}
              </span>
            </div>
            <div>
              status: <span style={{ fontWeight: 'bold' }}>{FileChangeStatus.NoChanges}</span>
            </div>
          </Box>
          <div style={{ padding: '15px 20px 0px 20px', backgroundColor: '#1E1E1E' }}>
            <Editor
              height="calc(100vh - 170px)"
              width={`100%`}
              language={(extensionLanguageMap as any)[selectedFile.extension]}
              value={value}
              theme={'vs-dark'}
              defaultValue={(selectedFile.content as string) || ''}
              onChange={handleEditorChange}
            />
          </div>
        </React.Fragment>
      ) : (
        <div>No file opened</div>
      )}
    </React.Fragment>
  );
};

export default CodeEditor;
