import React from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import Banner from '../Banner/Banner'
import Category from '../Category/Category'
import Step from '../Step/Step'
import Games from '../Games/Games'
import Achievement from '../Achievement/Achievement'
import Footer from '../Footer/Footer'
import Testimonials from '../Testimonials/Testimonials'
import CommunitySection from '../Community/Community'
import Coins from '../Coins/Coins'


const Home = () => {
  return (
    <div>
        <Hero />
        <Banner />
        <Category />
        <Step />
        <Games />
        <Coins />
        <Achievement />
        <CommunitySection />
        <Testimonials />
    </div>
  )
}

export default Home