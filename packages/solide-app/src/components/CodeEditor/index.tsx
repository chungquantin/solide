import Editor from '@monaco-editor/react';
import { CloseOutlined } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';

type Props = {};

const CodeEditor = (props: Props) => {
  const [value, setValue] = useState('');

  const handleEditorChange = (value: any) => {
    setValue(value);
  };

  const handleCloseFile = () => {};

  const files = [{ fileName: 'instruction', extension: 'rs', content: '// Type your code here' }];
  return (
    <React.Fragment>
      <Box>
        <Tabs defaultValue={1} onChange={() => {}} variant="scrollable" scrollButtons="auto">
          {files.map(file => (
            <Tab
              defaultChecked
              style={{
                textTransform: 'none',
                backgroundColor: '#1E1E1E',
              }}
              label={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  {`${file.fileName}.${file.extension}`}
                  <CloseOutlined
                    onClick={handleCloseFile}
                    style={{ fontSize: 15, marginLeft: 10 }}
                  />
                </div>
              }
            />
          ))}
        </Tabs>
      </Box>
      <Box
        style={{
          backgroundColor: '#1E1E1E',
          padding: '10px',
          color: grey[600],
        }}>
        Language: Rust
      </Box>
      <div style={{ padding: '15px 20px 0px 20px', backgroundColor: '#1E1E1E' }}>
        <Editor
          height="calc(100vh - 170px)"
          width={`100%`}
          language={'rust'}
          value={value}
          theme={'vs-dark'}
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
      </div>
    </React.Fragment>
  );
};

export default CodeEditor;
