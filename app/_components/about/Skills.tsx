"use client"

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Skill from './Skill'

export default function Skills() {
    const skillz = ["REACT JS", "FRAMER MOTION", "FRAMER", "NEXT JS", "FIGMA", "TAILWIND CSS", "THREE JS"]

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    const text = "SKILLZZZZZ"
    const letters = Array.from(text)

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const child = {
        hidden: { 
            opacity: 0, 
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    }

    const skillsContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.6,
                staggerChildren: 0.1
            }
        }
    }

    return (
        <section 
            ref={ref}
            className='bg-[#0016A7] px-[60px] py-[112px]'
        >
            <div className='flex flex-col gap-[72px]'>
                <motion.h1 
                    className='font-bold text-[128px] leading-[160px] text-white'
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {letters.map((letter, index) => (
                        <motion.span
                            key={index}
                            variants={child}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.h1 
                    className='font-bold text-[128px] leading-[160px] text-white transform rotate-180'
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {letters.map((letter, index) => (
                        <motion.span
                            key={index}
                            variants={child}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>
            </div>
            
            <motion.div 
                className='flex flex-col gap-4 mt-16'
                variants={skillsContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {skillz.map((skill, index) => (
                    <motion.div 
                        key={index}
                        variants={child}
                    >
                        <Skill skillName={skill} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}