import { Route, Switch } from 'wouter'
import { LanguageProvider } from './context/LanguageContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Programme from './pages/Programme'
import Webseiten from './pages/Webseiten'
import SocMediaMarketing from './pages/SocMediaMarketing'
import Praesentationen from './pages/Praesentationen'
import KiAgenten from './pages/KiAgenten'
import DigTransformation from './pages/DigTransformation'
import Kontakt from './pages/Kontakt'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import Oakgen from './pages/Oakgen'
import ForFree from './pages/ForFree'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#060b18] text-white">
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/programme" component={Programme} />
          <Route path="/aktionspreis-fuer-webseiten" component={Webseiten} />
          <Route path="/soc-media-marketing" component={SocMediaMarketing} />
          <Route path="/digitale-praesentationen" component={Praesentationen} />
          <Route path="/ki-agenten" component={KiAgenten} />
          <Route path="/digitale-transformation" component={DigTransformation} />
          <Route path="/kontakt" component={Kontakt} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/oakgen" component={Oakgen} />
          <Route path="/for-free" component={ForFree} />
        </Switch>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
