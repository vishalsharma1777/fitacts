import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import StartingPage from './pages/StartingPage';
import ResetPasword from './components/userAuthentication/ResetPassword';
import Dashboard from './pages/Dashboard';
import Activites from './pages/Activites';
import Fitscale from './pages/Fitscale';
import Profile from './pages/Profile';
import { useEffect } from 'react';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#47a347'
      }
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StartingPage />} />
            <Route path='/signin' element={<StartingPage />} />
            <Route path='/signup' element={<StartingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/activities' element={<Activites />} />
            <Route path='/fitscale' element={<Fitscale />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/forgot-password' element={<ResetPasword />} />
            <Route path='*' element={<StartingPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
