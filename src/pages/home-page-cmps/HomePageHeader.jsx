import { Link } from "react-router-dom"
import { LogoApp } from "../../cmps/svg/ImgSvg"

export function HomePageHeader() {

    return (
        <header>
            <nav className='homepage-header flex justify-space-b align-center'>
                <div className='flex'>
                        <button className="">
                        <LogoApp color={"#227ffa"}/>
                        <Link to="/">
                            Trilili
                        </Link>
                    </button>
                    <div>
                        <button className="btn-link">Features</button>
                        <button className="btn-link">Solutions</button>
                        <button className="btn-link">plans</button>
                        <button className="btn-link">Pricing</button>
                        <button className="btn-link">Resources</button>
                    </div>
                

                </div>
                    <button className="homepage-header-btn"><Link>Get Trilili for free</Link></button>
            </nav>
        </header>
    )
}