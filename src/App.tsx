import * as React from 'react';
import TodoProvider from './context/tasksContext';
import TasksManagementPage from './pages/TasksManagementPage/TasksManagementPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EventsManagementPage from './pages/EventsManagementPage/EventsManagementPage';
import { NavBarSide } from './components/NavBarSide/NavBarSide';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import EventsProvider from './context/eventsContext';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import './App.css';
import ItemFormProvider from './context/itemFormContext';
import DeleteItemFormProvider from './context/deleteItemFormContext';

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
          <ItemFormProvider>
            <DeleteItemFormProvider>
              <Router>
                <Routes>
                  <Route path="/tasks" element={<TasksManagementPage />} />
                  <Route path="/events" element={<EventsManagementPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
                <NavBarSide />
              </Router>
            </DeleteItemFormProvider>
          </ItemFormProvider>
        </EventsProvider>
      </TodoProvider>
    </ThemeProvider>

  )
}