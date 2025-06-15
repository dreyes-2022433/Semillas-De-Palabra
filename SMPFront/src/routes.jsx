import { AuthPage } from './pages/Auth/AuthPage.jsx';
import {NotFound} from './pages/Alerts/NotFound.jsx';
import MainPage from './pages/MainPage.jsx';
import { Children } from 'react';
import { Mainpages } from './pages/MainPages/PageContainer.jsx';

export const routes = [
  { path: '/main', element: <Mainpages />,children:[
    {index:true, element: <MainPage/>}
  ], },
  { path: '/', element: <AuthPage /> },
  { path: '/*', element: <NotFound /> },
];
