import * as React from 'react'
import TodoProvider from './context/tasksContext'
import TasksManagementPage from './pages/TasksManagementPage/TasksManagementPage'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import EventsManagementPage from './pages/EventsManagementPage/EventsMmanagementPage'
import { NavBarSide } from './components/NavBar/NavBarSide'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@emotion/react'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material'
import { blueGrey, grey, purple } from '@mui/material/colors'
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
        primary: '#ffff',
        secondary: '#ffff',
        disabled: '#ffeaea',
      }
    },
  });



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <TodoProvider >
        <Router>
          <Routes>
            <Route path="/tasks" element={<TasksManagementPage />} />
            <Route path="/events" element={<EventsManagementPage />} />
          </Routes>
          <NavBarSide />
        </Router>
      </TodoProvider>
    </ThemeProvider>

  )
}