// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './index.css'
import Home from './components/pages/Home/HomePage.tsx'
import HomePage from './components/pages/Home/HomePage.tsx'
// import App2 from './App2'
// import App3 from './App3'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <HomePage />
    // <App2 />
    // <App3 />
  // </StrictMode>,
)
