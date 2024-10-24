"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function MeMe() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 20 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.div 
            className="px-[60px] py-12 flex-col justify-start items-start gap-2.5 inline-flex"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div 
                className="px-[60px] py-24 bg-black justify-start items-start gap-2.5 inline-flex"
                variants={itemVariants}
            >
                <div className="grow shrink basis-0">
                    <motion.span 
                        className="text-white text-4xl font-bold font-['Plus Jakarta Sans'] leading-[57.60px]"
                        variants={itemVariants}
                    >
                        MOHAMED ZOUINE{" "}
                    </motion.span>
                    <motion.span 
                        className="text-white text-2xl font-medium font-['Plus Jakarta Sans'] leading-[43.20px]"
                        variants={itemVariants}
                    >
                        a 21-year-old creative from Morocco, blending my passion for software engineering and UX design to craft seamless digital experiences. My approach combines a love for clean, intuitive design with the technical know-how to bring those ideas to life. Whether building something from scratch or refining a user journey, I focus on creating solutions that are both practical and visually engaging.
                    </motion.span>
                </div>
            </motion.div>
        </motion.div>
    )
}