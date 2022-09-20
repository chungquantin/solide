import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export enum SideMenuItem {
  Home = 'home',
  Files = 'files-menu-item',
  Settings = 'settings-menu-item',
  Plugins = 'plugins-menu-item',
  Studio = "nocode-studio-item"
}

export interface MenuState {
  value: SideMenuItem;
  menuName: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MenuState = {
  value: SideMenuItem.Files,
  menuName: 'Files',
  status: 'idle',
};

export const menuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {
    switchMenu: (state, action: PayloadAction<{ value: SideMenuItem; name: string }>) => {
      state.value = action.payload.value;
      state.menuName = action.payload.name;
    },
  },
});

export const { switchMenu } = menuSlice.actions;

export const selectMenu = (state: RootState): MenuState => state.menu;

export default menuSlice.reducer;
