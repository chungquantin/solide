import React from 'react';
import { Box, Grid, ListItemIcon, MenuItem, MenuList, Paper, styled, Tooltip } from '@mui/material';
import ResponsiveAppBar from '../AppBar';
import { AppsOutlined, FolderCopyOutlined, HomeOutlined } from '@mui/icons-material';
import { theme } from '../../utils/theme';
import { common, orange } from '@mui/material/colors';
import { selectMenu, SideMenuItem, switchMenu } from '../../core/redux/slices/menuSlice';
import { useAppDispatch, useAppSelector } from '../../core/redux/app/hooks';
import FileExplorer from '../FileExplorer';
import { useHistory } from 'react-router-dom';

const ItemContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  borderRadius: '0px',
  height: '100vh',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Item = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  return (
    <ItemContainer style={style}>
      <div style={{ paddingTop: '66px' }}>{children}</div>
    </ItemContainer>
  );
};

type Props = {
  children: React.ReactNode;
};

interface SideMenuItemProps {
  menuId: SideMenuItem;
  name: string;
  icon: React.ReactNode;
  path: string;
}

const sideMenuItems = [
  {
    menuId: SideMenuItem.Home,
    name: 'Project Hub',
    icon: <HomeOutlined fontSize="small" style={{ marginLeft: 5 }} />,
    path: 'home',
  },
  {
    menuId: SideMenuItem.Files,
    name: 'Files',
    icon: <FolderCopyOutlined fontSize="small" style={{ marginLeft: 5 }} />,
    path: 'projects',
  },
  {
    menuId: SideMenuItem.Plugins,
    name: 'Plugins',
    icon: <AppsOutlined fontSize="small" style={{ marginLeft: 5 }} />,
    path: 'plugins',
  },
];

const Layout = (props: Props) => {
  const history = useHistory();
  const { value } = useAppSelector(selectMenu);
  const dispatch = useAppDispatch();

  const handleMenuItemChange = (sideMenuItem: SideMenuItemProps) => {
    dispatch(switchMenu({ name: sideMenuItem.name, value: sideMenuItem.menuId }));
    history.push(sideMenuItem.path);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={0.5}>
            <Item style={{ backgroundColor: common.black }}>
              <MenuList>
                {sideMenuItems.map(item => (
                  <Tooltip key={item.menuId} title={item.name} placement="right-start">
                    <MenuItem
                      onClick={() => handleMenuItemChange(item)}
                      style={{
                        margin: '0px 0px 20px 0px',
                      }}>
                      <ListItemIcon
                        style={{
                          color: item.menuId === value ? orange[700] : theme.palette.text.primary,
                        }}>
                        {item.icon}
                      </ListItemIcon>
                    </MenuItem>
                  </Tooltip>
                ))}
              </MenuList>
            </Item>
          </Grid>
          {value === SideMenuItem.Files && (
            <Grid item xs={2}>
              <Item style={{ backgroundColor: theme.palette.secondary.main }}>
                <FileExplorer />
              </Item>
            </Grid>
          )}
          <Grid item xs={value === SideMenuItem.Files ? 9.5 : 11.5}>
            <Item style={{ backgroundColor: theme.palette.secondary.dark }}>
              <div>{props.children}</div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Layout;
