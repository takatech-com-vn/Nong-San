import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { New } from '../../services/New';
import { Breadcrumb } from 'antd';
import { HomeOutlined, } from '@ant-design/icons';
import { formatISODate } from '../../utils/dateUtils';
const DetailNews = () => {
    const { id } = useParams();
    const [Detail, setDetail] = useState<New | null>(null);

    useEffect(() => {
        id && getProduct();
    }, [id]);
    // Hàm lấy thông tin sản phẩm
    const getProduct = async () => {
        await axios
            .get(`${import.meta.env.VITE_APP_API_URL}/new/getnewid/${id}`)
            .then((response) => {
                const data = response.data.news[0];
                setDetail(data);
                console.log('data', data.news)
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };
    console.log('detail', Detail)
    //vị trí scoll
    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    // const [isScrolled, setIsScrolled] = useState(false);
    // const checkScroll = () => {
    //     setIsScrolled(window.pageYOffset > 1);
    // };
    // useEffect(() => {
    //     window.addEventListener("scroll", checkScroll);
    //     return () => {
    //         window.removeEventListener("scroll", checkScroll);
    //     };
    // }, []);
    return (
        <>

            <div
                className={`wrapper h-auto bg-[#fafafb] p-[16px] mt-[20px] 
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
                                title: `${Detail ? Detail.name_new : id}`,
                            },
                        ]}
                    />
                </div>
                <div className='flex flex-row'>
                    <div className='basis-9/12 '>
                        <div className='py-[12px]'>
                            <span className='text-[12px] '>{Detail?.created_at ? formatISODate(Detail.created_at) : 'Ngày không rõ'}</span>
                        </div>
                        <div>
                            <h1 className='text-2xl'>{Detail?.name_new}</h1>
                        </div>
                        <div className='h-[30px]'></div>
                        {Detail?.content && <div dangerouslySetInnerHTML={{ __html: Detail.content }} />}
                    </div>
                    <div className='basis-3/12 bg-yellow-200'>2</div>
                </div>
            </div>

        </>

    );
};

export default DetailNews;