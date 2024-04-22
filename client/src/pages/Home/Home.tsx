import { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../../redux/productSlice';
import { RootState } from '../../redux/store';
import Slider from "react-slick";
import Card from "./Card";
import { NextArrow, PrevArrow } from "../../components/slick/index";
import Menu from "./Menu";
import CardProduct from "./CardProduct";
import { GoArrowRight } from "react-icons/go";
import CardProduct2 from "./CardProduct2";


const Home: React.FC = () => {

const dispatch = useDispatch();
const productsdata = useSelector((state: RootState) => state.product.products);
console.log(productsdata)
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
  const data = [
    {
      imageUrl:
        "https://chonongsandaklak.vn/upload/2006294/20231017/banner1_new-1920x769_1_45209.png",
      buttonText: "Hội chợ trực tuyến",
    },
    {
      imageUrl:
        "https://chonongsandaklak.vn/upload/2006294/20231116/370296858_6392210657551570_989834110336836902_n_8b8b5.png",
      buttonText: "Hội chợ trực tuyến",
    },
  ];

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
  return (
    <div className={`wrapper h-[1000px]  ${isScrolled ? "pt-[280px] md:pt-[260px]" : "pt-3 md:pt-0"}`} >
      {/* menu - slider */}
      <div className="flex flex-col">
        <div className="z-10">
          <Menu />
        </div>
        <div className="max-h-[380px] items-center  justify-between">
          <Slider {...settings}>
            {data.map((item, index) => (
              <Card
                key={index}
                imageUrl={item.imageUrl}
                buttonText={item.buttonText}
              ></Card>
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
        <div className="mt-[40px]">
          <div className="w-full h-[50px] bg-white rounded-t-[3px]  py-[10px]  
          flex flex-row justify-start items-center
          text-[#008000]">
            <div className="font-bold text-[24px] mr-2">Gợi ý hôm nay </div>
            <GoArrowRight className="text-[24px]" />
          </div>
          <div className="border-4 mb-[20px]"></div>
          <div className="w-full  h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {productsdata.map((product ) => (
              <CardProduct2 key={product.id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
