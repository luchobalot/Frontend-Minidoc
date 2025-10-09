// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

// Pages
import Login from './pages/Login/Login';
import PagesTest from './pages/Pages-Test/PagesTest';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<PagesTest />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;