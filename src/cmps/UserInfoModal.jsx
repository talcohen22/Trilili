import { logout } from '../store/user.actions';
import {  useNavigate } from 'react-router-dom'

export function UserInfoModal({ position,loggedUser,initials }) {
    const { top, left } = position
    const navigate=useNavigate()
    const {email, fullname,imgUrl}= loggedUser

    async function onLogout() {
        try {
          await logout()
          navigate('/')
        } catch (err) {
          console.log('err:', err)
        }
      }
      console.log(fullname);
    return (
        <div className="user-info-modal" style={{top,left}}>
            <h2>Account</h2>
            <div className="user-info-modal-content">
                <div>
                <span className='user-info-modal-img' style={{ 'background': imgUrl }}>{initials}</span>
                </div>
                <div className="user-info-modal-text">
                    <p>{fullname}</p>
                    <p>{email}</p>
                </div>
            </div>
            <hr />
            <button className="logout" onClick={onLogout}>Logout</button>
        </div>
    )
}