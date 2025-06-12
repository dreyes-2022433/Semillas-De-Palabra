import { AuthPage } from './pages/Auth/AuthPage.jsx';
import {NotFound} from './pages/Alerts/NotFound.jsx';
import MainPage from './pages/MainPage.jsx';

export const routes = [
  { path: '/main', element: <MainPage /> },
  { path: '/', element: <AuthPage /> },
  { path: '/*', element: <NotFound /> },
];
