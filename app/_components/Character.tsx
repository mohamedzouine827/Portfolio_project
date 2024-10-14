"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ExploreDev from './ExploreDev';

const headingText = "CHOOSE YOUR CHARACTER FOR YOUR JOURNEY";

const Character: React.FC = () => {
  const words = headingText.split(' '); // Split the heading into words
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Delay between each word appearing
        duration: 0.5, // Duration of the overall animation
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },

    visible: {
      opacity: 1,
      y: 0, // Animate to visible and in place
      transition: {
        type: "spring", // Smooth spring-like transition
        stiffness: 120, // Stiffness for spring animation
        damping: 12, // Damping to make the spring slower
        duration: 0.4,
      },
    },
  };

  const sectionRef = useRef<HTMLDivElement | null>(null); // Reference to the section

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visible when the section is in view
        } else {
          setIsVisible(false); // Reset when out of view
        }
      });
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Observe the section
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Cleanup observer on unmount
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-[112px] px-[60px] bg-[#0016A7] flex flex-col gap-[48px]">
      <motion.h1
        className="text-white text-[48px] leading-[64px] font-bold max-w-[702px]"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"} // Animate based on visibility
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2" // Margin between words
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <div className="flex flex-row justify-between items-center">
        <ExploreDev />
        <p className="flex flex-row gap-4 items-center text-white text-2xl">
          <span className="text-[48px] leading-[64px] font-bold">OR</span>
          <span className="rotate-180 text-[48px] leading-[64px] font-bold">OR</span>
        </p>
        <div className="w-[450px] h-[450px] bg-black"></div>
      </div>
    </section>
  );
};

export default Character;
