import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // on ajoute le css de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
