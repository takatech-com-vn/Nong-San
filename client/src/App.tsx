import { Routes, Route } from 'react-router-dom'
// import './App.css'
import HomePage from './pages/Home/Home'
import ProductPage from './pages/Product/Product'
import Header from './layouts/Header'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <>
            <Header />
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/san-pham' element={<ProductPage />} />
            </Routes>
          </>
        } />
      </Routes>
    </>

  )
}

export default App
