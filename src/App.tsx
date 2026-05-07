import { Route, Switch } from 'wouter'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Programme from './pages/Programme'
import Leistungen from './pages/Leistungen'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

function App() {
  return (
    <div className="min-h-screen bg-[#060b18] text-white">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/programme" component={Programme} />
        <Route path="/leistungen" component={Leistungen} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
