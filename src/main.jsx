import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route, Routes } from 'react-router'
import App from './App.jsx'

/*My routes*/
import LandingPage from './Pages/Landing/LandingPage.jsx'
import HomePage from './Pages/Home/HomePage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' Component={LandingPage}/>
      <Route path='/home' Component={HomePage}/>
    </Routes>
  </BrowserRouter>
)
