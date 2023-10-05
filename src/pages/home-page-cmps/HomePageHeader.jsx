import { Link } from "react-router-dom"
import { LogoApp } from "../../cmps/svg/ImgSvg"

export function HomePageHeader() {

    return (
        <header>
            <nav className='homepage-header flex justify-space-b align-center'>
                <div className='flex'>
                    <Link to="/">
                        <button className="">
                            <LogoApp color={"#227ffa"} />
                            Trilili
                        </button>
                    </Link>

                    {/* <div>
                        <button className="btn-link">Features</button>
                        <button className="btn-link">Solutions</button>
                        <button className="btn-link">plans</button>
                        <button className="btn-link">Pricing</button>
                        <button className="btn-link">Resources</button>
                    </div> */}


                </div>
                <Link>
                    <button className="homepage-header-btn">
                        Get Trilili for free
                    </button>
                </Link>
            </nav>
        </header>
    )
}