import { SvgIconProps } from '@material-ui/core/SvgIcon';
import HomePage from 'containers/pages/HomePage';
import { ROUTE_LINKS } from 'routeLinks';
import DashboardPage from 'containers/pages/DashboardPage';

export interface AppRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
  isProtected: boolean;
  isNavRequired: boolean;
  routeNavLinkIcon?: React.ComponentType<SvgIconProps>; // Should be provided if Nav is required
}

const routes: AppRoute[] = [
  {
    name: 'Home',
    path: ROUTE_LINKS.Home,
    component: HomePage,
    isProtected: false, // This allows general access control
    isNavRequired: true, // This allows mapping into a navigation bar
  },
  {
    name: 'Dashboard',
    path: ROUTE_LINKS.Dashboard,
    component: DashboardPage,
    isProtected: true,
    isNavRequired: true,
  },
];

export default routes;
