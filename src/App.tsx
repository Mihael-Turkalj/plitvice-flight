import Nav from './components/Nav'
import Flight from './components/Flight'
import Outro from './components/park/Outro'
import Facts from './components/park/Facts'
import Staircase from './components/park/Staircase'
import Tufa from './components/park/Tufa'
import Life from './components/park/Life'
import Seasons from './components/park/Seasons'
import Names from './components/park/Names'
import History from './components/park/History'
import Visit from './components/park/Visit'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main id="top" className="w-full max-w-full overflow-x-clip">
        <Flight />
        <Outro />
        <Facts />
        <Staircase />
        <Tufa />
        <Life />
        <Seasons />
        <Names />
        <History />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
