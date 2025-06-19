import { LoginPage } from './pages/Auth/LoginPage.jsx'
import { RegisterPage } from './pages/Auth/RegisterPage.jsx'
import {NotFound} from './pages/Alerts/NotFound.jsx'
import { InitialPage } from './pages/InitialPage/InitialPage.jsx'
import MainPage from './pages/MainPage.jsx'
import { Children } from 'react';
import { Mainpages } from './pages/MainPages/PageContainer.jsx'
import { AdminDashboard } from './pages/Admin/AdminDashboard.jsx'
import { UserActionsDashboard } from './pages/Admin/UserActionsDashboard.jsx'
import { AdminModulesDashboard } from './pages/Admin/AdminModulesDashboard.jsx'
import { HelperDashboard } from './pages/Helper/HelperDashboard.jsx'
import { LoginUserByHelper } from './pages/Helper/LoginUserByHelper.jsx'
import { LoginUserByAdmin } from './pages/Admin/LoginUserByAdmin.jsx'
import { path } from 'framer-motion/client'

export const routes = [
  { path: '/main', element: <Mainpages />,children:[
    {index:true, element: <MainPage/>}
  ], },
  { path: '/Login', element: <LoginPage /> },
  { path: '/Register', element: <RegisterPage /> },
  { path: '/', element: <InitialPage /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/usersPage', element: <UserActionsDashboard /> },
  { path: '/helper', element: <HelperDashboard />},
  { path: '/loginHelper', element: <LoginUserByHelper />},
  { path: '/loginAdmin', element: <LoginUserByAdmin />},  
  { path: '/modulesPage', element: <AdminModulesDashboard />},
  { path: '/*', element: <NotFound /> },
];
