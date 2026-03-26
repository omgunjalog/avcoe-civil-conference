import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f223d',
            color: '#f6fbff',
            border: '1px solid rgba(139, 229, 211, 0.24)',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
