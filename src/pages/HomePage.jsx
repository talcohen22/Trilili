import React from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../services/util.service.js'
import { HomePageHeader } from './home-page-cmps/HomePageHeader.jsx'

export function HomePage() {
    return (
        <section className='main-layout'>
            <div className='homepage-container'>
                <div className="homepage-header">
                    <HomePageHeader />
                </div>
                <div className="homepage-content">
                    <div className="homepage-hero flex">
                        <div>
                            <h1>Trilili brings all your tasks, teammates, and tools together</h1>
                            <p>Keep everything in the same place-even if your team isn’t.</p>
                            <button><Link to="/workspace">Start Managing</Link></button>
                        </div>
                        <div>
                            <img src="src//assets//img//home-img.webp" />
                        </div>
                    </div>
                    {/* <div className="homepage-section"></div> */}
                </div>
            </div>
        </section >
    )
}