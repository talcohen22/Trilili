import { Link } from "react-router-dom"
import { LogoApp } from "../../cmps/svg/ImgSvg"

export function HomePageHeader() {

    return (
        <header className="app-header">
            <nav className='flex justify-space-b align-center'>
                <div className='btns-header-ops flex'>
                    <div>
                    <LogoApp color={"#227ffa"}/>
                    <button className="btn-logo"><Link>Trilili</Link></button>
                    </div>
                    <button className="btn-link">Features</button>
                    <button className="btn-link">Solutions</button>
                    <button className="btn-link">plans</button>
                    <button className="btn-link">Pricing</button>
                    <button className="btn-link">Resources</button>
                </div>
                <div>
                    <button className="header-btn-start"><Link>Start Managing</Link></button>
                    
                </div>
            </nav>
        </header>
    )
}