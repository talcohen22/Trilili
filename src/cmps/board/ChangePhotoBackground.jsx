import { updateBoardBgc } from "../../store/board.actions";
import { BackBtnSvg } from "../svg/ImgSvg";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router";

export function ChangePhotoBackground({ board, onOpenMenuCmp }) {

    const navigate = useNavigate()

    const photos = [0, 50, 100, 150, 200, 250, 300, 350];

    async function onUpdateBgc(bgc) {
        try {
            await updateBoardBgc(board, bgc)
            navigate(`/board/${board._id}`)
        } catch (err) {
            console.log('Cannot update bgc board', err)
        }
    }

    return (

        <section className="change-photo-background">

            <div className="photos-bgc">
                {photos.map((photo, index) => (
                    <img
                        key={index}
                        onClick={() => onUpdateBgc(`https://source.unsplash.com/random/${300 + photo}×${300 + photo}`)}
                        src={`https://source.unsplash.com/random/${300 + photo}×${300 + photo}`}
                    ></img>
                ))}
            </div>

            <div className="back-btn flex align-center justify-center" onClick={(ev) => onOpenMenuCmp(ev, 'Change background')}>
                <BackBtnSvg />
            </div>

        </section>
    )
}