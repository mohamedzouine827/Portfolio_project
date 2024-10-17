"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Rectangle from "./Rectangle";  // Ensure this file is in the same directory

export default function ScrolledArt(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const rectangles = [
    { color: '#D9D9D9' },
    { color: '#D9D9D9' },
    { color: '#D9D9D9' },
    { color: '#D9D9D9' },
    { color: '#D9D9D9' },
  ];
  const allRectangles = Array(3).fill(rectangles).flat();

  const gap = 32; // Gap between rectangles
  const baseWidth = 250; // Base width of rectangles
  const expandedWidth = 450; // Expanded width on hover
  const totalWidth = allRectangles.length * (baseWidth + gap) - gap;

  useEffect(() => {
    const updateContainerWidth = () => {
      if (scrollRef.current) {
        setContainerWidth(scrollRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);

    const handleWheelScroll = (e: WheelEvent) => {
      if (scrollRef.current) {
        e.preventDefault();
        const newX = x.get() - e.deltaY;
        x.set(Math.max(Math.min(newX, 0), -totalWidth + containerWidth));
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("wheel", handleWheelScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("wheel", handleWheelScroll);
      }
    };
  }, [x, totalWidth, containerWidth]);

  return (
    <div ref={scrollRef} className="w-full overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: -(totalWidth - containerWidth), right: 0 }}
        style={{ x, width: totalWidth }}
        className="flex items-center h-[450px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delayChildren: 0.5, staggerChildren: 0.2 }}  // Staggered animation on load
      >
        {allRectangles.map((rect, index) => (
          <motion.div
            key={index}
            style={{ marginRight: index < allRectangles.length - 1 ? `${gap}px` : '0' }}
            initial={{ opacity: 0, scale: 0.8 }}  // Initial state for rectangles
            animate={{ opacity: 1, scale: 1 }}  // Animation to full visibility and size
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Rectangle color={rect.color} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
