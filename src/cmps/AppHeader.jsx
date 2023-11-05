import { Link, useNavigate } from 'react-router-dom'
import { ArrowDown, LogoApp, NotificationsSvg, SearchSvg } from './svg/ImgSvg'
import { useState, useEffect, useRef } from 'react'
import { utilService } from '../services/util.service'
import { useLocation } from 'react-router-dom';
import * as React from 'react';
import { boardService } from '../services/board.service.local';
import { FastAverageColor } from 'fast-average-color';
import { useSelector } from 'react-redux';
import { UserInfoModal } from './UserInfoModal';
import { style, width } from '@mui/system';

export function AppHeader() {

    let location = useLocation()
    const navigate = useNavigate()
    const [boardId, setBoardId] = useState('')
    const [board, setBoard] = useState(null)
    const [bgColor, setBgColor] = useState('transparent')
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [loggedUser, setLoggedUser] = useState({ fullname: 'Guest', imgUrl: '#c76ebe' })
    const [isViewUserInfo, setIsViewUserInfo] = useState(false)
    const [userInfoPostion, setUserInfoPostion] = useState({ left: null, top: null })
    const buttonRef = useRef(null)

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    
    const initials = utilService.getInitials(loggedUser.fullname)
    useEffect(() => {
        if (user) {
            setIsUserLoggedIn(true)
            setLoggedUser(user)
        }
        setBoardId('')
        setBoard(null)
        setBgColor('transparent')
        if (location.pathname.includes('/board')) {
            const path = location.pathname.substring(7, location.pathname.length)
            const firstSlashIndex = path.indexOf("/");

            if (firstSlashIndex === -1) setBoardId(path)
            else setBoardId(path.substring(0, firstSlashIndex))

            if (boardId) loadBoard(boardId)

            async function loadBoard(boardId) {
                try {
                    const boardById = await boardService.getById(boardId)
                    setBoard(boardById)
                    document.title = `${boardById.title} | Trilili`
                } catch (err) {
                    console.log(err)
                }
            }
        }

    }, [location, boardId, user, isUserLoggedIn, loggedUser, isViewUserInfo])

    async function getBgc() {
        const fac = new FastAverageColor()
        const color = await fac.getColorAsync(board.style.backgroundImage)
        setBgColor(color.hex);
    }

    const [inputValue, setInputValue] = useState('')
    function handleInputChange(ev) {
        setInputValue(ev.target.value)
    }

    function handleWatchNotifications() { }

    if (board) getBgc()

    const dynClass = bgColor !== 'transparent' ? 'bgColor' : ''
    if (location.pathname === '/' || location.pathname === '/auth') return null

    function handleUserInfo() {
        if (loggedUser.fullname === 'Guest') return
        const buttonRect = buttonRef.current.getBoundingClientRect()
        setUserInfoPostion({ left: buttonRect.left - 265, top: buttonRect.top + 40 })
        setIsViewUserInfo(!isViewUserInfo)
    }
    function handleLogOut() {
        setIsViewUserInfo(!isViewUserInfo)
        setIsUserLoggedIn(false)
        setLoggedUser({ fullname: 'Guest', imgUrl: '#c76ebe' })
    }

    return (
        <header className="app-header"
            style={{
                backgroundColor: bgColor,
                // borderBottomColor: bgColor,
            }} >
            <nav className='flex justify-space-b align-center'>

                <div className='btns-header-ops flex  align-center'>
                    <Link to="/">
                        <button className={`btn-ops btn-logo flex justify-space-b ${dynClass}`}>
                            <LogoApp />
                            Trilili
                        </button>
                    </Link>

                    <Link to="/workspace" >
                        <button className={`btn-ops btn-workspaces ${dynClass}`}>
                            Workspaces
                            {/* <ArrowDown /> */}
                        </button>
                    </Link>

                    <button className={`btn-ops btn-recent ${dynClass}`}>
                        Recent
                        {/* <ArrowDown /> */}
                    </button>

                    <button className={`btn-ops btn-more ${dynClass}`}>
                        More
                        {/* <ArrowDown /> */}
                    </button>
                </div>

                <div className='btns-header-user flex justify-space-b align-center'>

                    <div className={`search ${dynClass}`}>
                        <div>
                            <button className={`search-icon ${dynClass}`} title="Search">
                                <SearchSvg />
                            </button>
                        </div>
                        <div>  <input
                            className={`search-bar ${dynClass}`}
                            value={inputValue}
                            placeholder='Search'
                            onChange={handleInputChange}
                            onFocus={(ev) => ev.target.classList.add("focused")}
                            onBlur={(ev) => ev.target.classList.remove("focused")} />

                        </div>
                    </div>

                    <button className="btn-user btn-notifications">
                        <div className={`center-svg ${dynClass}`} onClick={handleWatchNotifications}>
                            <NotificationsSvg />
                        </div>
                    </button>
                    {(isUserLoggedIn && user) ?
                        <button className="btn-user btn-img-user" onClick={handleUserInfo} ref={buttonRef}>
                            <div className="center-svg">
                                {(user.imgUrl[0] === '#') ? <span style={{ 'background': user.imgUrl }}>{initials}</span>
                                    :
                                     <img style={{ backgroundImage: `url(${loggedUser.imgUrl})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center center',
                                     backgroundRepeat: 'no-repeat',
                                     padding: '12px'
                                    }}/>  
                                    }
                            </div>
                        </button> :

                        <div>
                            <button onClick={() => navigate('/auth')} className='btn-action guest'>Login</button>
                        </div>
                    }

                </div>
            </nav>
            {
                isViewUserInfo && <UserInfoModal
                    loggedUser={loggedUser}
                    position={userInfoPostion}
                    initials={initials}
                    handleUserInfo={handleUserInfo}
                    handleLogOut={handleLogOut}
                />
            }
        </header >
    )
}