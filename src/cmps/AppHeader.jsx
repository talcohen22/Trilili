import { Link, NavLink } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import routes from '../routes'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { login, logout, signup } from '../store/user.actions.js'
// import { LoginSignup } from './LoginSignup.jsx'
import { ArrowDown, LogoApp, NotificationsSvg, SearchSvg } from './svg/ImgSvg'
import { useState } from 'react'
import { utilService } from '../services/util.service'

export function AppHeader() {

    const [inputValue, setInputValue] = useState('')

    function handleInputChange(ev) {
        setInputValue(ev.target.value)
    }

    return (
        <header className="app-header" >
            <nav className='flex justify-space-b align-center'>
                <div className='btns-header-ops flex  align-center'>

                    <Link to="/">
                        <button className="btn-ops btn-logo flex justify-space-b ">
                            <LogoApp />
                            Trilili
                        </button>
                    </Link>

                    <button className="btn-ops btn-workspaces">
                        Workspaces
                        <ArrowDown />
                    </button>

                    <button className="btn-ops btn-recent ">
                        Recent
                        <ArrowDown />
                    </button>

                    <button className="btn-ops btn-more">
                        More
                        <ArrowDown />
                    </button>
                </div>

                <div className='btns-header-user flex justify-space-b align-center'>

                    <input
                        className="search-bar"
                        value={inputValue}
                        placeholder='Search'
                        onChange={handleInputChange}
                        onFocus={(ev) => ev.target.classList.add("focused")}
                        onBlur={(ev) => ev.target.classList.remove("focused")}
                    />

                    {/* <SearchSvg /> */}
                    <button className="btn-user btn-notifications">
                        <div className="center-svg">
                            <NotificationsSvg />
                        </div>
                    </button>

                    <button className="btn-user btn-img-user">
                        <div className="center-svg">
                            <img src={utilService.getAssetSrc('stav-black.png')} alt="user" />
                        </div>
                    </button>
                </div>
            </nav>
        </header>
    )
}