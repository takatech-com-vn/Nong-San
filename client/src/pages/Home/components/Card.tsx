import { MdNavigateNext } from "react-icons/md";

interface CardProps {
    imageUrl: string;
    buttonText: string;
  }
  
  const Card: React.FC<CardProps> = ({ imageUrl, buttonText }) => {
    return (
      <div className="w-full flex justify-center ">
        <div className=" w-full  ">
          <div className="relative">
            <img
              className="w-full object-fill h-[200px] md:h-[380px]"
              src={imageUrl}
              alt="Background"
            />
            <button className="absolute bottom-0 left-0 transform translate-x-2 mb-[20px] md:mb-[50px] ml-[20px] md:ml-[50px] bg-[#008000] 
             text-[#fff200] px-4 py-3 focus:outline-none rounded-r-[25px] rounded-t-[25px] text-[16px] md:text-[18px]
              hover:text-[#008000] hover:bg-white hover:border border-solid border-[#008000] flex flex-row items-center">
              {buttonText} <MdNavigateNext />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
  