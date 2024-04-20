import { Routes, Route, } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setUser } from './redux/useSlice';
import HomePage from './pages/Home/Home'
import ProductPage from './pages/Product/Product'
import Header from './layouts/Header'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { useNavigate, Navigate } from 'react-router-dom';
import Brands from './Brands/Brands';
import Admin from './Admin/Admin';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // console.log('token:' + token)
    if (token) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/login/user`, {
          headers: { 'x-access-token': token }
        })
        .then((res) => {
          console.log(res.data);
          dispatch(setUser(res.data));
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch]);

  const navigate = useNavigate();
  const islogin = localStorage.getItem('isLogin');
  const data: string | null = localStorage.getItem('data');
  let parsedData = null;

  if (data !== null) {
    parsedData = JSON.parse(data);
  }

  const role = parsedData?.role;

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
    // const checkExpiry = setInterval(() => {
    //   const token = localStorage.getItem('token');
    //   const expiryTime = Number(localStorage.getItem('expiryTime'));

    //   if (token && new Date().getTime() > expiryTime) {
    //     alert('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.');
    //     localStorage.removeItem("data");
    //     localStorage.removeItem("expiryTime");
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("isLogin");
    //     dispatch(logout());
    //     navigate('/login');
    //     clearInterval(checkExpiry);
    //   }
    // }, 1000);

    // // Dọn dẹp khi unmount
    // return () => clearInterval(checkExpiry);
  }, [navigate]);


  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={islogin ? <Navigate to="/" /> : <Login />}
        />
        <Route path='/register' element={<Register />} />
        <Route path="/brands/*" element={role === "Brand" ? (
          <>
            <Brands />
          </>
        ) : (
          <Navigate to="/" />
        )} />
        <Route path="/admin/*" element={role === "Admin" ? (
          <>
            <Admin />
          </>
        ) : (
          <Navigate to="/" />
        )} />

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
