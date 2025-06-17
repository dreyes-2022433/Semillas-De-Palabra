import { AuthPage } from './pages/Auth/AuthPage.jsx'
import {NotFound} from './pages/Alerts/NotFound.jsx'
import MainPage from './pages/MainPage.jsx'
import { Children } from 'react';
import { Mainpages } from './pages/MainPages/PageContainer.jsx'
import { AdminDashboard } from './pages/Admin/AdminDashboard.jsx'
import { UserActionsDashboard } from './pages/Admin/UserActionsDashboard.jsx'
import { AdminModulesDashboard } from './pages/Admin/AdminModulesDashboard.jsx'
import { HelperDashboard } from './pages/Helper/HelperDashboard.jsx'
import { path } from 'framer-motion/client'

export const routes = [
  { path: '/main', element: <Mainpages />,children:[
    {index:true, element: <MainPage/>}
  ], },
  { path: '/', element: <AuthPage /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/usersPage', element: <UserActionsDashboard /> },
  { path: '/helper', element: <HelperDashboard />},
  { path: '/modulesPage', element: <AdminModulesDashboard />},
  { path: '/*', element: <NotFound /> },
];
