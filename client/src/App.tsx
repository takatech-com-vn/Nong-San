import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setUser } from './redux/useSlice';
import HomePage from './pages/Home/Home'
import ProductPage from './pages/Product/Product'
import Header from './layouts/Header'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { useNavigate } from 'react-router-dom';
import Brands from './Brands/Brands';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const expiryTime = Number(localStorage.getItem('expiryTime'));
  const expiryDate = new Date(expiryTime);
  console.log(expiryDate);
  useEffect(() => {
    const checkExpiry = setInterval(() => {
      const token = localStorage.getItem('token');
      const expiryTime = Number(localStorage.getItem('expiryTime'));

      if (token && new Date().getTime() > expiryTime) {
        alert('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem("data");
        localStorage.removeItem("expiryTime");
        localStorage.removeItem("token");
        dispatch(logout());
        navigate('/login');
        clearInterval(checkExpiry);
      }
    }, 1000);

    // Dọn dẹp khi unmount
    return () => clearInterval(checkExpiry);
  }, [navigate]);


  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/brands/*' element={<Brands />} />
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
