import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';

// Import the font with specific styles
const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['900'],
    style: ['italic'],
});

const ExploreDes: React.FC = () => {
    const controls = useAnimation();
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const textRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(textRef, { once: true });

    useEffect(() => {
        if (isInView) {
            setIsVisible(true);
        }
    }, [isInView]);

    const handleHoverStart = () => {
        controls.start({
            scale: 1.5,
            opacity: 0,
            filter: 'blur(10px)', // Add blur effect on hover
            transition: { duration: 1 },
        });
        setIsHovered(true);
    };

    const handleHoverEnd = () => {
        controls.start({
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)', // Remove blur effect on mouse leave
            transition: { duration: 0.5 },
        });
        setIsHovered(false);
    };

    return (
        <div className="relative w-[450px] h-[450px] overflow-hidden bg-black cursor-pointer">
            <motion.div
                className="absolute inset-0 bg-black"
                initial={{ scale: 1, opacity: 1 }}
                animate={controls}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                style={{
                    clipPath: 'circle(100% at 50% 50%)', // Keeps it circular
                    boxShadow: '0 0 30px rgba(255, 0, 0, 0.8)', // Glowing effect
                }}
            />
            <motion.div
                className={`absolute inset-0 flex items-center justify-center font-bold transition-colors duration-500 ${isHovered ? 'bg-white text-black' : 'bg-black text-white'}`}
                initial={{ opacity: 0, scale: 1 }} // Initially visible
                animate={{
                    opacity: isHovered ? 1 : 0, // Hide when hovering
                    transition: { duration: 0.5 },
                }}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                ref={textRef}
            >
                <motion.span
                    className={`text-center font-bold text-2xl ${isVisible ? 'transition-height duration-1200 ease-in-out' : 'h-0 overflow-hidden'}`}
                    initial={{ height: '0px', opacity: 0 }} // Initially hidden
                    animate={{
                        height: isVisible ? '24px' : '0px',
                        opacity: isVisible ? 1 : 0,
                        transition: { duration: 1.2 },
                    }}
                >
                    <span className={`${playfair.className}`}>ART</span> {/* Apply Playfair Display font */}
                </motion.span>
            </motion.div>
        </div>
    );
};

export default ExploreDes;
