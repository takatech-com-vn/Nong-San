
const colLeft = () => {
    return (
        <div className='flex flex-row items-start w-[300px]'>
            <a className='text-green-600 flex flex-col justify-center items-center '>
                <img src="https://chonongsandaklak.vn/upload/2006294/20231017/images__2__1_d71cb.png" alt="chonongsandaklak" className='h-[54px] w-[54px]' />
                <p className='uppercase font-bold text-[10px] md:text-[14px] text-center'> Nông sản bán sỉ </p>
            </a>
            <a href="" className='uppercase flex flex-col justify-center items-center'>
                <p className='text-[12px] md:text-[18px] text-green-600 text-center'>Chợ Nông Sản</p>
                <p className='text-[16px] md:text-[20px] text-green-700 font-bold text-center'>Đắk Lắk Online</p>
            </a>
        </div>
    );
};

export default colLeft;