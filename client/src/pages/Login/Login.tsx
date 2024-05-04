import { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/useSlice';
import imglogin from "../../../src/assets/images/imglogin.png";
import logo from "../../../src/assets/images/logo.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { notification } from 'antd';
import { MdCheckCircleOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!username || !password) {
            console.log('Vui lòng nhập tên người dùng và mật khẩu');
            const errorMessage = 'Vui lòng nhập tên người dùng và mật khẩu'
            notification.open({
                message: 'Lỗi Đăng Nhập',
                description: errorMessage,
                icon: <IoWarningOutline style={{ color: '#ff4d4f' }} />,
                duration: 3,
            });
            return;
        }
        axios
            .post(`${import.meta.env.VITE_APP_API_URL}/login/listlogin`, {
                username,
                password,
            }, {
                withCredentials: true // Thêm dòng này
            })
            .then((res) => {
                // console.log(res.data);
                // Lưu token và thời gian hết hạn vào localStorage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('expiryTime', res.data.expiryTime);
                dispatch(setUser(res.data));
                console.log('login',JSON.stringify(res.data))
    
                navigate('/');
                notification.open({
                    message: 'Đăng Nhập Thành Công',
                    description: 'Bạn đã đăng nhập thành công!',
                    icon: <MdCheckCircleOutline style={{ color: '#52c41a' }} />,
                    duration: 3,
                });
            })
            .catch((error) => {
                const errorMessage = error.response.data.message;
                console.log(errorMessage);
                notification.open({
                    message: 'Lỗi Đăng Nhập',
                    description: errorMessage,
                    icon: <IoWarningOutline style={{ color: '#ff4d4f' }} />,
                    duration: 3,
                });
            });
    };
    

    // const token = localStorage.getItem('token');

    return (
        <div>
            <div className=" bg-bg-login bg-cover min-h-screen flex justify-center items-center relative">
                <div className="bg-white min-h-screen flex-1" ></div>
                <div className="backdrop-blur-[4px] min-h-screen flex-1"></div>
                <div className="w-full md:w-[1000px] flex mx-auto absolute overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute 
             before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 
             after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                    <div className="flex-1">
                        <div className="md:pr-[60px]">
                            <img src={logo} alt="logo" className="mb-4" />
                            <h2 className="text-2xl font-bold text-gray-700 mb-6">Đăng nhập</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                                        Tài khoản
                                    </label>
                                    <input
                                        className="mt-1 p-2 w-full bg-white border border-gray-600 rounded-md text-gray-700"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                        Mật khẩu
                                    </label>
                                    <div className="relative mt-1 ">
                                        <input
                                            className={`p-2 w-full bg-white text-gray-700 border border-gray-600 rounded-md `}
                                            name="password"
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <i
                                            className={`absolute inset-y-3 right-3 cursor-pointer text-[20px] text-gray-500 hover:text-gray-400 ${showPassword ? 'text-gray-400' : ''
                                                }`}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                                        </i>
                                    </div>
                                </div>



                                <div className="flex justify-center mb-4">
                                    <button
                                        className="w-full bg-green-600 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                                        type="submit"
                                    >
                                        Đăng nhập
                                    </button>
                                </div>

                                <div className="flex  justify-center items-center mb-2">
                                    <a href="/"
                                        className="w-full bg-white to-blue-500 
                                text-black px-4 py-2 rounded-md hover:opacity-80 items-center justify-center flex border border-gray-700"
                                    >
                                        <IoIosArrowRoundBack /> Quay về trang chủ
                                    </a>
                                </div>
                                <div className="text-gray-700   flex items-center justify-center mb-2">
                                    <p>Bạn chưa có tài khoản <a className="text-green-600 after:content-['_↗'] ..." href="/register" target="_blank">Đăng ký</a> ngay</p>
                                </div>
                                <Accordion >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header >Hướng dẫn đăng nhập</Accordion.Header>
                                        <Accordion.Body>
                                            Bước 1: Nhập tài khoản + mật khẩu
                                            Nhập tài khoản và mật khẩu hợp lệ đã đăng ký với hệ thống
                                            Nếu chưa có tài khoản vui lòng ấn vào nút đăng ký để đăng ký là thành viên của chúng tôi<br />
                                            Bước 2: Nhấn Enter hoặc nhấn nút Đăng nhập
                                            Nhấn nút ghi nhớ mật khẩu để tự động ghi nhớ tài khoản và mật khẩu ở những lần đăng nhập tiếp theo.
                                            Nếu quên mật khẩu vui lòng ấn vào chữ "Quên mật khẩu" và thực hiện các bước trong trang khôi phục mật khẩu để lấy lại mật khẩu
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </form>
                        </div>
                    </div>
                    <div className="flex-1 md:flex justify-start items-center hidden">
                        <img src={imglogin} alt="imglogin" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
