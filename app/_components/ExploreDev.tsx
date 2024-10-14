"use client";
import React, { useEffect, useRef, useState } from "react";

const MatrixRain: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationId, setAnimationId] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 450;
    canvas.height = 450;

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+[]{}|;:,.<>?";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);

    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const green = Math.floor(Math.random() * 156 + 100); // Range: 100-255
        ctx.fillStyle = `rgba(0, ${green}, 0, 0.8)`;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    if (isVisible) {
      // Start the matrix effect when visible
      const intervalId = setInterval(draw, 50);
      setAnimationId(intervalId as unknown as number);
    }

    return () => {
      if (animationId) clearInterval(animationId);
    };
  }, [isVisible]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

const ExploreDev: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [matrixOpacity, setMatrixOpacity] = useState(1);
  const [textOpacity, setTextOpacity] = useState(0);

  useEffect(() => {
    let animationId: number;
    const animateTransition = () => {
      setMatrixOpacity((prev) => {
        const target = isHovered ? 0 : 1; // Fade out matrix when hovering, fade in when not
        const diff = target - prev;
        return prev + Math.sign(diff) * Math.min(Math.abs(diff), 0.05); // Smooth transition
      });

      setTextOpacity((prev) => {
        const target = isHovered ? 1 : 0; // Fade in text when hovering, fade out when not
        const diff = target - prev;
        return prev + Math.sign(diff) * Math.min(Math.abs(diff), 0.05); // Smooth transition
      });

      animationId = requestAnimationFrame(animateTransition);
    };
    animationId = requestAnimationFrame(animateTransition);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div
      className="w-[450px] h-[450px] bg-black relative justify-center flex items-center cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{ opacity: matrixOpacity, transition: "opacity 0.5s ease" }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <MatrixRain isVisible={!isHovered} />
      </div>
      <h1
        className="text-center font-bold text-2xl text-white relative z-10"
        style={{ opacity: textOpacity, transition: "opacity 0.5s ease" }}
      >
        DEVELOPER
      </h1>
    </div>
  );
};

export default ExploreDev;
