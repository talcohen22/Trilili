import { useEffect, useRef } from 'react';
import { logout } from '../store/user.actions';
import { useNavigate } from 'react-router-dom'

export function UserInfoModal({ position, loggedUser, initials, handleUserInfo, handleLogOut }) {
    const { top, left } = position
    const navigate = useNavigate()
    const modalRef = useRef(null)
    const isComponentMounted = useRef(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                if (isComponentMounted.current) handleUserInfo()
            }
            isComponentMounted.current = true
        }
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }

    }, [handleUserInfo])

    const { email, fullname, imgUrl } = loggedUser

    async function onLogout() {
        try {
            await logout()
            handleLogOut()
            navigate('/')
        } catch (err) {
            console.log('err:', err)
        }
    }
    return (
        <div className="user-info-modal" style={{ top, left }} ref={modalRef}>
            <h2>Account</h2>
            <div className="user-info-modal-content">
                <div>
                    <span className='user-info-modal-img' style={{ 'background': imgUrl }}>{initials}</span>
                </div>
                <div className="user-info-modal-text">
                    <h5>{fullname.toLowerCase()}</h5>
                    <p>{email}</p>
                </div>
            </div>
            <hr />
            <button className="logout" onClick={onLogout}>Logout</button>
        </div>
    )
}