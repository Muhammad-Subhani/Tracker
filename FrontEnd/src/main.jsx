import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DataInputs } from './newTodo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataInputs />
  </StrictMode>,
) 
