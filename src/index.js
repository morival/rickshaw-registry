import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);