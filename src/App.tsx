import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ProductDetail } from './components/ProductDetail'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import { CartPanel } from './components/CartPanel'
import ExploreMenu from './components/ExploreMenu'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<CartPanel />} />
        <Route path='/menu' element={<ExploreMenu />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
