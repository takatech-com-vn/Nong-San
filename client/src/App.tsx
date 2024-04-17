import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/useSlice';
import HomePage from './pages/Home/Home'
import ProductPage from './pages/Product/Product'
import Header from './layouts/Header'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem('data');

    if (data) {
      const parsedData = JSON.parse(data);
      dispatch(setUser({
        token: parsedData.token,
        username: parsedData.username,
        expiryTime: Number(parsedData.expiryTime),
        auth: parsedData.auth,
        id: parsedData.id,
        phone: parsedData.phone,
        role: parsedData.role,
        created_at: parsedData.created_at,
        updated_at: parsedData.updated_at,
      }));
    }
  }, [dispatch]);



  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={
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
