import { useState, useEffect } from "react";
import axios from 'axios';
import imglogin from "../../../src/assets/images/imglogin.png";
import logo from "../../../src/assets/images/logo.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import Accordion from 'react-bootstrap/Accordion';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ToastPosition } from "react-bootstrap/ToastContainer";
interface RegisterState {
    username: string;
    password: string;
    phone: string;
    errors: { username?: string; password?: string; phone?: string };
    isSuccess: boolean;
}

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<RegisterState['errors']>({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // Added for success message
  const [errorMessage, setErrorMessage] = useState('');
    const [position] = useState<ToastPosition>('top-end');
    const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newErrors = {} as RegisterState['errors'];


        if (!username) {
            newErrors.username = 'Vui lòng nhập tên người dùng';
        }

        if (!password || password.length < 8) {
            newErrors.password = 'Mật khẩu phải dài ít nhất 8 ký tự';
        }

        if (!phone || !validatePhoneNumber(phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        function validatePhoneNumber(phone: string) {
            const regex = /^\d{10,11}$/;  
            return regex.test(phone);
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login/register`, {
            username,
            password,
            phone,
          });
      
          if (response.status === 200 && response.data.success) {
            setSuccessMessage(response.data.message); // Extract and set success message
            setIsSuccess(true);
          } else {
            setErrorMessage('Đăng ký thất bại!'); // Set error message if not successful
          }
        } catch (error) {
          console.error(error);
          setErrorMessage('Đăng ký thất bại!'); // Set error message in case of errors
        }
      };

    // Reset success state after toast timeout (optional, adjust timeout as needed)
    useEffect(() => {
        if (isSuccess) {
            const timeout = setTimeout(() => setIsSuccess(false), 3000); // 3 seconds
            return () => clearTimeout(timeout);
        }
    }, [isSuccess]);


    return (
        <div>
            <div className=" bg-bg-login bg-cover min-h-screen flex justify-center items-center relative">
                <div className="bg-white min-h-screen flex-1" ></div>
                <div className="backdrop-blur-[4px] min-h-screen flex-1"></div>
                <div className="w-full md:w-[1000px] flex mx-auto absolute overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute 
             before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 
             after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                    <div className="flex-1">
                        <div className="md:pr-[60px]">
                            <img src={logo} alt="logo" className="mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-6">Đăng ký</h2>
                            <form onSubmit={validateForm}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="username">
                                        Tài khoản
                                    </label>
                                    <input
                                        className={`mt-1 p-2 w-full bg-gray-700  rounded-md text-white ${errors.username ? 'border-red-500 border-[1px]' : 'border-gray-600 border'}`}
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                                        Mật khẩu
                                    </label>
                                    <input
                                        className={`mt-1 p-2 w-full bg-gray-700  rounded-md text-white ${errors.username ? 'border-red-500 border-[1px]' : 'border-gray-600 border'}`}
                                        name="password"
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="phone">
                                        Số điện thoại
                                    </label>
                                    <input
                                        className={`mt-1 p-2 w-full bg-gray-700  rounded-md text-white ${errors.phone ? 'border-red-500 border-[1px]' : 'border-gray-600 border'}`}
                                        name="phone"
                                        id="phone"
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                     {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                </div>

                                <div className="flex justify-center mb-4">
                                    <button
                                        className="w-full bg-green-600 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                                        type="submit"
                                    >
                                        Đăng ký
                                    </button>
                                </div>

                                <div className="flex  justify-center items-center mb-2">
                                    <a href="/"
                                        className="w-full bg-white to-blue-500 
                                    text-black px-4 py-2 rounded-md hover:opacity-80 items-center justify-center flex"
                                    >
                                        <IoIosArrowRoundBack /> Quay về trang chủ
                                    </a>
                                </div>
                                <div className="text-white flex items-center justify-center mb-2">
                                    <p>Bạn đã có tài khoản <a className="text-green-600 after:content-['_↗'] ..." href="/login" target="_blank">Đăng nhập</a> ngay</p>
                                </div>
                                <Accordion >
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header >Hướng dẫn đăng ký</Accordion.Header>
                                        <Accordion.Body className="text-[16px]">
                                            Bước 1: Nhập đầy đủ và chính xác các thông tin ở form đăng ký <br />
                                            Họ và tên: Nhập đầy đủ và chính xác họ tên của bạn  <br />
                                            Email: Nhập chính xác email của bạn. Chúng tôi sẽ gửi mã xác thực nên vui lòng đảm bảo email bạn nhập vào là chính xác và có tồn tại <br />
                                            Mật khẩu: phải có ít nhất 8 ký tự bao gồm chữ số, chữ hoa, chữ thường và ký tự đặc biệt, không chứa tên đăng nhập <br />
                                            Bước 2: Đọc điều khoản sử dụng và xác nhận bạn đồng ý với điều khoản sử dụng của chúng tôi <br />
                                            Bước 3: Nhấn nút đăng ký để hoàn tất việc đăng ký tài khoản thành viên <br />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </form>
                        </div>
                    </div>
                    <div className="hidden flex-1 md:flex justify-start items-center">
                        <img src={imglogin} alt="imglogin" />
                    </div>
                </div>
                <ToastContainer className="p-3 z-50" position={position} >
                    {isSuccess && (
                        <Toast autohide className="bg-green-500 text-white">
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Thông báo</strong>
                                <small>{successMessage}</small>
                            </Toast.Header>
                            <Toast.Body>{successMessage}</Toast.Body>
                        </Toast>
                    )}
                    {errorMessage  && ( 
                        <Toast autohide className="bg-green-500 text-white">
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Thông báo</strong>
                                <small>{errorMessage}</small>
                            </Toast.Header>
                            <Toast.Body>{errorMessage}</Toast.Body>
                        </Toast>
                    )}
                </ToastContainer>
            </div>
        </div>
    );
};

export default Register;
