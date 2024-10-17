"use client"
import { Playfair_Display } from 'next/font/google';
import React from 'react';
import ScrolledArt from './ScrolledArt';
import { motion } from "framer-motion";

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['900'],
    style: ['italic'],
});

export default function SelectAnArt(): JSX.Element {
    return (
        <motion.div
            className='px-[60px] py-[64px] flex flex-col justify-center items-center gap-12 overflow-hidden'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}  // Smooth entry animation for the container
        >
            <motion.h1
                className={`${playfair.className} text-[48px] font-bold text-center`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                WHERE ART CONNECTS WITH YOUR PROJECT
            </motion.h1>
            <ScrolledArt />
        </motion.div>
    );
}
