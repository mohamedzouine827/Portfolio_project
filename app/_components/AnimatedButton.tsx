"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Arrow from "@/public/arrowup.svg";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

const AnimatedButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`${inter.className} w-[143px] h-[40px] flex justify-center items-center bg-black text-white font-semibold  text-base overflow-hidden relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative  w-full h-full flex justify-center items-center">
        <div
          className={`flex ml-5 items-center transition-transform duration-300 ease-in-out ${
            isHovered ? 'transform -translate-x-3' : ''
          }`}
        >
          <span>CONTACT</span>
          <div
            className={` transition-all duration-300 ease-in-out ${
              isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'
            }`}
          >
            <Image src={Arrow} alt="arrow up" width={24} height={24} />
          </div>
        </div>
      </div>
      <style jsx>{`
        button {
          transition: all 0.3s ease-in-out;
        }
        button:hover {
          background-color: #333;
        }
      `}</style>
    </button>
  );
};

export default AnimatedButton;