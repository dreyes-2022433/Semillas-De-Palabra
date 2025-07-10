import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {UserModulesProvider} from '../src/pages/MainPages/userModuleContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <UserModulesProvider>
          <App />
        </UserModulesProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
