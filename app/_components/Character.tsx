"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ExploreDev from './ExploreDev';
import ExploreDes from './ExploreDes';

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
  const isInView = useInView(sectionRef, { once: true }); // Use InView to track visibility

  useEffect(() => {
    setIsVisible(isInView); // Set visibility based on whether the section is in view
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-[112px] px-[60px] bg-[#0016A7] flex flex-col gap-[48px] h-[850px]">
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
        <motion.div
          initial={{ height: '24px', overflow: 'hidden' }}
          animate={isVisible ? { height: '450px', transition: { duration: 1.2 } } : { height: '24px', transition: { duration: 1.2 } }}
          className="flex-shrink-0"
        >
          <ExploreDev />
        </motion.div>
        
        <p className="flex flex-row gap-4 items-center text-white text-2xl">
          <span className="text-[48px] leading-[64px] font-bold">OR</span>
          <span className="rotate-180 text-[48px] leading-[64px] font-bold">OR</span>
        </p>
        
        <motion.div
          initial={{ height: '24px', overflow: 'hidden' }}
          animate={isVisible ? { height: '450px', transition: { duration: 1.2 } } : { height: '24px', transition: { duration: 1.2 } }}
          className="flex-shrink-0"
        >
          <ExploreDes />
        </motion.div>
      </div>
    </section>
  );
};

export default Character;
