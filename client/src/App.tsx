import { Routes, Route, } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/useSlice';
import HomePage from './pages/Home/Home'
import ProductPage from './pages/Product/AllProducts'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { useNavigate, Navigate } from 'react-router-dom';
import Brands from './Brands/Brands';
import Admin from './Admin/Admin';
import axios from 'axios';
import { RootState } from './redux/store';
import Loader from './components/Loader/Loader';
import Footer from './layouts/Footer';
import EStoreRegister from './pages/EStoreRegister/EStoreRegister';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import DetailNews from './pages/News/DetailNews';
import DetailPolicy from './pages/Policy/DetailPolicy';
import AllProducts from './pages/Product/AllProducts';
import Header2 from './layouts/Header2';
import ButtonConnect from './components/FloatingButtonConnect/ButtonConnect';
import Profile from './pages/Profile/Profile';
import BackToTopButton from './components/BackToTopButton/BackToTopButton';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/login/user`, {
          headers: { 'x-access-token': token },
          withCredentials: true,
        })
        .then((res) => {
          dispatch(setUser(res.data));
          setIsLoading(false); 
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false); 
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  if (isLoading) {
    return <div><Loader /></div>;
  }


  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={user?.username ? <Navigate to="/" /> : <Login />}
        />
        <Route path='/register' element={<Register />} />
        <Route path="/brands/*" element={<Brands />} />
        <Route path="/admin/*" element={<Admin />} />

        <Route path='*' element={
          <>
            <Header2 />
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/san-pham' element={<ProductPage />} />
              <Route path="/detail/:id" element={<DetailProduct />} />
              <Route path='/EStore-register' element={<EStoreRegister />} />
              <Route path="/news/:id" element={<DetailNews />} />
              <Route path="/policy/:id" element={<DetailPolicy />} />
              <Route path="/products" element={<AllProducts />} />
              <Route
                path="/profile/*"
                element={user ? <Profile /> : <Navigate to="/" />}
              />
            </Routes>
            <ButtonConnect />
            <Footer />
          </>
        } />
      </Routes>
      <BackToTopButton />
    </>

  )
}

export default App
