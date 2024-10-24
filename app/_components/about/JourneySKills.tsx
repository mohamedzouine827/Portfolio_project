"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SkillProps {
  skillName: string;
}

export default function JourneySkills({ skillName }: SkillProps) {
  return (
    <motion.div 
      className='w-[603px] py-[10px] px-[16px] border-b border-white cursor-pointer'
    >
      <motion.h1 
        className='text-[32px] leading-[48px] font-semibold text-white'
        whileHover={{ x: 8 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        {skillName}
      </motion.h1>
    </motion.div>
  )
}