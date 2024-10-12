import React from 'react';
import { Inter, Heebo } from 'next/font/google';

import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

const inter = Inter({
    subsets: ['latin'],
});

const heebo = Heebo({
    subsets: ['latin']
});



export default function Navbar() {
    return (
        <section className='px-[60px] py-[16px] flex flex-row justify-between items-center'>
            <div className='w-[143px]'>
                <span className={`${heebo.className} font-bold text-[24px] leading-8`}>
                    ZOUINE
                </span>
            </div>
            <ul className={`${inter.className} flex flex-row gap-8`}>
                {['WORK', 'ABOUT', 'SOCIALS'].map((item) => (
                    <motion.li
                        key={item}
                        whileHover={{ scale: 1.1, y: -5, color: '#6A6969' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className='font-semibold text-base cursor-pointer transition-colors duration-150 ease-in-out'
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
            <AnimatedButton />
        </section>
    );
}