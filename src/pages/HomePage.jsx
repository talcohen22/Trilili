import React from 'react'
import { HomePageHero } from './home-page-cmps/HomePageHero.jsx'
import { HomePageProductivity } from './home-page-cmps/HomePageProductivity.jsx'

export function HomePage() {

    document.title='Trilili'

    return (
        <section className="homepage">

            {/* <HomePageHeader /> */}
            <section className="homepage-container">
                <HomePageHero />
            </section>
            
            <section className="homepage-productivity">
                <HomePageProductivity/>
            </section>

        </section>
    )
}