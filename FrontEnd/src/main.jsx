import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthForAccess.jsx"
import { App } from './App.jsx'
import { BrowserRouter } from "react-router-dom"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider >
      <App />
    </AuthProvider>
  </BrowserRouter>

) 
