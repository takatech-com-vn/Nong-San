import { useEffect, useState } from "react";
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../../redux/productSlice';
import { RootState } from '../../redux/store';
import Slider from "react-slick";
import Card from "./components/Card";
import { NextArrow, PrevArrow } from "../../components/slick/index";
import Menu from "./components/Menu";
import CardProduct from "./components/CardProduct";
import { GoArrowRight } from "react-icons/go";
import CardProduct2 from "./components/CardProduct2";
import CardBrand from "./components/CardBrand";
import CardNews from "./components/CardNews";


const Home: React.FC = () => {

  const dispatch = useDispatch();
  const productsdata = useSelector((state: RootState) => state.product.products);
  console.log(productsdata)
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
        console.log(response.data.products);
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
        const response = await axios.get('http://localhost:3000/slide/getlistslidepc');
        setDataBanners(response.data.banner_pcs);
        console.log(response.data.banner_pcs);
      } catch (error) {
        console.error('Lỗi data slide', error)
      }
    };
    fetchData();
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const checkScroll = () => {
    if (window.pageYOffset > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);
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
    dots: true,
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

  // const data = [
  //   {
  //     imageUrl:
  //       "https://chonongsandaklak.vn/upload/2006294/20231017/banner1_new-1920x769_1_45209.png",
  //     buttonText: "Hội chợ trực tuyến",
  //   },
  //   {
  //     imageUrl:
  //       "https://chonongsandaklak.vn/upload/2006294/20231116/370296858_6392210657551570_989834110336836902_n_8b8b5.png",
  //     buttonText: "Hội chợ trực tuyến",
  //   },
  // ];

  const products = [
    {
      name: 'Bột Cacao',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xdefault/upload/2006294/20240116/id-1-coc-ca-cao-nong-tang-cuong-10-luong-mau-len-nao-01_4bb6c.jpg',
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
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/400x400xfull/upload/2006294/20231114/Hinh_anh_che_Ngoc_Thuy__01__a93d3.jpg',

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

  //fake data news
  const news = [
    {
      id: 1,
      name: 'Sản xuất và tiêu thụ nông sản Đắk Lắk',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/480x270xdefault/upload/2006294/fck/admindlk/image(4).png',

    },
    {
      id: 2,
      name: 'Ngũ cốc hạt phổ biến',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/480x270xdefault/upload/2006294/20230815/grab4a40dT_E1_BB_8Fng_quan_v_E1_BB_81__C4_91_E1_BA_ADu_n_C3_A0nh.jpg',

    },
    {
      id: 3,
      name: 'Xuất khẩu nông sản đạt gần 28 tỉ USD trong 6 tháng, Mỹ là thị trường lớn nhất',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/480x270xdefault/upload/2006294/20221123/vai-thieu-bac-giang-2021-1-16257994449132063979936_9461b.jpg',

    },
    {
      id: 4,
      name: 'Đắk Lắk: Tiềm năng nông sản',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/480x270xdefault/upload/2006294/20231031/cay-giong-bo-304-nen-31_4ca63.jpg',

    },
    {
      id: 5,
      name: 'Thúc đẩy nền nông nghiệp minh bạch, trách nhiệm',
      image: 'https://chonongsandaklak.vn/publish/thumbnail/2006294/480x270xdefault/upload/2006294/20221123/logo-nong-san-sach7a-2read-only-1664163272627257957423_669e3.jpeg',

    },
  ]

  // Tính toán sản phẩm hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsdata.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={`wrapper h-auto  ${isScrolled ? "pt-[280px] md:pt-[260px]" : "pt-3 md:pt-0"}`} >
      {/* menu - slider */}
      <div className="flex flex-col">
        <div className="z-10">
          <Menu />
        </div>
        <div className="max-h-[380px] items-center  justify-between">
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


      <div>
        {/* Deal hot */}
        <div className="mt-[40px]">
          <div className="w-full h-[38px] bg-[#008000] rounded-t-[3px]  py-[10px] px-[15px]
          flex flex-row justify-between items-center
          text-[#fff200]">
            <div className="font-bold text-[16px]">Deal hot</div>
            <div className="text-[14px]">Xem tất cả</div>
          </div>

          <div className="w-full h-auto p-[15px] ">
            <Slider {...settingProduct}>
              {products.map((product, index) => (
                <CardProduct key={index} product={product} />
              ))}
            </Slider>
          </div>
        </div>
        {/* Nông sản mùa vụ giá tốt */}
        <div className="mt-[40px]">
          <div className="w-full h-[38px] bg-[#008000] rounded-t-[3px]  py-[10px] px-[15px]
          flex flex-row justify-between items-center
          text-[#fff200]">
            <div className="font-bold text-[16px]">Nông sản mùa vụ giá tốt</div>
            <div className="text-[14px]">Xem tất cả</div>
          </div>

          <div className="w-full h-auto p-[15px] ">
            <Slider {...settingProduct}>
              {products.map((product, index) => (
                <CardProduct key={index} product={product} />
              ))}
            </Slider>
          </div>
        </div>

        {/* Gợi ý hôm nay */}
        <div className="mt-[40px] flex flex-col justify-center items-center ">
          <div className="w-full h-[50px] bg-white rounded-t-[3px]  py-[10px]  
          flex flex-row justify-start items-center
          text-[#008000]">
            <div className="font-bold text-[24px] mr-2">Gợi ý hôm nay </div>
            <GoArrowRight className="text-[24px]" />
          </div>
          <div className="border-4 mb-[20px] w-full border-gray-100"></div>
          <div className="w-full  h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {currentItems.map((product) => (
              <CardProduct2 key={product.id} product={product} />
            ))}

          </div>
          <Pagination
            current={currentPage}
            total={productsdata.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            className="mt-3"
          />

        </div>

        {/* Gian hàng nổi bật */}
        <div className="mt-[40px] flex flex-col justify-center items-center ">
          <div className="w-full h-[50px] bg-white rounded-t-[3px]  py-[10px]  
          flex flex-row justify-start items-center
          text-[#2e2e2e]">
            <div className="font-bold text-[24px] mr-2">Gian hàng nổi bật </div>
          </div>
          <div className="w-full  h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {brands.map((product) => (
              <CardBrand key={product.id} brand={product} />
            ))}

          </div>
        </div>

        {/* Tin tức*/}
        <div className="mt-[40px]">
          <div className="w-full h-[38px] bg-[#008000] rounded-t-[3px]  py-[10px] px-[15px]
          flex flex-row justify-between items-center
          text-[#fff200]">
            <div className="font-bold text-[16px]">Tin tức</div>
          </div>

          <div className="w-full h-auto py-[15px] ">
            <Slider {...settingNews} className="news-slider">
              {news.map((product) => (
                <CardNews key={product.id} news={product} />
              ))}
            </Slider>
          </div>
        </div>

        {/* video */}
        <div className="w-full flex justify-center items-center">
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
        </div>

      </div>
    </div>
  );
};

export default Home;
