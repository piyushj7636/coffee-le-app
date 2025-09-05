import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

export const Home: React.FC = () => {
	return (
		<>
		<Navbar />
		<Hero />
		<Features />
		<Menu />
		<Footer />
		</>
	)
}
