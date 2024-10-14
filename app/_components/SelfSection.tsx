"use client";
import React from 'react';
import { motion, useInView, Variants } from "framer-motion";

const wordAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

interface TextBlockProps {
    text: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ text }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <div ref={ref} className="w-[370px] text-center text-black text-base font-medium uppercase leading-loose">
            {text.split(" ").map((word, index) => (
                <React.Fragment key={index}>
                    <motion.span
                        className="inline-block"
                        variants={wordAnimation}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        {word}
                    </motion.span>
                    {index < text.split(" ").length - 1 && " "}
                </React.Fragment>
            ))}
        </div>
    );
};

const SelfSection: React.FC = () => {
    const title = "I'm Mohamed Zouine, a 21-year-old creative and driven individual based in Morocco. I have a passion for exploring new ideas and solving complex problems through thoughtful design and technology. My journey has been all about learning, creating, and helping others bring their ideas to life, whether it's through digital products, clean user experiences, or innovative solutions. My work is fueled by curiosity and a love for simplicity, making each project a chance to grow.";
    const title2 = "As a software engineer and UX designer, I balance creativity and functionality. I focus on building intuitive, user-friendly interfaces that feel natural and seamless for everyone. My design approach is rooted in understanding how people interact with products, while my development skills ensure that everything runs smoothly behind the scenes. From the first sketch to the final product, I aim to create experiences that are not just visually appealing, but also practical and effective.";

    return (
        <div className='px-[60px]'>
            <div className="w-full justify-between items-center flex">
                <TextBlock text={title} />
                <TextBlock text={title2} />
            </div>
        </div>
    );
};

export default SelfSection;