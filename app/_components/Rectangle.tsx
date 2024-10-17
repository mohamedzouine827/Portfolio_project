import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface RectangleProps {
  color: string;
  index: number;
}

const magnetDistance = 150;  // Distance within which magnet effect applies
const magnetStrength = 0.15; // Strength of the magnet pull

const Rectangle: React.FC<RectangleProps> = ({ color, index }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const rectRef = useRef<HTMLDivElement | null>(null);

  const distanceToCursor = (x: number, y: number) => {
    if (!rectRef.current) return 0;
    const rect = rectRef.current.getBoundingClientRect();
    const rectCenterX = rect.left + rect.width / 2;
    const rectCenterY = rect.top + rect.height / 2;
    return Math.hypot(x - rectCenterX, y - rectCenterY);
  };

  const springX = useSpring(0, { stiffness: 500, damping: 40 });
  const springY = useSpring(0, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);

      const distance = distanceToCursor(e.clientX, e.clientY);
      if (distance < magnetDistance) {
        const pullFactor = (magnetDistance - distance) / magnetDistance * magnetStrength;
        const rect = rectRef.current?.getBoundingClientRect();
        if (rect) {
          springX.set((e.clientX - (rect.left + rect.width / 2)) * pullFactor);
          springY.set((e.clientY - (rect.top + rect.height / 2)) * pullFactor);
        }
      } else {
        springX.set(0);
        springY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [springX, springY]);

  return (
    <motion.div
      ref={rectRef}
      style={{
        x: springX,
        y: springY,
        backgroundColor: color,
        width: 350,
        height: 350,
        rotate: springX, // Subtle rotation based on cursor movement
      }}
      className="rounded-md cursor-pointer"
      whileHover={{ scale: 1.1, rotate: 5 }}  // Hover effect for scale and slight rotation
      transition={{ type: "spring", stiffness: 200, damping: 20 }}  // Smooth transition
    >
    </motion.div>
  );
};

export default Rectangle;
