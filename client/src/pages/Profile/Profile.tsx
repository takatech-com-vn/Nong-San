import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import avataProfile from '../../assets/avataProfile.svg'
const Profile = () => {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <>
            <div className='wrapper mt-1'>
                <div className='flex flex-col relative'>
                    <div className='h-auto w-full bg-blue-300'>
                        <img className='w-full object-cover h-[240px] ' src="https://www.takatech.com.vn/img/background-img/about-page-title-bg.jpg" alt="" />
                    </div>
                    <div className='flex h-[50px] w-full bg-white items-center'>
                        <div className='rounded-full bg-red-200 w-[100px] h-[100px] absolute left-8 bottom-0'>
                            <img className='w-full h-full object-cover rounded-full' src={avataProfile} alt="" />
                        </div>
                        <h1 className='ml-[150px] font-medium'>{user?.username}</h1>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Profile;