import { Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Nominations from './pages/Nominations';
import Applications from './pages/Applications';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { muiTheme } from './theme';
import Footer from './components/Footer';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>

      <Navbar />

      <Routes>
        <Route index element={<Home />} />
        <Route path="nominations" element={<Nominations />} />
        <Route path="applications" element={<Applications />} />
        <Route path="admin" element={<Admin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      {location.pathname !== '/' && <Footer />}
    </MuiThemeProvider>
  );
};

export default App;
