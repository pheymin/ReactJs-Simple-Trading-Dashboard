import './App.css'
import { Profile, Summary, Instruments, SpreadTable } from './components'

function App() {
  return (
    <div className='app-container'>
      <Summary />
      <div className='bottom-container'>
        <Profile />
        <Instruments />
        <SpreadTable />
      </div>
    </div>
  )
}

export default App
