import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };

    return (
        <div className='w-auto'>
            <Slider {...settings}>
                <div>
                    <img src='https://chonongsandaklak.vn/upload/2006294/20231108/Untitled-3-01_6_a9928.png' alt="Image 1" />
                </div>
                <div>
                    <img src='https://chonongsandaklak.vn/upload/2006294/20231108/Untitled-3-01_6_a9928.png' alt="Image 2" />
                </div>
               
            </Slider>
        </div>
    );
};

export default ImageSlider;
