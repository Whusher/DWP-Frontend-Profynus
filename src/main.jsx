import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route, Routes } from 'react-router'

/*My routes*/
import LandingPage from './Pages/Landing/LandingPage.jsx'
import HomePage from './Pages/Home/HomePage.jsx'
import ProfilePage from './Pages/Profile/ProfilePage.jsx'
import DownloadPage from './Pages/Download/DownloadPage.jsx'
import HistoryPage from './Pages/History/HistoryPage.jsx'
import MediaPlayer from './Pages/Media/MediaPlayer.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' Component={LandingPage}/>
      <Route path='/home' Component={HomePage}/>
      <Route path='/profile' Component={ProfilePage}/>
      <Route path='/moremusic' Component={DownloadPage}/>
      <Route path='/player' Component={MediaPlayer}/>
      <Route path='/signup' Component={SignUp}/>
      <Route path='/history' Component={HistoryPage}/>
    </Routes>
  </BrowserRouter>
)
