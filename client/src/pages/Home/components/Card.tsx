// import { MdNavigateNext } from "react-icons/md";
import { Banner } from "../../../services/Banner";

type CardBannerProps = {
  banner: Banner;
};

const Card: React.FC<CardBannerProps> = ({ banner }) => {
  return (
    <div className="w-full flex justify-center ">
      <div className=" w-full  ">
        <div className="relative">
          <img
            className="w-full object-cover h-[200px] lg:h-[400px]"
            src={banner?.path}
            alt="Background"
          />
{/* 
          <button className="absolute bottom-0 left-0 transform translate-x-2 mb-[20px] md:mb-[50px] ml-[20px] md:ml-[50px] bg-[#0055aa] 
             text-[#ffff] px-4 py-3 focus:outline-none rounded-r-[25px] rounded-t-[25px] text-[16px] md:text-[18px]
              hover:text-[#ff8300] hover:bg-white hover:border border-solid border-[#0055aa] flex flex-row items-center">
            Hội chợ trực tuyến <MdNavigateNext />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Card;