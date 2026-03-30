import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FaceExpression from './features/Expression/components/FaceExpression.jsx'
import GazeTracker from './features/Expression/components/GazeTracker.jsx'

createRoot(document.getElementById('root')).render(
  // <GazeTracker/>
  <FaceExpression/>
)
