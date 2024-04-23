import React, {  useState } from 'react';

const Content1 = () => {
    const [username, setUsername] = useState('');
    const [namebrand, setNamebrand] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    
    return (
        <div className='h-auto flex flex-col mt-[40px]'>
            <span className='text-[20px] text-black font-medium mb-4'>Thông tin chung</span>
            <div className='grid grid-cols-1 sm:grid-cols-2 5 gap-4'>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="username">
                            Tên gian hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
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
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                            Điện thoại <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                            Email <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
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