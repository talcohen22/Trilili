import React from 'react'
import { Link } from 'react-router-dom'
import { utilService } from '../services/util.service.js'
import { HomePageHeader } from './home-page-cmps/HomePageHeader.jsx'
import { HomePageHero } from './home-page-cmps/HomePageHero.jsx'
import { HomePageProductivity } from './home-page-cmps/HomePageProductivity.jsx'

export function HomePage() {
    return (
        <section className="homepage">
            <HomePageHeader/>
        <section className="homepage-container">
            <HomePageHero/>
        </section>
        <section className="homepage-productivity">
          <HomePageProductivity/>
        </section>
      </section>
    )
}