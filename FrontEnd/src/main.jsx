import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TrackerSection } from './newTracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrackerSection />
  </StrictMode>,
) 
