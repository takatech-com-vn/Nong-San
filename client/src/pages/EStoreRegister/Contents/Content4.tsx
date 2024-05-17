import React, { useEffect, useRef, useState } from 'react';
import { Checkbox } from 'antd';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { TfiReload } from 'react-icons/tfi';

const options = [
    { label: 'Công ty được thành lập hợp pháp', value: 'Công ty được thành lập hợp pháp' },
    { label: 'Có khả năng nhận hàng trả lại và quản lý bảo hành sản phẩm', value: 'Có khả năng nhận hàng trả lại và quản lý bảo hành sản phẩm' },
    { label: 'Sản phẩm hợp pháp, nguyên bản', value: 'Sản phẩm hợp pháp, nguyên bản' },
    { label: 'Chấp nhận các điều khoản sử dụng của sàn', value: 'Chấp nhận các điều khoản sử dụng của sàn' },
];

const Content4: React.FC = () => {
    const captchaInputRef = useRef<HTMLInputElement>(null);
    const [captchaValid, setCaptchaValid] = useState<boolean>(false);
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    useEffect(() => {
        loadCaptchaEnginge(6);
        sessionStorage.setItem('captchaValid', 'false');

        // Load saved checkbox values from session storage
        const savedChecks = sessionStorage.getItem('checkedValues');
        if (savedChecks) {
            setCheckedValues(JSON.parse(savedChecks));
        }
    }, []);

    const onChange = (checkedValues: string[]) => {
        console.log('checked = ', checkedValues);
        setCheckedValues(checkedValues);
        sessionStorage.setItem('yeuCauDapUng', JSON.stringify(checkedValues));
    };

    const reloadCaptcha = () => {
        loadCaptchaEnginge(6);
        setCaptchaValid(false);
        sessionStorage.setItem('captchaValid', 'false');
    };

    const doSubmit = () => {
        const userCaptchaValue = captchaInputRef.current?.value;
        if (userCaptchaValue && validateCaptcha(userCaptchaValue)) {
            setCaptchaValid(true);
            sessionStorage.setItem('captchaValid', 'true');
        } else {
            setCaptchaValid(false);
            sessionStorage.setItem('captchaValid', 'false');
        }
    };

    return (
        <div className='h-auto flex flex-col mt-[40px] text-black'>
            <span className='text-[20px] font-medium mb-4'>Yêu cầu bạn phải đáp ứng</span>
            <div className='flex flex-col gap-3'>
                <Checkbox.Group options={options} value={checkedValues} onChange={onChange} className='flex flex-col gap-2' />
                <div className='flex flex-row gap-2'>
                    <span>Mã bảo mật</span>
                    <LoadCanvasTemplate /><button className='text-red-600 text-xl active:animate-spin' onClick={reloadCaptcha}><TfiReload /></button>
                    <input ref={captchaInputRef} type="text" placeholder="Nhập mã bảo mật" />
                    <button onClick={doSubmit} className={`${captchaValid ? 'bg-green-400' : 'bg-red-400'} p-1 rounded-lg text-white`}>Xác nhận</button>
                </div>
            </div>
        </div>
    );
};

export default Content4;
