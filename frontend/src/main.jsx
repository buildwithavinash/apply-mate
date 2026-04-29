import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { JobProvider } from './provider/JobProvider.jsx'
import { AuthProvider } from './provider/AuthProvider.jsx'
import { ToastProvider } from './provider/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <AuthProvider>
    <ToastProvider>
    <JobProvider>
    <App />
    </JobProvider>
    </ToastProvider>
    </AuthProvider>
  </StrictMode>,
  </BrowserRouter>
)
