import { Routes, Route } from 'react-router-dom'
// import './App.css'
import HomePage from './pages/Home/Home'
import ProductPage from './pages/Product/Product'
import Header from './layouts/Header'
function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/san-pham' element={<ProductPage />} />
      </Routes>
    </>
  )
}

export default App
