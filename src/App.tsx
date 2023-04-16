import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { NavSidebar } from './components/NavSideBar/NavSideBar';
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
import { API_URL, HttpStatusType } from './app/store-constants';
import { ItemType } from './types/managementTableTypes';
import { io } from "socket.io-client";
import { BasicItem } from './classes/BasicItem';
import { useEffect } from 'react';
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';

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
  const loadingEvents = useSelector((state: RootState) => state.events.status === HttpStatusType.PENDING);
  const loadingTasks = useSelector((state: RootState) => state.tasks.status === HttpStatusType.PENDING);

  useEffect(() => {
    const i = 0;
    const socket = io(API_URL);
    socket.emit("sendEventsNotifications");
    socket.on("notification", (data: BasicItem[]) => {
      data.forEach((notification) =>
        addNotification({
          title: 'Event Remider',
          subtitle: notification.title,
          message: notification.description,
          theme: 'light',
          duration: 60000
        })
      )
    });
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Notifications />
        < Routes >
          <Route path="/tasks" element={<ManagementPage loading={loadingTasks} type={ItemType.Task} data={{ tasks: tasks, events: [] }} headers={columnsForTasksTable} />} />
          <Route path="/events" element={<ManagementPage loading={loadingEvents} type={ItemType.Event} data={{ tasks: [], events: events }} headers={columnsForEventsTable} />} />
          <Route path="/dashboard" element={<ManagementPage loading={loadingEvents || loadingTasks} data={{ tasks: filterTodayItems(tasks) as Task[], events: filterTodayItems(events) as Event[] }} headers={columnsForTodayTasksAndEventsTable} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <NavSidebar />
      </Router>
    </ThemeProvider >
  )
}

export default App;