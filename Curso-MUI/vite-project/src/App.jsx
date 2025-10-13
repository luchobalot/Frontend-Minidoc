// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

// Páginas
import Login from './pages/Login/Login';
import PagesTest from './pages/Pages-Test/PagesTest';

// Proyección de Rutas
import ProtectedRoute from './components/utils/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Ruta pública (login) */}
          <Route path="/login" element={<Login />} />

          {/* Ruta raíz que también muestra login */}
          <Route path="/" element={<Login />} />

          {/* Ruta protegida */}
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <PagesTest />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
