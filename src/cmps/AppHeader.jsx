import { Link, NavLink } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import routes from '../routes'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { login, logout, signup } from '../store/user.actions.js'
// import { LoginSignup } from './LoginSignup.jsx'
import { LogoApp } from './svg/ImgSvg'

export function AppHeader() {
    return (
        <header className="app-header " >
            <nav className='flex justify-space-b align-center'>
                <div className='btns-header-ops'>
                    <button className="btn-ops btn-logo">
                        <LogoApp />
                        <Link to="/">
                            Trilili
                        </Link>
                    </button>
                    <button className="btn-ops btn-workspaces">Workspaces</button>
                    <button className="btn-ops btn-recent">Recent</button>
                    <button className="btn-ops btn-more">More</button>
                </div>

                <div className='btns-header-user'>
                    <input type="text" name="search-bar" id="search-bar" placeholder='Search' />
                    <button className="btn-user btn-notifications">notifications</button>
                    <button className="btn-user btn-img-user">user
                        {/* <img src="https://friconix.com/png/fi-cnsuxl-user-circle.png" alt="" /> */}
                    </button>
                </div>
            </nav>
        </header>
    )
}