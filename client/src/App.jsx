import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import StartingPage from './pages/StartingPage';
import ResetPasword from './components/userAuthentication/ResetPassword';
import Dashboard from './pages/Dashboard';
import Activites from './pages/Activites';
import Fitscale from './pages/Fitscale';
import Profile from './pages/Profile';
import { useEffect } from 'react';
import TimeineContainer from './pages/TimelineContainer';
import TopFivePerformance from './pages/TopFivePerformances';
import Community from './pages/Community';
import FollowedUserTimeline from './components/community/FollowedUserTimeline';
import Requests from './pages/Requests';

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
            <Route path='/dashboard/timeline' element={<TimeineContainer />} />
            <Route path='/dashboard/activities' element={<Activites />} />
            <Route
              path='/dashboard/activities/:id'
              element={<TopFivePerformance />}
            />
            <Route path='/dashboard/fitscale' element={<Fitscale />} />
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route path='/dashboard/community' element={<Community />} />
            <Route path='/dashboard/requests' element={<Requests />} />

            <Route
              path='/dashboard/forgot-password'
              element={<ResetPasword />}
            />
            <Route
              path='/dashboard/following/timeline'
              element={<FollowedUserTimeline />}
            />
            <Route path='*' element={<StartingPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
