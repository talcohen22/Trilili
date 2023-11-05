import { UNSPLASH_KEY } from "../../services/apiKeys";
import { updateBoardBgc } from "../../store/board.actions";
import { BackBtnSvg } from "../svg/ImgSvg";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router";

export function ChangePhotoBackground({ board, onOpenMenuCmp }) {

    const [imgs, setImgs] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchImgs() {
            const response = await fetch(`https://api.unsplash.com/photos/random?count=30&client_id=${UNSPLASH_KEY}`)
            const data = await response.json()
            let photos = data.map(d => d.urls.small)
            setImgs(photos)
        }
        fetchImgs()
    }, [])

    async function onUpdateBgc(bgc) {
        try {
            await updateBoardBgc(board, bgc)
            navigate(`/board/${board._id}`)
        } catch (err) {
            console.log('Cannot update bgc board', err)
        }
    }

    if (!imgs.length) return <div></div>
    return (

        <section className="change-photo-background scroll">

            <div className="photos-bgc">
                {imgs.map((img, index) => (
                    <img
                        key={index}
                        onClick={() => onUpdateBgc(img)}
                        src={img}
                    ></img>
                ))}
            </div>

            <div className="back-btn flex align-center justify-center" onClick={(ev) => onOpenMenuCmp(ev, 'Change background')}>
                <BackBtnSvg />
            </div>

        </section>
    )
}