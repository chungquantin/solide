import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import Layout from './components/Layout';
import { theme } from './utils/theme';
import { MultisigWalletProvider } from './core/contexts/MultisigWalletProvider';
import { renderRoutes, routeList } from './routes';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <MultisigWalletProvider>
        <ThemeProvider theme={theme}>
          <HashRouter basename={'/'}>
            <Layout>{renderRoutes(routeList)}</Layout>
          </HashRouter>
        </ThemeProvider>
      </MultisigWalletProvider>
    </div>
  );
}

export default App;
