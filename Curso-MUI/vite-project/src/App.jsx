// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';

// Paginas
import Login from './pages/Login/Login';
import UsuariosPage from './pages/Usuarios/UsuariosPage';
import UsuariosStandalonePage from './pages/Usuarios/UsuariosStandalonePage';
import Inicio from './pages/Inicio/InicioPage';
import MesaTrabajoPage from './pages/MesaTrabajo/MesaTrabajoPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          {/* Esta estaba repetida, dejamos solo UNA */}
          <Route path="/usuarios" element={<UsuariosPage />} />

          {/* Tabla de usuarios standalone sin layout */}
          <Route path="/tabla-usuarios" element={<UsuariosStandalonePage />} />

          {/* Acá estaba el error: se usaba InicioPage pero se había importado Inicio */}
          <Route path="/inicio" element={<Inicio />} />

          {/* Mesa de Trabajo sin protección */}
          <Route path="/mesa-trabajo" element={<MesaTrabajoPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;