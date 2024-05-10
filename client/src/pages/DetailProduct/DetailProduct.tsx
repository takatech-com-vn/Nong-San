import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Input } from 'antd';
import { Image, } from "antd";

import { HomeOutlined, } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../components/slick';
import axios from 'axios';
import { Product } from '../../services/Product';
import { FaStar } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { PiShoppingCartSimple } from 'react-icons/pi';
// interface CarouselInstance {
//     goTo: (index: number) => void;
//     next: () => void;
//     prev: () => void;
//     autoPlay: (play: boolean) => void;
//     innerSlider: never;
// }
interface PreviewState {
    [key: number]: boolean;
}

const DetailProduct = () => {
    const { id } = useParams();
    const [Detail, setDetail] = useState<Product | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
    // const carouselRef = React.useRef<CarouselInstance | null>(null);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const carouselRef = React.useRef<any>(null);




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
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current: number) => setCurrentImage(current),
        swipeToSlide: true,
        nextArrow: <NextArrow onClick={function (): void {
            throw new Error("Function not implemented.");
        }} />,
        prevArrow: <PrevArrow onClick={function (): void {
            throw new Error("Function not implemented.");
        }} />,
    };



    // // Hàm xử lý sự kiện khi nhấp vào hình thu nhỏ
    // const handleThumbnailHover = (index: number) => {
    //     setCurrentImage(index);
    //     if (carouselRef.current !== null) {
    //         carouselRef.current.goTo(index)
    //     }
    // };




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

    const [preview, setPreview] = useState<PreviewState>({});

    const clickPreview = (index: number) => {
        setPreview({ ...preview, [index]: true });
    }

    // tăng giảm số lượng 
    const [quantity, setQuantity] = useState<number>(1);

    const handleDecrease = () => {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    }

    const maxQuantity = Detail?.quantity;
    const handleIncrease = () => {
        if (maxQuantity !== undefined) {
            setQuantity(prevQuantity => prevQuantity < maxQuantity ? prevQuantity + 1 : maxQuantity);
        }
    }

    const checkDisable = () => {
        return maxQuantity !== undefined && quantity >= maxQuantity;
    }
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(event.target.value);

        if (!isNaN(newValue)) {
            if (newValue > 100) {
                newValue = 100;
            } else if (newValue < 1) {
                newValue = 1;
            }
            setQuantity(newValue);
        }
    };

    const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
    const handleCapacityChange = (capacity: string) => {
        setSelectedCapacity(capacity);
    };
    const getPriceForSelectedType = () => {
        const selectedProduct = Detail?.variations.find(product => product.capacity === selectedCapacity);
        return selectedProduct ? selectedProduct.price : Detail?.price;
    };
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
                <div className='flex flex-row h-[529px] w-full gap-4'>
                    <div className=' h-full w-[40%]'>
                        <div className=" items-center justify-between">
                            <Slider {...settings} ref={carouselRef}>
                                {Detail?.thumbnail.map((image, index) => (
                                    <div key={index} className="w-full h-[360px] rounded-[12px] overflow-hidden relative">
                                        <Image
                                            className="w-full h-full object-cover rounded-[12px]"
                                            src={image}
                                            width={"100%"}
                                            height={'100%'}
                                            preview={{
                                                visible: preview[index],
                                                onVisibleChange: (vis: boolean) => setPreview({ ...preview, [index]: vis })
                                            }}
                                        />
                                        <button onClick={() => clickPreview(index)} className='absolute text-red-600 top-0 right-0'></button>
                                    </div>

                                ))}
                            </Slider>

                        </div>
                        <div className="h-[56px] w-full mt-3  gap-2 flex justify-center">

                            {Detail?.thumbnail.map((image, index) => (
                                <Image.PreviewGroup
                                    key={index}
                                    preview={{
                                        onChange: (current, prev) =>
                                            console.log(`current index: ${current}, prev index: ${prev}`),
                                    }}
                                >
                                    <img
                                        width={80}
                                        height={80}
                                        src={image}
                                        onClick={() => carouselRef.current?.slickGoTo(index)}
                                        style={{
                                            border:
                                                currentImage === index ? "2px solid green" : "none",
                                        }}
                                        className='rounded-xl '
                                    />
                                </Image.PreviewGroup>
                            ))}
                        </div>
                    </div>
                    <div className=' h-full w-[60%] relative'>
                        <div className='flex flex-row absolute top-0 right-0 text-[15px] gap-1'><CiHeart size={20} /> 1 lượt thích</div>
                        <div className=' p-3 flex flex-col gap-4 '>
                            <h1 className='font-bold text-[20px] leading-5'>{Detail?.name}</h1>
                            <button className="text-[17px] flex text-gray-300"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></button>
                            <span className='font-bold'>{getPriceForSelectedType()}đ</span>
                            <span className='font-bold'>Phân loại</span>
                            <div className='flex gap-3'>
                                {Detail?.variations.map((variation, index) => (
                                    <button
                                        key={index}
                                        className={`w-[200px] h-[71px] px-4 py-2 rounded-xl border-gray-500 border-[1px]  bg-white hover:border-green-600 
                                        items-center justify-center flex flex-col
                                        ${selectedCapacity === variation.capacity ? 'border-green-700 text-green-700' : ''}`}
                                        onClick={() => handleCapacityChange(variation.capacity)}
                                    >
                                        {variation.capacity}<br />
                                        {variation.price}đ
                                    </button>
                                ))}
                            </div>
                            <div>
                                <span className='font-bold'>Số lượng</span>
                                <div className='flex gap-1 items-center ' >
                                    <Button onClick={handleDecrease}>-</Button>
                                    <Input
                                        id="quantity-input"
                                        type="number"
                                        min={1}
                                        max={100}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className='w-auto'
                                    />

                                    <Button disabled={checkDisable()} onClick={handleIncrease}>+</Button>
                                    <span>{Detail?.quantity} có sẵn</span>
                                </div>
                            </div>

                            <div className='flex flex-row gap-3'>
                                <button
                                    className={`w-[200px] h-[71px] px-4 py-2 rounded-xl border-[1px] border-green-700 text-green-700
                                        items-center justify-center flex flex-col text-[15px]`}
                                >
                                    <a><PiShoppingCartSimple className='text-[20px]' /></a> <a> Thêm vào giỏ hàng </a>
                                </button>
                                <button
                                    className={`w-full h-[71px] px-4 py-2 rounded-xl border-[1px] bg-green-700 text-white
                                        items-center justify-center flex flex-col text-[15px]`}
                                >
                                    <a className=' font-bold text-[18px]'>MUA NGAY</a> <a> (Giao hàng hoặc nhận tại cửa hàng)</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailProduct;
