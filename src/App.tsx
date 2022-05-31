import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { NavSideBar } from './components/NavSideBar/NavSideBar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import ManagementPage from "./pages/ManagementPage";
import { columnsForEventsTable, columnsForTasksTable, columnsForTodayTasksAndEventsTable } from "./constants";
import { filterTodayItems } from './date-utils';
import { Event } from './classes/Event';
import { Task } from './classes/Task';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { ItemType } from './types/managementTableTypes';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#78536d",
      contrastText: "#fff"
    },
    divider: blueGrey[700],
    secondary: {
      main: '#f2cbe7',
      contrastText: "#fff"
    },
    background: {
      default: grey[900],
      paper: grey[900],
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: '#fff',
    },
  },
});

const App = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/tasks" element={<ManagementPage type={ItemType.Task} data={{ tasks: tasks, events: [] }} headers={columnsForTasksTable} />} />
          <Route path="/events" element={<ManagementPage type={ItemType.Event} data={{ tasks: [], events: events }} headers={columnsForEventsTable} />} />
          <Route path="/dashboard" element={<ManagementPage data={{ tasks: filterTodayItems(tasks) as Task[], events: filterTodayItems(events) as Event[] }} headers={columnsForTodayTasksAndEventsTable} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <NavSideBar />
      </Router>
    </ThemeProvider>
  )
}

export default App;