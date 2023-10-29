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
                </div>

                <Link>
                    <button className="homepage-header-btn">Get Trilili for free</button>
                </Link>

            </nav>
        </header>
    )
}