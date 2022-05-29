import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { NavSideBar } from './components/NavSideBar/NavSideBar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import ManagementPage from "./pages/ManagementPage";
import { columnsForEventsTable, columnsForTasksTable, columnsForTodayTasksAndEventsTable, otherColumnForTasksTable, otherColumnForTodayTasksAndEventsTable } from "./constants";
import { filterTodayItems } from './utils';
import { Event } from './classes/Event';
import { Task } from './classes/Task';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Type } from './types/managementTableTypes';

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
      primary: '#fff !important',
      secondary: '#fff !important',
      disabled: '#fff',
    },
  },
});

const App = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const todayTasks = filterTodayItems(tasks) as Task[];
  const todayEvents = filterTodayItems(events) as Event[];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/tasks" element={<ManagementPage type={Type.Task} allDataTable={tasks} headersOfTable={columnsForTasksTable} otherColumnOfTable={otherColumnForTasksTable} />} />
          <Route path="/events" element={<ManagementPage type={Type.Event} allDataTable={events} headersOfTable={columnsForEventsTable} />} />
          <Route path="/dashboard" element={<ManagementPage allDataTable={[...todayEvents, ...todayTasks]} todayEvents={todayEvents} todayTasks={todayTasks} headersOfTable={columnsForTodayTasksAndEventsTable} otherColumnOfTable={otherColumnForTodayTasksAndEventsTable} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <NavSideBar />
      </Router>
    </ThemeProvider>
  )
}

export default App;