import { useState } from "react";
import { ActivitySvg, LabelsSvg } from "../svg/ImgSvg";
import { removeBoard } from "../../store/board.actions";
import { useNavigate } from "react-router";

export function BoardMenu({ board, onOpenMenuCmp }) {

    const [isDeleteCmpOpen, setIsDeleteCmpOpen] = useState(false)
    const navigate = useNavigate()

    async function onRemoveBoard() {
        try {
            await removeBoard(board._id)
            navigate('/workspace')
        } catch (err) {
            console.log('Cannot remove board', err)
        }
    }

    function onOpenRemoveQuestion(value) {
        setIsDeleteCmpOpen(value)
    }

    return (
        <section className="board-menu" >

            <div className="activity option flex align-center"
                onClick={(ev) => onOpenMenuCmp(ev, 'Activity')}>
                <ActivitySvg />
                <p>Activiy</p>
            </div>

            <div className="change-background option flex align-center"
                onClick={(ev) => onOpenMenuCmp(ev, 'Change background')}>
                <div style={{ backgroundImage: `url(${board.style.backgroundImage})` }}></div>
                <p>Change background</p>
            </div>

            {!isDeleteCmpOpen && <button className="delete-board" onClick={() => onOpenRemoveQuestion(true)}>Delete board</button>}

            {isDeleteCmpOpen &&
                <div className="delete-modal">
                    <p>Deleting a board is permanent and there is no way to get it back.</p>
                    <div className="flex">
                        <button className="delete-btn" onClick={onRemoveBoard}>Delete</button>
                        <button className="cancel-btn" onClick={() => onOpenRemoveQuestion(false)}>Cancel</button>
                    </div>
                </div>}

        </section>
    )
}