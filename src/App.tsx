import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Card from './pages/Card'
import HomePage from './pages/Home'
import TestPage from './pages/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/test" Component={TestPage} />
        <Route path="/card/:id" Component={Card} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
