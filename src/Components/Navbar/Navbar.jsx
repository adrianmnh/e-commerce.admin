import React, { useState, useEffect } from 'react'
import './Navbar.css'
import navlogo from "../../assets/nav-logo.svg"
import navProfile from "../../assets/nav-profile.svg"


const Navbar = () => {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className="navbar">
			<img className="nav-logo" src={navlogo} alt="navlogo" />
			<p>{`${width} x ${height}`}</p>
			<img className="nav-profile" src={navProfile} alt="navProfile" />
		</div>
	)
}

export default Navbar
