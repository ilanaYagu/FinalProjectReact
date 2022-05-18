import TasksProvider from './context/tasksContext';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { NavSideBar } from './components/NavSideBar/NavSideBar';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import EventsProvider from './context/eventsContext';
import ItemFormProvider from './context/itemFormContext';
import DeleteItemFormProvider from './context/deleteItemFormContext';
import MainPage from "./pages/MainPage";
import { Type } from "./constants/constants";

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

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TasksProvider >
        <EventsProvider>
          <ItemFormProvider>
            <DeleteItemFormProvider>
              <Router>
                <Routes>
                  <Route path="/tasks" element={<MainPage type={Type.Task} />} />
                  <Route path="/events" element={<MainPage type={Type.Event} />} />
                  <Route path="/dashboard" element={<MainPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
                <NavSideBar />
              </Router>
            </DeleteItemFormProvider>
          </ItemFormProvider>
        </EventsProvider>
      </TasksProvider>
    </ThemeProvider>
  )
}

export default App;