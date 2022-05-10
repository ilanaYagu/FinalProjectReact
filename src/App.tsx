import * as React from 'react';
import TodoProvider from './context/tasksContext';
import TasksManagementPage from './pages/TasksManagementPage/TasksManagementPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EventsManagementPage from './pages/EventsManagementPage/EventsManagementPage';
import { NavBarSide } from './components/NavBar/NavBarSide';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import EventsProvider from './context/eventsContext';
import './App.css';
import DashboardPage from './pages/DashboardPage/DashboardPage';

export default function App() {



  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#78536d",
      },
      divider: blueGrey[700],
      secondary: {
        main: '#f2cbe7',
      },
      background: {
        default: grey[900],
        paper: grey[900],
      },
      text: {
        primary: '#fff',
        secondary: '#fff',
        disabled: '#ffeaea',

      }
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <TodoProvider >
        <EventsProvider>
          <Router>
            <Routes>
              <Route path="/tasks" element={<TasksManagementPage />} />
              <Route path="/events" element={<EventsManagementPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

            </Routes>
            <NavBarSide />
          </Router>
        </EventsProvider>

      </TodoProvider>
    </ThemeProvider>

  )
}