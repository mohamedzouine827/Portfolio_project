"use client";
import React, { useState, useEffect } from "react";
import { Playfair_Display, Pixelify_Sans } from "next/font/google";
import { motion, useViewportScroll } from "framer-motion";
import SelfSection from "./SelfSection";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["900"],
    style: ["italic"],
});
const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: ["400"] });

const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Hero() {
    const { scrollY } = useViewportScroll();
    const [scrollPos, setScrollPos] = useState(0);
    const [isCentered, setIsCentered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollValue = scrollY.get();
            setScrollPos(scrollValue);

            // Check if the rectangle should stop scrolling and center
            if (scrollValue >= 447) {
                setIsCentered(true);
            } else {
                setIsCentered(false);
            }
        };

        const unsubscribe = scrollY.onChange(handleScroll);
        return () => unsubscribe();
    }, [scrollY]);

    const title = "WELCOME TO THE ZOUINE";
    const subtitle = "WHERE ART AND ALGORITHM UNITED";
    const svgText = "HELLLOOO";

    return (
        <section className="w-full py-[96px] px-[60px] flex flex-col gap-[64px]">
            <div className="flex flex-col justify-start items-start gap-8">
                <h1 className="w-full text-center text-black text-[64px] font-bold leading-[72px]">
                    {title.split(" ").map((word, index) => (
                        <React.Fragment key={index}>
                            <motion.span
                                className="inline-block"
                                variants={wordAnimation}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                                {word}
                            </motion.span>
                            {index < title.split(" ").length - 1 && " "}
                        </React.Fragment>
                    ))}
                </h1>
                <p className="w-full text-center text-black text-2xl font-medium uppercase leading-loose">
                    {subtitle.split(" ").map((word, index) => (
                        <React.Fragment key={index}>
                            <motion.span
                                className={`inline-block ${word === "ART"
                                        ? playfair.className
                                        : word === "ALGORITHM"
                                            ? pixelify.className
                                            : ""
                                    }`}
                                variants={wordAnimation}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2 + title.split(" ").length * 0.1,
                                }}
                            >
                                {word === "ART" ? (
                                    <span className="font-black italic">Art</span>
                                ) : word === "ALGORITHM" ? (
                                    <span>Algorithm</span>
                                ) : (
                                    word
                                )}
                            </motion.span>
                            {index < subtitle.split(" ").length - 1 && " "}
                        </React.Fragment>
                    ))}
                </p>
            </div>
            <div className="px-11 py-[15px] justify-center items-center flex">
                <svg width="1200" height="320" viewBox="0 0 1200 320">
                    <defs>
                        <style>
                            {`
                @font-face {
                  font-family: 'Playfair Display';
                  src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap');
                }
              `}
                        </style>
                    </defs>
                    {svgText.split("").map((char, index) => (
                        <motion.text
                            key={index}
                            x={`${(index + 0.5) * (1200 / svgText.length)}px`}
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontSize="232px"
                            fontFamily="Playfair Display, serif"
                            fontStyle="italic"
                            fill="none"
                            stroke="black"
                            strokeWidth="1.8"
                            variants={wordAnimation}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                duration: 0.8,
                                delay:
                                    index * 0.1 +
                                    (title.split(" ").length + subtitle.split(" ").length) * 0.1,
                            }}
                        >
                            {char}
                        </motion.text>
                    ))}
                </svg>
            </div>

            {/* Rectangle element */}
            <motion.div
                className="bg-black mx-auto"
                initial={{ opacity: 0, width: 20, height: 350 }} // Initially hidden and small size
                animate={{ opacity: 1, width: 350, height: 350 }} // Animates to visible with full size
                style={{
                    translateY: isCentered ? 447 : scrollPos * 0.5, // Moves down with scroll until centered
                    marginTop: "-420px",
                }}
                transition={{
                    opacity: { delay: 0.4, duration: 0.8 }, // Delay the appearance for 0.4s, then animate opacity
                    width: { delay: 0.4, duration: 0.8 }, // Animate width after the delay
                    height: { delay: 0.4, duration: 0.8 }, // Animate height after the delay
                    type: "spring",
                    stiffness: 100
                }}
            />

            <SelfSection />
        </section>
    );
}
