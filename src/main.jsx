import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RouterApp from './router';
import AppAlert from './context/alertContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppAlert>
    <RouterApp/>
    </AppAlert>
  </React.StrictMode>,
)
