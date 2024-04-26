// Content2.tsx
import React, { useEffect, useState } from 'react';

const Content2 = () => {
    const [username2, setUsername2] = useState('');
    const [namebrand2, setNamebrand2] = useState('');
    const [phone2, setPhone2] = useState('');
    const [email2, setEmail2] = useState('');

    useEffect(() => {
        const storedUsername2 = sessionStorage.getItem('username2');
        const storedNamebrand2 = sessionStorage.getItem('namebrand2');
        const storedPhone2 = sessionStorage.getItem('phone2');
        const storedEmail2 = sessionStorage.getItem('email2');
        if (storedUsername2) setUsername2(storedUsername2);
        if (storedNamebrand2) setNamebrand2(storedNamebrand2);
        if (storedPhone2) setPhone2(storedPhone2);
        if (storedEmail2) setEmail2(storedEmail2);
    }, []);

    useEffect(() => {
        sessionStorage.setItem('username2', username2);
        sessionStorage.setItem('namebrand2', namebrand2);
        sessionStorage.setItem('phone2', phone2);
        sessionStorage.setItem('email2', email2);
    }, [username2, namebrand2, phone2, email2]);

    return (
        <div className='h-auto flex flex-col mt-[40px]'>
            <span className='text-[20px] text-black font-medium mb-4'>Thông tin chung</span>
            <div className='grid grid-cols-1 sm:grid-cols-2 5 gap-4'>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="username2">
                            Tên gian hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={namebrand2}
                            onChange={(e) => setNamebrand2(e.target.value)}
                            name='username2'
                            id='username2'
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="namebrand2">
                            Họ tên chủ gian hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={username2}
                            onChange={(e) => setUsername2(e.target.value)}
                            name='namebrand2'
                            id='namebrand2'
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="phone2">
                            Điện thoại <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={phone2}
                            onChange={(e) => setPhone2(e.target.value)}
                            name='phone2'
                            id='phone2'
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email2">
                            Email <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={email2}
                            onChange={(e) => setEmail2(e.target.value)}
                            name='email2'
                            id='email2'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content2;
