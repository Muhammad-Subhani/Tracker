import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthProvider.jsx"
import { App } from './App.jsx'
import { BrowserRouter } from "react-router-dom"
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>

) 
