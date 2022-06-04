import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@material-ui/core';
import store from './app/store';
import App from './App';
import { lightThemeConfig, darkThemeConfig } from './theme';
import './i18n';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function IndexComponent() {
  const [colorTheme, setColorTheme] = useState('light');

  const theme = useMemo(() => createTheme(colorTheme === 'light' ? lightThemeConfig : darkThemeConfig), [colorTheme]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App toggleTheme={() => {
              setColorTheme(colorTheme === 'light' ? 'dark' : 'light');
            }}
            />
          </ThemeProvider>
        </HashRouter>
      </Provider>
    </React.StrictMode>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IndexComponent />,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
