import { Link} from 'react-router-dom'
import { ArrowDown, LogoApp, NotificationsSvg } from './svg/ImgSvg'
import { useState, useEffect,useRef } from 'react'
import { utilService } from '../services/util.service'
import { useLocation } from 'react-router-dom';
import * as React from 'react';
// import { boardService } from '../services/board.service';
import { boardService } from '../services/board.service.local';
import { FastAverageColor } from 'fast-average-color';
import { useSelector } from 'react-redux';
import { UserInfoModal } from './UserInfoModal';

export function AppHeader() {

    let location = useLocation()
    const [boardId, setBoardId] = useState('')
    const [board, setBoard] = useState(null)
    const [bgColor, setBgColor] = useState('transparent')
    const [isUserLoggedIn, setIsUserLoggedIn] = useState("")
    const [loggedUser, setLoggedUser] = useState({email:'guest@trilili.com',fullname:'Guest',imgUrl:'#c76ebe'})
    
    const [isViewUserInfo, setIsViewUserInfo] = useState(false)
    const [userInfoPostion, setUserInfoPostion] = useState({ left: null, top: null })
    const buttonRef=useRef(null)

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const initials = getInitials(loggedUser.fullname)
    console.log(user)
    useEffect(() => {
        if (user) {
            setIsUserLoggedIn(true)
            setLoggedUser(user)
        }
        setBoardId('')
        setBoard(null)
        setBgColor('transparent')
        if(location.pathname=== '/workspace')
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

    }, [location, boardId,user,isUserLoggedIn, loggedUser])

    function getInitials(fullName) {
        if (typeof fullName !== 'string') {
            return '';
        }

        const nameParts = fullName.split(' ').filter(part => part); // Filter out empty parts
        const initials = nameParts.map(part => part[0]).slice(0, 2).join('').toUpperCase(); // Get the first letter of each part, then join the first two

        return initials;
    }

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
        const buttonRect = buttonRef.current.getBoundingClientRect()
        setUserInfoPostion({ left: buttonRect.left-265, top: buttonRect.top+40  })
        setIsViewUserInfo(!isViewUserInfo)
    }

    return (
        <header className="app-header"
            style={{
                backgroundColor: bgColor,
                borderBottomColor: bgColor,
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

                    <input
                        className={`search-bar ${dynClass}`}
                        value={inputValue}
                        placeholder='Search'
                        onChange={handleInputChange}
                        onFocus={(ev) => ev.target.classList.add("focused")}
                        onBlur={(ev) => ev.target.classList.remove("focused")} />

                    {/* <SearchSvg /> */}
                    <button className="btn-user btn-notifications">
                        <div className={`center-svg ${dynClass}`} onClick={handleWatchNotifications}>
                            <NotificationsSvg />
                        </div>
                    </button>

                    <button className="btn-user btn-img-user" onClick={handleUserInfo} ref={buttonRef}>
                        <div className="center-svg">
                            {(isUserLoggedIn && user) ? <span style={{ 'background': user.imgUrl }}>{initials}</span>
                                : <span style={{ 'background':loggedUser.imgUrl }}>{initials}</span>
                            }
                            {/* <img src={utilService.getAssetSrc('stav-black.jpg')} alt="user" /> */}
                        </div>
                    </button>

                </div>
            </nav>
           {isViewUserInfo&&<UserInfoModal loggedUser={loggedUser} position={userInfoPostion} initials={initials}/>} 
        </header >
    )
}