import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FaceExpression from './features/Expression/components/FaceExpression.jsx'

createRoot(document.getElementById('root')).render(
  
  <FaceExpression/>
)
