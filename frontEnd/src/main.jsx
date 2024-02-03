import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProviderWrapper>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
  </AuthProviderWrapper>
)
