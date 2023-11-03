import { useEffect, useRef } from "react";
import { ExitBtnSvg } from "../svg/ImgSvg";
import { utilService } from "../../services/util.service";


export function AvatarModal({ member, position, onCloseAvatarModal }) {
    const modalRef = useRef(null)
    const initials=utilService.getInitials(member.fullname)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCloseAvatarModal()
            }
        }
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    function handleCloseModal() {
        onCloseAvatarModal()
    }

    return (

        <div className="avatar-modal" ref={modalRef} style={{ left: position.left, top: position.top }}>
            <div className="upper-modal-section">
                <div className="avatar-content flex">
                    {!(member.imgUrl[0] === "#") ?
                        <img style={{
                            backgroundImage: `url(${member.imgUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }} />
                        : <div className="initials"
                            style={{
                                width:'86px',
                                height:'86px',
                                'background': member.imgUrl,
                                
                            }}>
                            <span  style={{fontSize:'38px'}}>{initials}</span>
                        </div>
                    }
                    <div className="avatar-text">
                        <div className="fullname">{member.fullname}</div>
                        <div className="username">{`@${member.username}`}</div>
                    </div>

                    <button onClick={handleCloseModal} className="exit-btn"><ExitBtnSvg /></button>
                </div>
            </div>
            <div className="flex justify-center">
                <hr />
            </div>
            <div className="lower-modal-section">

            </div>
        </div>

    )
}