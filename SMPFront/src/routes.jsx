import { AuthPage } from './pages/Auth/AuthPage.jsx';
import {NotFound} from './pages/Alerts/NotFound.jsx';

export const routes = [
  { path: '/', element: <AuthPage /> },
  { path: '/*', element: <NotFound /> },
];
