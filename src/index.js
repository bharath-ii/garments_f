import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ✅ Tailwind CSS must be imported here
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
