export type FileType = {
  id: string;
  fileName: string;
  extension: string;
  content: string | FileType[];
  path: string;
};

export type WorkspaceType = {
  id: number;
  workspace: string;
  workspaceType: string;
  files: FileType[];
};

export interface WorkspaceState {
  selectedWorkspace: WorkspaceType;
  workspaces: WorkspaceType[];
  openedFiles: FileType[];
  selectedFile: FileType | null;
  status: 'idle' | 'loading' | 'failed';
}

export enum FileChangeStatus {
  UnsavedChanges = 'unsaved changes',
  Saved = 'saved',
  Saving = 'saving',
  NoChanges = 'no changes',
}
