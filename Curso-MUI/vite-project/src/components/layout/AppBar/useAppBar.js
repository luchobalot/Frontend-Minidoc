// useAppBar.js

/**
 * Hook genÃ©rico para manejar lÃ³gica del AppBar
 * 
 * @param {object} config
 * @param {object} [config.user] - Usuario actual
 * @param {function} [config.onLogout] - Callback de cierre de sesiÃ³n
 * @param {function} [config.onNavigateLogout] - Callback de navegaciÃ³n post logout
 */
export const useAppBar = (config = {}) => {
  const {
    user = null,
    onLogout = () => {},
    onNavigateLogout = null,
  } = config;

  return {
    user,
    onLogout,
    onNavigateLogout,
  };
};