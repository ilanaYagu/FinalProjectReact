import { TasksContext, TasksContextType } from './context/tasksContext';
import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { NavSideBar } from './components/NavSideBar/NavSideBar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import { EventsContext, EventsContextType } from './context/eventsContext';
import ManagementPage from "./pages/ManagementPage";
import { columnsForEventsTable, columnsForTasksTable, columnsForTodayTasksAndEventsTable, otherColumnForTasksTable, otherColumnForTodayTasksAndEventsTable, Type } from "./constants/constants";
import { filterTodayItems } from './utils/utils';
import { Event } from './classes/Event';
import { Task } from './classes/Task';

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
  const { events } = useContext<EventsContextType>(EventsContext);
  const { tasks } = useContext<TasksContextType>(TasksContext);
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