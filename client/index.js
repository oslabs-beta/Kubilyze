//Entry point for application. 
import './styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
//Hangs React app off of #root in index.html
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
         <App />
   </React.StrictMode>
);


