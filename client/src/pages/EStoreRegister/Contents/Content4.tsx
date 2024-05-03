import React, { useEffect, useRef, useState } from 'react';
import { Checkbox } from 'antd';
import type { GetProp } from 'antd';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { TfiReload } from 'react-icons/tfi';

const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

const options = [
    { label: 'Công ty được thành lập hợp pháp', value: 'Công ty được thành lập hợp pháp' },
    { label: 'Có khả năng nhận hàng trả lại và quản lý bảo hành sản phẩm', value: 'Có khả năng nhận hàng trả lại và quản lý bảo hành sản phẩm' },
    { label: 'Sản phẩm hợp pháp, nguyên bản', value: 'Sản phẩm hợp pháp, nguyên bản' },
    { label: 'Chấp nhận các điều khoản sử dụng của sàn', value: 'Chấp nhận các điều khoản sử dụng của sàn' },
];

const Content4: React.FC = () => {
    const captchaInputRef = useRef<HTMLInputElement>(null);
    const [captchaValid, setCaptchaValid] = useState<boolean>(false);

    useEffect(() => {
        loadCaptchaEnginge(6);
        sessionStorage.setItem('captchaValid', 'false');
    }, []);
    const reloadCaptcha = () => {
        loadCaptchaEnginge(6);
        setCaptchaValid(false);
        sessionStorage.setItem('captchaValid', 'false');
    };
    
    const doSubmit = () => {
        const userCaptchaValue = captchaInputRef.current?.value;
        if (userCaptchaValue && validateCaptcha(userCaptchaValue) === true) {
            setCaptchaValid(true);
            sessionStorage.setItem('captchaValid', 'true');
        } else if (!captchaValid) { // chỉ đặt lại captchaValid nếu nó chưa đúng
            setCaptchaValid(false);
            sessionStorage.setItem('captchaValid', 'false');
        }
    };
    

    return (
        <div className='h-auto flex flex-col mt-[40px] text-black'>
            <span className='text-[20px]  font-medium mb-4'>Yêu cầu bạn phải đáp ứng</span>
            <div className='flex flex-col gap-3'>
                <div>
                    <p>Chúng tôi mong muốn phát triển với Thị trường đa kênh và chọn lọc,
                        đó là lý do tại sao chúng tôi yêu cầu các đối tác kinh doanh tuân thủ các tiêu chí về hình thức và chất lượng,
                        nhằm mang đến cho họ trải nghiệm tốt nhất.. Vì lý do này, bước đầu tiên, điều quan trọng là bạn phải giúp chúng tôi
                        bằng cách xác nhận xem bạn có đáp ứng các yêu cầu hoạt động sau không:
                    </p>
                </div>
                <div className='w-'>
                    <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} className='flex flex-col gap-2' />
                </div>
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
