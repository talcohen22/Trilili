import React from 'react'
import { HomePageHero } from './home-page-cmps/HomePageHero.jsx'
import { HomePageProductivity } from './home-page-cmps/HomePageProductivity.jsx'
import { HomePageCards } from './home-page-cmps/HompageCards.jsx'
import { HomePageSignUp } from './home-page-cmps/HomPageSignUp.jsx'
import { HomePageFooter } from './home-page-cmps/HomePageFooter.jsx'
import { HomePageHeader } from './home-page-cmps/HomePageHeader.jsx'

export function HomePage() {

    document.title='Trilili'

    return (
        <section className="homepage">

            <HomePageHeader />

            <section className="homepage-container">
                <HomePageHero />
            </section>
            
            <section className="homepage-productivity">
                <HomePageProductivity/>
                <HomePageCards/>
            </section>

            <section className='homepage-signup'>
                <HomePageSignUp/>
            </section>

            <section className=''>
                <HomePageFooter />
            </section>

        </section>
    )
}