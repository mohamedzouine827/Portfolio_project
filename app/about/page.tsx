import React from 'react'
import Navbar from '../_components/Navbar'

import HeroAbout from '../_components/about/HeroAbout'
import MeMe from '../_components/about/MeMe'
import Skills from '../_components/about/Skills'
import Journey from '../_components/about/Journey'

export default function page() {
  return (
    <div>
      <Navbar/>
      <HeroAbout/>
      <MeMe/>
      <Skills/>
      <Journey/>
    </div>
  )
}
