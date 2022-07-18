import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { WORKSPACES } from '../../../constants/workspaces';
import { FileType, WorkspaceState, WorkspaceType } from '../../../types';

const initialState: WorkspaceState = {
  selectedWorkspace: WORKSPACES[0],
  workspaces: [],
  openedFiles: [],
  selectedFile: null,
  status: 'idle',
};

export const workspaceSlice = createSlice({
  name: 'workspaceSlice',
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<FileType>) => {
      if (state.openedFiles.map(file => file.id).includes(action.payload.id)) {
        state.selectedFile = action.payload;
      }
    },
    openNewFile: (state, action: PayloadAction<FileType>) => {
      if (state.openedFiles.map(file => file.id).includes(action.payload.id)) {
        state.selectedFile = action.payload;
      } else {
        state.openedFiles.push(action.payload);
        state.selectedFile = action.payload;
      }
    },
    removeFile: (state, action: PayloadAction<FileType>) => {
      let removedFileIndex = state.openedFiles.map(file => file.id).indexOf(action.payload.id);
      const removedOpenedFiles = state.openedFiles.filter(file => file.id !== action.payload.id);
      state.openedFiles = removedOpenedFiles;
      state.selectedFile =
        removedOpenedFiles.length > 0
          ? removedFileIndex > 0 && removedOpenedFiles.length > removedFileIndex - 1
            ? removedOpenedFiles[removedFileIndex - 1]
            : removedOpenedFiles[removedFileIndex]
          : null;
    },
    setSelectedWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      state.selectedWorkspace = action.payload;
    },
    addWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      state.workspaces.push(action.payload);
    },
    setWorkspaces: (state, action: PayloadAction<WorkspaceType[]>) => {
      state.workspaces = action.payload;
    },
    removeWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      state.workspaces = state.workspaces.filter(workspace => workspace.id !== action.payload.id);
    },
  },
});

export const {
  setWorkspaces,
  addWorkspace,
  openNewFile,
  removeFile,
  removeWorkspace,
  setSelectedWorkspace,
  setSelectedFile,
} = workspaceSlice.actions;

export const selectWorkspace = (state: RootState): WorkspaceState => state.workspace;

export default workspaceSlice.reducer;
