import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import NoScript from './components/NoScript'
import './App.css'

function App() {
  return (
    <div>
      <NoScript />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
