import { useEffect, useState } from 'react';
import { AiOutlineVerticalAlignTop } from 'react-icons/ai';

// Custom Back-to-Top Button Component
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="back-to-top">
            {isVisible && (
                <div onClick={scrollToTop} className='fixed bottom-[15px] left-[15px] bg-white rounded-full p-3 drop-shadow-md'>
                    <AiOutlineVerticalAlignTop size={20} />
                </div>
            )}
        </div>
    );
};

export default BackToTopButton;