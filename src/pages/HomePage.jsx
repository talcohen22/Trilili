import React from 'react'
import { Link } from 'react-router-dom'

export function HomePage() {
    return (
        <section>
           <p>Lorem ipsum dolor sit amet.</p>
           <button><Link to="/workspace">Start Demo</Link></button>
        </section >
    )
}