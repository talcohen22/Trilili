import { Link } from "react-router-dom"
import { LogoApp } from "../../cmps/svg/ImgSvg"
import { utilService } from "../../services/util.service"

export function HomePageHeader() {

    return (
        <header>
            <nav className='homepage-header flex justify-space-b align-center'>

                <div className='flex'>
                    <Link to="/">
                        {/* <button className="">
                            <LogoApp color={"#227ffa"} />
                            Trilili
                        </button> */}
                        <img src={utilService.getAssetSrc('TrililiLogo.svg')} />
                    </Link>
                </div>
                <div className="homepage-header-links">
                    <Link to="/auth">
                        <button className="hompage-header-login-btn">Login</button>
                    </Link>

                    <Link to={'/workspace'}>
                        <button className="homepage-header-btn">Get Trilili for free</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}