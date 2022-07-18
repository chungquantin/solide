import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { menuReducer, workspaceReducer } from '../slices/reducer';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    workspace: workspaceReducer,
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
