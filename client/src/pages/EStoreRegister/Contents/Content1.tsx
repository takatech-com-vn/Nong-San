// Content.tsx
import React, { useEffect, useState } from 'react';

const Content1 = () => {
    const [username, setUsername] = useState('');
    const [namebrand, setNamebrand] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        const storedNamebrand = sessionStorage.getItem('namebrand');
        const storedPhone = sessionStorage.getItem('phone');
        const storedEmail = sessionStorage.getItem('email');
        if (storedUsername) setUsername(storedUsername);
        if (storedNamebrand) setNamebrand(storedNamebrand);
        if (storedPhone) setPhone(storedPhone);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    useEffect(() => {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('namebrand', namebrand);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);
    }, [username, namebrand, phone, email]);


    return (
        <div className='h-auto flex flex-col mt-[40px]'>
            <span className='text-[20px] text-black font-medium mb-4'>Thông tin chung</span>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="namebrand">
                            Tên gian hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border ${namebrand ? 'border-gray-600' : 'border-red-600'}`}
                            type="text"
                            id="namebrand"
                            value={namebrand}
                            onChange={(e) => setNamebrand(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                            Họ tên chủ gian hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border ${username ? 'border-gray-600' : 'border-red-600'}`}
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                            Điện thoại <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border ${phone ? 'border-gray-600' : 'border-red-600'}`}
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 border ${email ? 'border-gray-600' : 'border-red-600'}`}
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content1;
