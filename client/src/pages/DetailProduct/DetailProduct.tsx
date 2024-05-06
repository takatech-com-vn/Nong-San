import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../components/slick';
import axios from 'axios';
import { Product } from '../../services/Product';

const DetailProduct = () => {
    const { id } = useParams();
    const [Detail, setDetail] = useState<Product | null>(null);

    // Lấy thông tin sản phẩm khi có id
    useEffect(() => {
        id && getProduct();
    }, [id]);
    const getProduct = async () => {
        await axios
            .get(`https://66383a474253a866a24d16fe.mockapi.io/fake-api-product/product/${id}`)
            .then((response) => {
                const data = response.data;
                // Lưu thông tin chi tiết của sản phẩm vào state
                setDetail(data);
                console.log('data', data)
                // Lưu thông tin cấu hình của sản phẩm vào state
                // setConfiguration(data.configuration);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    // slider setting
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow onClick={function (): void {
            throw new Error("Function not implemented.");
        }} />,
        prevArrow: <PrevArrow onClick={function (): void {
            throw new Error("Function not implemented.");
        }} />,
    };





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
        <div className={`wrapper h-auto bg-[#fafafb] p-[16px] mt-[20px] ${isScrolled ? "pt-[280px] md:pt-[260px]" : "pt-3 md:pt-0"}`}>
            <div>
                <Breadcrumb
                    items={[
                        {
                            href: '/',
                            title: (<>
                                <HomeOutlined />
                                <span>Trang chủ</span></>)
                        },
                        {
                            title: `${id}`,
                        },
                    ]}
                />
            </div>
            <div className='mt-3'>
                <div className='flex flex-row h-[529px] w-full'>
                    <div className=' h-full w-[40%]'>
                        <div className=" items-center justify-between">
                            <Slider {...settings}>
                                {Detail?.thumbnail.map((image, index) => (
                                    <div key={index} className='w-[537px] h-[360px]'>
                                        <img src={image} alt="" className='w-full h-full object-cover rounded-[12px]' />
                                    </div>
                                ))}
                            </Slider>

                        </div>
                    </div>
                    <div className=' h-full w-[60%]'>
                        <div className='g'>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailProduct;
