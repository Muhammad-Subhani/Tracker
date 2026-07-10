import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DataInput } from './ToDo/Todo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataInput />
  </StrictMode>,
)
