import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RockPaperScissorsMain from './pages/RockPaperScissors/RockPaperScissorsMain.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RockPaperScissorsMain gameMode="single" ></RockPaperScissorsMain>
    {/* <RockPaperScissorsMain gameMode="multi" ></RockPaperScissorsMain> */}
  </StrictMode>,
)
