import { useEffect, useState } from "react";
import { Divider, Pagination, message } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../../redux/productSlice';
import { RootState } from '../../redux/store';
import Slider from "react-slick";
import Card from "./components/Card";
import { NextArrow, PrevArrow } from "../../components/slick/index";
import CardProduct from "./components/CardProduct";
import { GoArrowRight } from "react-icons/go";
import CardProduct2 from "./components/CardProduct2";
import CardBrand from "./components/CardBrand";
import CardNews from "./components/CardNews";
import { Banner } from "../../services/Banner";
import { New } from "../../services/New";
import { useNavigate } from "react-router-dom";
// import MenuBar from "./components/Menu";
// import { Menu } from 'antd';

interface Category {
  title: string;
  subCategories: string[];
}

const categories: Category[] = [
  {
    title: 'Thiết Bị Văn Phòng',
    subCategories: [],
  },
  {
    title: 'Nội Thất Văn Phòng',
    subCategories: [
      'Ngành In Ấn & Bao Bì',
      'Ngành Dệt May',
      'Ngành Nhựa & Cao Su',
      'Ngành Thực Phẩm & Đồ Uống',
    ],
  },
  {
    title: 'Phương Tiện Vận Tải',
    subCategories: [
      'Thiết Bị Kho & Đóng Gói',
      'Máy Móc Cơ Khí & Xi Mạ',
      'Máy Móc Vệ Sinh Công Nghiệp',
    ],
  },
  {
    title: 'Vật Tư Xây Dựng',
    subCategories: [],
  },
  {
    title: 'Thiết Bị Nội & Ngoại Thất',
    subCategories: [],
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsdata = useSelector((state: RootState) => state.product.products);
  const [newsdata, setNewsData] = useState<New[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  //data product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://dummyjson.com/products'
        });
        dispatch(setProducts(response.data.products));
        // console.log(response.data.products);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  //data banner
  const [dataBanners, setDataBanners] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/slide/getlistslidepc`);
        const banners = response.data.banner_pcs.map((banner: Banner) => ({
          ...banner,
          // Đảm bảo rằng chỉ có một /images trong đường dẫn
          path: `${import.meta.env.VITE_APP_API_URL}${banner.path}`
        }));
        setDataBanners(banners);
        console.log("banners: " + JSON.stringify(banners));
      } catch (error) {
        console.error('Lỗi data slide', error)
      }
    };
    fetchData();
  }, []);

  //data news
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/new/getnew`);
        if (response.data.success) {
          setNewsData(response.data.news);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error("Lỗi lấy dữ liệu tin tức");
      }
    }

    fetchData();
  }, []);

  const [mouseDownTime, setMouseDownTime] = useState<number>(0);
  const handleMouseDown = () => {
    setMouseDownTime(Date.now());
  };
  // chi tiết tin tức
  const handleMouseUp = (e: React.MouseEvent<HTMLElement>, news: New) => {
    const mouseUpTime = Date.now();
    if (mouseUpTime - mouseDownTime < 150) { // Chỉ xử lý nhấp nếu thời gian nhấn xuống rất ngắn
      e.stopPropagation();
      navigate(`/news/${news.id}`);
    }
  };



  //-------------//
  // const [isScrolled, setIsScrolled] = useState(false);
  // const checkScroll = () => {
  //   if (window.pageYOffset > 1) {
  //     setIsScrolled(true);
  //   } else {
  //     setIsScrolled(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", checkScroll);
  //   return () => {
  //     window.removeEventListener("scroll", checkScroll);
  //   };
  // }, []);
  // slider setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow onClick={function (): void {
      throw new Error("Function not implemented.");
    }} />,
    prevArrow: <PrevArrow onClick={function (): void {
      throw new Error("Function not implemented.");
    }} />,
  };

  const settingProduct = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={function (): void {
      throw new Error("Function not implemented.");
    }} />,
    prevArrow: <PrevArrow onClick={function (): void {
      throw new Error("Function not implemented.");
    }} />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };
  const settingNews = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      }
    ],
  };

  const products = [
    {
      name: 'MÁY CHỦ/ SERVER DELL T30 GIÁ RẺ CHO DN.',
      image: 'https://vietnam.atalink.com/_next/image?url=https%3A%2F%2Fapi.atalink.com%2Fphotos%2Fimg_ae925655-606d-4ddb-9da8-de5b9bbf460b%2Fview&w=256&q=100',
      discount: '-47%',
      price: '80.000 ₫ ',
      originalPrice: '150.000 ₫',
    },
    {
      name: 'Sầu riêng sấy thăng hoa 70G',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xdefault/upload/2006294/20231125/402650845_2632038576954949_7867052642130283026_n_e60b8.jpg',
      discount: '',
      price: '85.000₫',
      originalPrice: '',
    },
    {
      name: 'Tiêu xanh sấy thăng hoa 40g',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xdefault/upload/2006294/20231122/401848570_2632038563621617_4050259910135169988_n_9a8ac.jpg',
      discount: '',
      price: '65.000₫',
      originalPrice: '',
    },
    {
      name: 'Mít sấy thăng hoa',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xdefault/upload/2006294/20231122/z4859386710658_07c8bb4a9cc44aff744ec6b38fbaf887_56851.jpg',
      discount: '-47%',
      price: '99.000₫',
      originalPrice: '150.000 ₫',
    },
    {
      name: 'Măng cụt sấy thăng hoa',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xdefault/upload/2006294/20231122/MANG_CUT_14c2c.png',
      discount: '',
      price: '210.000₫',
      originalPrice: '',
    },
    {
      name: 'Dâu tây sấy thăng hoa',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xdefault/upload/2006294/20231122/DAU_d288a.jpg',
      discount: '',
      price: '120.000₫',
      originalPrice: '',
    },
    {
      name: 'Sầu riêng sấy thăng hoa',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xdefault/upload/2006294/20231122/sau_29f7c.jpg',
      discount: '',
      price: '180.000₫',
      originalPrice: '',
    },
  ];

  //fake data brands
  const brands = [
    {
      id: 1,
      name: 'Shop1',
      image: 'https://api.atalink.com/photos/img_59a1a852-ec6d-43a3-a40e-05dbd6586312/view?variant=origin',

    },
    {
      id: 2,
      name: 'Shop2',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xfull/upload/2006294/20231111/385547851_1022609165714807_5542423750740638259_n_0aa47.png',

    },
    {
      id: 3,
      name: 'Shop3',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xfull/upload/2006294/20231110/300225840_494489732677484_628622091944813387_n_3706f.jpg',

    },
    {
      id: 4,
      name: 'Shop4',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xfull/upload/2006294/20231111/tamgiaphat-01_25d27.png',

    },
    {
      id: 5,
      name: 'Shop5',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xfull/upload/2006294/20231111/logo-lamngochoi_com-_8bc65.png',

    },
  ]



  // Tính toán sản phẩm hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsdata.slice(indexOfFirstItem, indexOfLastItem);
  // const [headerHeight, setHeaderHeight] = useState(60); // Giá trị ban đầu là chiều cao ước tính của header
  // const [isShow, setIsShow] = useState(false); // Tạo biến isShow để kiểm tra xem header đã được kéo xuống hay chưa

  // const handleScroll = () => {
  //   if (window.pageYOffset > 1) {
  //     setIsShow(true);
  //   } else {
  //     setIsShow(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // useEffect(() => {
  //   const handleResize = () => {
  //     const headerElement = document.getElementById('header');
  //     if (headerElement) {
  //       setHeaderHeight(headerElement.offsetHeight);

  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize(); // Gọi ngay lần đầu để lấy chiều cao chính xác

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  const [currentSubCategories, setCurrentSubCategories] = useState<string[]>([]);
  const [hovered, setHovered] = useState<boolean>(false);

  const handleHover = (subCategories: string[]) => {
    setCurrentSubCategories(subCategories);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div className={` h-auto  bg-gradient-to-b from-[#c2effa] via-[#f0f2f5] to-[#f0f2f5]`} >
      {/* <div className="z-[10] px-3 lg:px-0  bg-white">
        <MenuBar />
      </div> */}
      <div className="wrapper">


        {/* menu - slider */}
        <div className="grid grid-cols-5">
          <div className="hidden lg:inline-block">
            <div className="flex relative h-full " onMouseLeave={handleMouseLeave}>
              <div className="w-64 h-full bg-white p-5 ">
                <div className="text-[#1a428a] font-medium leading-6 ">NGÀNH HÀNG NỔI BẬT</div>
                {categories.map((category, index) => (
                  <div
                    className="flex justify-between items-center rounded-sm px-1 py-2 hover:bg-gray-100 truncate border-b-[1px] text-sm leading-5  text-[#1a428a] hover:text-[#ff6a00]"
                    key={index}
                    onMouseEnter={() => handleHover(category.subCategories)}
                  >
                    <div>{category.title}</div>
                    <div>
                      <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="10px" height="10px" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
                    </div>
                  </div>
                ))}
              </div>
              {hovered && (
                <div className="absolute p-4 border border-gray-200 rounded shadow-lg w-max left-full z-20 bg-white h-full  ">
                  {currentSubCategories.length > 0 ? (
                    <ul>
                      {currentSubCategories.map((subCategory, index) => (
                        <li key={index} className="py-1 rounded-sm  px-3 hover:bg-gray-100">
                          {subCategory}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>Không có danh mục con</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={`flex flex-col col-span-full lg:col-span-4`}>
            <div className="max-h-[400px] items-center  justify-between w-auto">
              <Slider {...settings}>
                {dataBanners.map((banner, id) => (
                  <Card
                    key={id}
                    banner={banner}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </div>



        <div>
          {/* Deal hot */}
          <div className="mt-[10px]">
            <div className="w-full h-[38px] home-sections rounded-t-[3px]  py-[10px] px-[15px]
          flex flex-row justify-between items-center 
          ">
              <div className="font-bold text-[16px] hover:text-[#ff8300]">Deal hot</div>
              <div className="text-[14px] hover:text-[#ff8300]">Xem thêm</div>
            </div>

            <div className="w-full h-auto py-[5px] ">
              <Slider {...settingProduct}>
                {products.map((product, index) => (
                  <CardProduct key={index} product={product} />
                ))}
              </Slider>
            </div>
          </div>
          {/* Nông sản mùa vụ giá tốt */}
          <div className="">
            <div className="w-full h-[38px] home-sections rounded-t-[3px]  py-[10px] px-[15px]
          flex flex-row justify-between items-center
          ">
              <div className="font-bold text-[16px] hover:text-[#ff8300]">Nông sản mùa vụ giá tốt</div>
              <div className="text-[14px] hover:text-[#ff8300]">Xem thêm</div>
            </div>

            <div className="w-full h-auto py-[5px] ">
              <Slider {...settingProduct}>
                {products.map((product, index) => (
                  <CardProduct key={index} product={product} />
                ))}
              </Slider>
            </div>
          </div>

          {/* Gợi ý hôm nay */}
          <div className=" flex flex-col justify-center items-center ">
            <Divider orientation="left">
              <div className="w-full rounded-t-[3px] mb-2 flex flex-row justify-start items-center">
                <div className="font-medium uppercase text-[20px] mr-2 text-[#2f4b8a] leading-10 hover:text-[#ff8300]">Gợi ý hôm nay </div>
                <GoArrowRight className="text-[24px]" />
              </div>
            </Divider>

            <div className="w-full  h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {currentItems.map((product) => (
                <CardProduct2 key={product.id} product={product} />
              ))}

            </div>
            <div className="flex justify-end w-full">
              <Pagination
                current={currentPage}
                total={productsdata.length}
                pageSize={itemsPerPage}
                onChange={(page) => setCurrentPage(page)}
                className=""
              />

            </div>

          </div>
          {/* Thiết bị văn phòng */}
          <div className=" flex flex-col justify-center items-center ">
            <Divider orientation="left">
              <div className="w-full rounded-t-[3px]  mb-2 
          flex flex-row justify-start items-center
          ">
                <div className="font-medium uppercase text-[20px] mr-2 text-[#2f4b8a] leading-10 hover:text-[#ff8300]">Thiết bị văn phòng </div>
                <GoArrowRight className="text-[24px]" />
              </div>
            </Divider>

            <div className="w-full  h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {currentItems.map((product) => (
                <CardProduct2 key={product.id} product={product} />
              ))}

            </div>
            <div className="flex justify-end w-full">
              <Pagination
                current={currentPage}
                total={productsdata.length}
                pageSize={itemsPerPage}
                onChange={(page) => setCurrentPage(page)}
                className=""
              />

            </div>

          </div>

          {/* Gian hàng nổi bật */}
          <div className="mt-[10px] flex flex-col justify-center items-center ">
            <Divider orientation="left">
              <div className="w-full rounded-t-[3px]  mb-2 
          flex flex-row justify-start items-center
          ">
                <div className="font-medium uppercase text-[20px] mr-2 text-[#2f4b8a] leading-10 hover:text-[#ff8300]">Gian hàng nổi bật</div>
                <GoArrowRight className="text-[24px]" />
              </div>
            </Divider>
            <div className="w-full  h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {brands.map((product) => (
                <CardBrand key={product.id} brand={product} />
              ))}

            </div>
          </div>

          {/* Tin tức*/}
          <div className="mt-[10px]">
            <div className="w-full h-[38px] home-sections rounded-t-[3px]  py-[10px] px-[15px]
          flex flex-row justify-between items-center
          ">
              <div className="font-bold text-[16px]">Tin tức</div>
            </div>

            <div className="w-full h-auto py-[10px] ">
              <Slider {...settingNews} className="news-slider">
                {newsdata.map(news => (
                  <div onMouseDown={handleMouseDown} onMouseUp={(e) => handleMouseUp(e, news)} key={news.id}>
                    <CardNews news={news} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>



          {/* video */}
          {/* <div className="w-full flex justify-center items-center">
            <div className="flex justify-center items-center bg-black w-[900px] h-[526px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="rounded-md"
                width="860"
                height="500"
                src="https://www.youtube.com/embed/uELju5DBhB0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Home;
