import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ConnectionState {
  db: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ConnectionState = {
  db: '',
  status: 'idle',
};

export const connectionSlice = createSlice({
  name: 'connectionSlice',
  initialState,
  reducers: {
    initDatabase: (state, action: PayloadAction<string>) => {
      state.db = action.payload;
    },
  },
});

export const { initDatabase } = connectionSlice.actions;

export const selectConnection = (state: RootState): ConnectionState => state.connection;

export default connectionSlice.reducer;
