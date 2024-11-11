import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from '@/components/shared/ScrollToTop'
import Card from '@/pages/Card'
import HomePage from '@/pages/Home'
import TestPage from '@/pages/Test'
import SigninPage from './pages/Signin'
import SignupPage from './pages/Signup'
import Navbar from './components/shared/Navbar'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/test" Component={TestPage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/card/:id" Component={Card} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
