import { useEffect, useRef, useState } from "react";
import { updateBoardGroupTaskType, updateUserCmp } from "../../store/board.actions";
import { utilService } from "../../services/util.service";
export function MemberImg({ member, size }) {
    const [isAvatarClicked, setIsAvatarClicked] = useState(false)
    const [imgSize, setImgSize] = useState(null)
    const imgRef = useRef(null)
    const initials = utilService.getInitials(member.fullname)
    const small = 24
    const medium = 28
    const large = 32
    useEffect(() => {
      setSize(size)
     }, [])
     function setSize(size){
        if(size===small)setImgSize(small)
        else if(size===medium)setImgSize(medium)
        else setImgSize(large)
     }
    function handleAvtarClick(ev) {
        ev.stopPropagation()
        setIsAvatarClicked(!isAvatarClicked)
        const screenWidth = window.innerWidth;
        let rightBorder = imgRef.current.getBoundingClientRect().left
        if (rightBorder > screenWidth - 304) {
            rightBorder = imgRef.current.getBoundingClientRect().right - 165
        }
        const position = {
            top: imgRef.current.getBoundingClientRect().top,
            left: rightBorder
        }

        const userCmp = { isOpen: true, user: member, position: position }
        updateUserCmp(userCmp)
        updateBoardGroupTaskType(null, null, null, '', null)
    }

    return (
        <div className="member-img-container" ref={imgRef} onClick={handleAvtarClick}>

            {(member.imgUrl[0] === '#') ?
                <div className="initials"
                    style={{
                        'background': member.imgUrl
                    }}>
                    <span >{initials}</span>
                </div>
                :
                <img className="member-image"
                    style={{
                        backgroundImage: `url(${member.imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '50%',
                        height:imgSize+"px",
                        width:imgSize+"px"
                    }} />
            }
        </div>
    )
} 