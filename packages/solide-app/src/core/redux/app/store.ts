import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { menuReducer, workspaceReducer, connectionReducer } from '../slices/reducer';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    workspace: workspaceReducer,
    connection: connectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
