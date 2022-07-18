import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import Layout from './components/Layout';
import { theme } from './utils/theme';
import { MultisigWalletProvider } from './core/contexts/MultisigWalletProvider';
import { renderRoutes, routeList } from './routes';
import { HashRouter } from 'react-router-dom';
import WorkspaceDbService from './services/WorkspaceDbService';

function App() {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const initDb = async () => {
      setLoading(true);
      await WorkspaceDbService.initDatabase();
      await WorkspaceDbService.initDefaultWorkspaces();
      setLoading(false);
    };
    initDb();
  }, []);

  return (
    <div className="App">
      <MultisigWalletProvider>
        <ThemeProvider theme={theme}>
          <HashRouter basename={'/'}>
            {loading ? <Layout>Loading...</Layout> : <Layout>{renderRoutes(routeList)}</Layout>}
          </HashRouter>
        </ThemeProvider>
      </MultisigWalletProvider>
    </div>
  );
}

export default App;
