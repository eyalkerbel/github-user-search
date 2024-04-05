import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBarComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:username" element={<UserPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
