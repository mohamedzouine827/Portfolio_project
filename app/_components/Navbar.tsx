"use client";
import React from 'react';
import { Inter, Heebo } from 'next/font/google';
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

const inter = Inter({
    subsets: ['latin'],
});

const heebo = Heebo({
    subsets: ['latin'],
});

// Define the animation for the entire section (Navbar)
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // Stagger between the logo, list, and button
        },
    },
};

// Define the animation for the logo (ZOUINE)
const logoVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.42, 0, 0.58, 1],
        },
    },
};

// Define the animation for the list container (ul) and list items (li)
const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Faster stagger between each list item for smoother flow
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start slightly off-screen
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 25,
            duration: 0.8, // Smooth movement for list items
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Define the animation for each character within the list items
const charVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.42, 0, 0.58, 1],
        },
    },
};

// Define the animation for the AnimatedButton
const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,

        transition: {
            duration: 0.7,
            ease: [0.42, 0, 0.58, 1],
        },
    },
};

export default function Navbar() {
    return (
        <motion.section
            className='px-[60px] py-[16px] flex flex-row justify-between items-center'
            initial="hidden"
            animate="visible"
            variants={sectionVariants} // Apply staggered animations to all children
        >
            {/* Animate the logo (ZOUINE) */}
            <motion.div className='w-[143px]' variants={logoVariants}>
                <span className={`${heebo.className} font-bold text-[24px] leading-8`}>
                    ZOUINE
                </span>
            </motion.div>

            {/* Animate the entire list */}
            <motion.ul
                className={`${inter.className} flex flex-row gap-8`}
                variants={listVariants} // Apply stagger to the list items
            >
                {['WORK', 'ABOUT', 'SOCIALS'].map((item) => (
                    <motion.li
                        key={item}
                        className='font-semibold text-base hover:text-[#452a2d] cursor-pointer transition-colors duration-150 ease-in-out'
                        variants={itemVariants} // Animate each item
                    >
                        {item.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                variants={charVariants} // Animate each character
                                style={{ display: 'inline-block' }} // Ensure animation applies to each character
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.li>
                ))}
            </motion.ul>

            {/* Animate the button */}
            <motion.div variants={buttonVariants}>
                <AnimatedButton />
            </motion.div>
        </motion.section>
    );
}
