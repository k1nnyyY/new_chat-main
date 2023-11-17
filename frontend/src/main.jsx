import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ApolloService from './apolloClient.jsx';

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '10px',
  transition: transitions.FADE,
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloService>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </ApolloService>
)
