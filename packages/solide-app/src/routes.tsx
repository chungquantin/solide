import { StaticContext } from 'react-router';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { PluginsView, StudioView } from './views';
import HomeView from './views/HomeView';
import ProjectView from './views/ProjectView';

export interface CustomRouteProps {
  isExact: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>
    | React.ComponentType<any>;
  path: string;
}

export const routeList: CustomRouteProps[] = [
  {
    isExact: true,
    path: '/home',
    component: () => <HomeView />,
  },
  {
    isExact: true,
    path: '/projects/',
    component: () => <ProjectView />,
  },
  {
    isExact: true,
    path: '/plugins',
    component: () => <PluginsView />,
  },
  {
    isExact: true,
    path: '/studio',
    component: () => <StudioView />,
  },
];

export const renderRoutes = (routes: CustomRouteProps[]) => (
  <Switch>
    {routes.map(route => (
      <Route
        key={route.path}
        path={route.path}
        exact={route.isExact}
        render={route.component as any}></Route>
    ))}
    {/* <Route component={NotFoundView} /> */}
  </Switch>
);
