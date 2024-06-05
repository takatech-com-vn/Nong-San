import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Input } from 'antd';
import { Image, } from "antd";

import { HomeOutlined, } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../components/slick';
import axios from 'axios';
import { Product } from '../../services/Product';
import { CiHeart } from 'react-icons/ci';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { formatCurrencyVND } from '../../utils/formatCurrency';

interface PreviewState {
    [key: number]: boolean;
}

const DetailProduct = () => {
    const { id } = useParams();
    const [Detail, setDetail] = useState<Product | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
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
                setDetail(data);

            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

    };
    console.log('data', Detail)
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
    const getPriceForSelectedType = (): number => {
        const selectedProduct = Detail?.variations.find(product => product.capacity === selectedCapacity);
        return selectedProduct ? selectedProduct.price : Detail?.price ?? 0; 
    };

    return (
        <div className={`wrapper h-auto bg-[#fafafb] p-[16px] mt-[10px] }`}>
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
                                    <div key={index} className="w-full h-[360px] rounded-[5px] overflow-hidden relative">
                                        <Image
                                            className="w-full h-full object-cover rounded-[5px]"
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
                                                currentImage === index ? "2px solid #0055aa" : "none",
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
                            <h1 className='font-bold text-[18px] leading-5 text-[#1a428a] capitalize '>{Detail?.name}</h1>
                            {/* <button className="text-[17px] flex text-gray-300"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></button> */}
                            <span className='font-bold text-[#ff8300]'>{formatCurrencyVND(getPriceForSelectedType())}</span>
                            <span className='font-bold'>Phân loại</span>
                            <div className='flex gap-3'>
                                {Detail?.variations.map((variation, index) => (
                                    <button
                                        key={index}
                                        className={`w-[200px] h-[71px] px-4 py-2 rounded-[5px] border-gray-500 border-[1px]  bg-white hover:border-[#0055aa] hover:text-[#0055aa]
                                        items-center justify-center flex flex-col
                                        ${selectedCapacity === variation.capacity ? 'border-[#0055aa] text-[#0055aa]' : ''}`}
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
                                    className={`w-full h-[71px] px-4 py-2 rounded-[5px] border-[1px] border-[#0055aa] text-[#0055aa]
                                        items-center justify-center flex flex-col text-[15px]`}
                                >
                                    <a><PiShoppingCartSimple className='text-sm' /></a> <a> Thêm vào giỏ hàng </a>
                                </button>
                                <button
                                    className={`w-full h-[71px] px-4 py-2 rounded-[5px] border-[1px] bg-[#ff8300] text-white
                                        items-center justify-center flex flex-col text-sm`}
                                >
                                    <a className=' font-bold '>YÊU CẦU BÁO GIÁ</a>
                                </button>
                                <button
                                    className={`w-full h-[71px] px-4 py-2 rounded-[5px] border-[1px] bg-[#0055aa] text-white
                                        items-center justify-center flex flex-col text-sm`}
                                >
                                    <a className='font-bold'>MUA NGAY</a> <a> (Giao hàng hoặc nhận tại cửa hàng)</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div>
                <div className='flex flex-row gap-3'>
                    <img src="" alt="" className='rounded-full bg-slate-400 h-[70px] w-[70px]' />
                    <div className='flex flex-col justify-center w-full gap-3'>
                        <a href="" className='text-[#1a428a]'>{Detail?.brand}</a>
                        <div className='text-[#0006] text-sm flex flex-row justify-between items-center'>
                            <div>
                                <label>Đánh giá:</label>
                                <span className='text-[#ff8300]'>1</span>
                            </div>
                            <div>
                                <label>Sản phẩm:</label>
                                <span className='text-[#ff8300]'>10</span>
                            </div>
                            <div>
                                <label>Tham gia:</label>
                                <span className='text-[#ff8300]'>18/05/2024</span>
                            </div>
                            <div>
                                <label>Người theo dõi:</label>
                                <span className='text-[#ff8300]'>1k</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:my-5">
                <div className='basis-8/12 lg:pr-2'>
                    <div className='flex flex-col gap-3'>
                        <div className="flex-1 min-w-[250px] bg-gray-100 border border-gray-300 rounded-lg p-5 mb-5 lg:mb-0">
                            <div className="text-xl font-bold mb-3">
                                <span>Chi tiết sản phẩm</span>
                            </div>
                            <div className="text-base">
                                <p>coffephe</p>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[250px] bg-gray-100 border border-gray-300 rounded-lg p-5 mb-5 lg:mb-0">
                            <div className="text-xl font-bold mb-3">
                                <span>Đánh giá về sản phẩm</span>
                            </div>
                            <div className="text-base">
                                <p className="text-green-600">0 trên 5</p>
                                <div className="text-yellow-500 text-xl">
                                    <span>★★★★★</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className=' basis-4/12 lg:pl-1'>
                    <div className="flex flex-col min-w-[250px] bg-gray-100 border border-gray-300 rounded-lg p-5">
                        <div className="text-xl font-bold mb-3">
                            <span>Thông số kỹ thuật</span>
                        </div>
                        <div className="text-base">
                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Loại thực phẩm</td>
                                        <td className="py-2 border-b border-gray-300">Khác</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Bán sỉ</td>
                                        <td className="py-2 border-b border-gray-300">Thỏa thuận</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Giá sỉ</td>
                                        <td className="py-2 border-b border-gray-300">10000</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Thời gian bảo quản</td>
                                        <td className="py-2 border-b border-gray-300">6</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Mã vùng</td>
                                        <td className="py-2 border-b border-gray-300">565</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Giảm cân đặc biệt</td>
                                        <td className="py-2 border-b border-gray-300">Không gluten</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Ngày hết hạn</td>
                                        <td className="py-2 border-b border-gray-300">9</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Ngày sản xuất</td>
                                        <td className="py-2 border-b border-gray-300">8</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Thành phần</td>
                                        <td className="py-2 border-b border-gray-300">coffephe</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Trọng lượng</td>
                                        <td className="py-2 border-b border-gray-300">20g</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 border-b border-gray-300">Kiểu đóng gói</td>
                                        <td className="py-2 border-b border-gray-300">gói, bình</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailProduct;
