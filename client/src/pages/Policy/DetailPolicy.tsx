import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined, } from '@ant-design/icons';
import { Policy } from '../../services/Policy';
// import { formatISODate } from '../../utils/dateUtils';

const DetailPolicy = () => {
    const { id } = useParams();
    const [policy, setPolicy] = useState<Policy| null>(null);

    useEffect(() => {
        id && getProduct();
    }, [id]);
    // Hàm lấy thông tin 
    const getProduct = async () => {
        await axios
            .get(`${import.meta.env.VITE_APP_API_URL}/policy/getpolicyid/${id}`)
            .then((response) => {
                const data = response.data.policis[0];
                setPolicy(data);
                console.log('data', data.policis)
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };
    console.log('policy', policy)
    //vị trí scoll
    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);
    const checkScroll = () => {
        setIsScrolled(window.pageYOffset > 1);
    };
    useEffect(() => {
        window.addEventListener("scroll", checkScroll);
        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, []);
    return (
        <>

            <div
                className={`wrapper h-auto bg-[#fafafb] p-[16px] mt-[20px] ${isScrolled ? "mt-[60px]" : "pt-3 md:pt-0"}
            `}
            >
                <div className='py-[10px]'>
                    <Breadcrumb className='text-[14px]'
                        items={[
                            {
                                href: '/',
                                title: (<>
                                    <HomeOutlined />
                                    <span>Trang chủ</span></>)
                            },
                            {
                                title: `${policy ? policy.name : id}`,
                            },  
                        ]}
                    />
                </div>
                <div className='flex flex-col md:flex-row'>
                    <div className='basis-9/12 '>
                        <div className='py-[12px]'>
                            {/* <span className='text-[12px] '>{policy?.created_at ? formatISODate(policy.created_at) : 'Ngày không rõ'}</span> */}
                        </div>
                        <div>
                            <h1 className='text-2xl'>{policy?.name}</h1>
                        </div>
                        <div className='h-[30px]'></div>
                        {policy?.content && <div dangerouslySetInnerHTML={{ __html: policy.content }} />}
                    </div>
                    <div className='basis-3/12 bg-yellow-200'>2</div>
                </div>
            </div>

        </>

    );
};

export default DetailPolicy;