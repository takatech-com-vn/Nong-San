import React, { useEffect, useState } from 'react';

const Content3 = () => {
    const [tenNguoiLienHe, setTenNguoiLienHe] = useState('');
    const [diaChiKhoHang, setDiaChiKhoHang] = useState('');
    const [toaDoKhoHang, setToaDoKhoHang] = useState('');
    const [phoneKhoHang, setPhoneKhoHang] = useState('');

    useEffect(() => {
        const storedTenNguoiLienHe = sessionStorage.getItem('tenNguoiLienHe');
        const storedDiaChiKhoHang = sessionStorage.getItem('diaChiKhoHang');
        const storedToaDoKhoHang = sessionStorage.getItem('toaDoKhoHang');
        const storedPhoneKhoHang = sessionStorage.getItem('phoneKhoHang');

        if (storedTenNguoiLienHe) setTenNguoiLienHe(storedTenNguoiLienHe);
        if (storedDiaChiKhoHang) setDiaChiKhoHang(storedDiaChiKhoHang);
        if (storedToaDoKhoHang) setToaDoKhoHang(storedToaDoKhoHang);
        if (storedPhoneKhoHang) setPhoneKhoHang(storedPhoneKhoHang);
    }, []);

    useEffect(() => {
        sessionStorage.setItem('tenNguoiLienHe', tenNguoiLienHe);
        sessionStorage.setItem('diaChiKhoHang', diaChiKhoHang);
        sessionStorage.setItem('toaDoKhoHang', toaDoKhoHang);
        sessionStorage.setItem('phoneKhoHang', phoneKhoHang);
    }, [tenNguoiLienHe, diaChiKhoHang, toaDoKhoHang, phoneKhoHang]);


    return (
        <div className='h-auto flex flex-col mt-[40px]'>
            <span className='text-[20px] text-black font-medium mb-4'>Thông tin kho hàng</span>
            <div className='grid grid-cols-1 sm:grid-cols-2 5 gap-4'>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="tenNguoiLienHe">
                            Họ tên người liên hệ <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={tenNguoiLienHe}
                            onChange={(e) => setTenNguoiLienHe(e.target.value)}
                            id='tenNguoiLienHe'
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="diaChiKhoHang">
                            Địa chỉ kho hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={diaChiKhoHang}
                            onChange={(e) => setDiaChiKhoHang(e.target.value)}
                            id='diaChiKhoHang'
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="toaDoKhoHang">
                            Tọa độ kho hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={toaDoKhoHang}
                            onChange={(e) => setToaDoKhoHang(e.target.value)}
                            id='toaDoKhoHang'
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="phoneKhoHang">
                            Số điện thoại kho hàng <span className='text-red-600'>*</span>
                        </label>
                        <input
                            className={`mt-1 p-2 w-full bg-white  rounded-md text-gray-700 ' : 'border-gray-600 border'}`}
                            type="text"
                            value={phoneKhoHang}
                            onChange={(e) => setPhoneKhoHang(e.target.value)}
                            id='phoneKhoHang'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content3;