// Content.tsx
import React, { useContext, useEffect, useState } from 'react';
import ValidationContext from './ValidationContext';
const Content1 = () => {
    const [tenChuGianHang, setTenChuGianHang] = useState('');
    const [tenGianHang, setTenGianHang] = useState('');
    const [phoneCaNhan, setPhoneCaNhan] = useState('');
    const [emailCaNhan, setEmailCaNhan] = useState('');
    const validationContext = useContext(ValidationContext);
    const [error, setError] = useState({ tenChuGianHang: '', tenGianHang: '', phoneCaNhan: '', emailCaNhan: '' });
    const validate = () => {
        const errors = {
            tenChuGianHang: tenChuGianHang ? '' : 'Chưa nhập tên gian hàng',
            tenGianHang: tenGianHang ? '' : 'Chưa nhập tên chủ gian hàng',
            phoneCaNhan: phoneCaNhan ? (phoneCaNhan.match(/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/) ? '' : 'Số điện thoại không đúng định dạng') : 'Chưa nhập số điện thoại',
            emailCaNhan: emailCaNhan ? (emailCaNhan.includes('@') ? '' : 'Email không đúng định dạng') : 'Chưa nhập email',
        };
        setError(errors);
        return !Object.values(errors).some(x => x);
    };
    // Cập nhật phương thức validate trong ValidationContext
    useEffect(() => {
        validationContext.validate = validate;
    }, [tenChuGianHang, tenGianHang, phoneCaNhan, emailCaNhan]);

    useEffect(() => {
        const storedtenChuGianHang = sessionStorage.getItem('tenChuGianHang');
        const storedtenGianHang = sessionStorage.getItem('tenGianHang');
        const storedphoneCaNhan = sessionStorage.getItem('phoneCaNhan');
        const storedemailCaNhan = sessionStorage.getItem('emailCaNhan');
        if (storedtenChuGianHang) setTenChuGianHang(storedtenChuGianHang);
        if (storedtenGianHang) setTenGianHang(storedtenGianHang);
        if (storedphoneCaNhan) setPhoneCaNhan(storedphoneCaNhan);
        if (storedemailCaNhan) setEmailCaNhan(storedemailCaNhan);
    }, []);

    useEffect(() => {
        sessionStorage.setItem('tenChuGianHang', tenChuGianHang);
        sessionStorage.setItem('tenGianHang', tenGianHang);
        sessionStorage.setItem('phoneCaNhan', phoneCaNhan);
        sessionStorage.setItem('emailCaNhan', emailCaNhan);
    }, [tenChuGianHang, tenGianHang, phoneCaNhan, emailCaNhan]);


    return (
        <div className='h-auto flex flex-col mt-[40px]'>
            <span className='text-[20px] text-black font-medium mb-4'>Thông tin chung</span>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="tenGianHang">
                            Tên gian hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 ${error.tenGianHang ? 'border-red-600 border-[1px]' : 'border-gray-600 border-[1px]'}`}
                            type="text"
                            id="tenGianHang"
                            value={tenGianHang}
                            onChange={(e) => setTenGianHang(e.target.value)}
                        />
                        {error.tenGianHang && <div className="text-red-600">{error.tenGianHang}</div>}
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="tenChuGianHang">
                            Họ tên chủ gian hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 ${error.tenChuGianHang ? 'border-red-600 border-[1px]' : 'border-gray-600 border-[1px]'}`}
                            type="text"
                            id="tenChuGianHang"
                            value={tenChuGianHang}
                            onChange={(e) => setTenChuGianHang(e.target.value)}
                        />
                        {error.tenChuGianHang && <div className="text-red-600">{error.tenChuGianHang}</div>}
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="phoneCaNhan">
                            Điện thoại <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 ${error.phoneCaNhan ? 'border-red-600 border-[1px]' : 'border-gray-600 border-[1px]'}`}
                            type="text"
                            id="phoneCaNhan"
                            value={phoneCaNhan}
                            onChange={(e) => setPhoneCaNhan(e.target.value)}
                        />
                        {error.phoneCaNhan && <div className="text-red-600">{error.phoneCaNhan}</div>}
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="emailCaNhan">
                            Email <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 ${error.emailCaNhan ? 'border-red-600 border-[1px]' : 'border-gray-600 border-[1px]'}`}
                            type="text"
                            id="emailCaNhan"
                            value={emailCaNhan}
                            onChange={(e) => setEmailCaNhan(e.target.value)}
                        />
                        {error.emailCaNhan && <div className="text-red-600">{error.emailCaNhan}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content1;
