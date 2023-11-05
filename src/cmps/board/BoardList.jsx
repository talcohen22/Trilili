import { useNavigate } from "react-router";
import { StarFillSvg, StarSvg, UserSvg } from "../svg/ImgSvg";
import { BoardPreview } from "./BoardPreview";
import { useState } from "react";
import { NewBoardModal } from "./NewBoardModal";
import { boardService } from "../../services/board.service.local";
import { updateBoardUsStarred, updateNewBoardModal } from "../../store/board.actions";
import { useSelector } from "react-redux";

export function BoardList({ boards, onAddBoard }) {

    const navigate = useNavigate()
    const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false)

    async function onGetDetails(boardId) {
        const board = await boardService.getById(boardId)
        navigate(`/board/${boardId}`)
    }

    function onSetIsOpenModal() {
        setIsNewBoardModalOpen(!isNewBoardModalOpen)
    }

    async function onSetBoardIsStarred(ev, board) {
        ev.stopPropagation()
        try {
            await updateBoardUsStarred(board)
        } catch (err) {
            console.log('Cannot update isStarred board', err)
            throw err
        }
    }

    function onSetIsNewBoardModalOpen(ev) {
        setIsNewBoardModalOpen(!isNewBoardModalOpen)
        const parentElement = ev.currentTarget;
        const data = parentElement.getBoundingClientRect()
        const location = { top: data.top, left: data.left }
        const newBoardModal = { isOpen: true, location: location }
        updateNewBoardModal(newBoardModal)
    }

    return (
        <section className="board-list-container">

            <div className="starred-boards flex">
                <StarSvg />
                <h3>Starred boards</h3>
            </div>
            <ul className="board-list">
                {boards.filter(board => board.isStarred).map(board =>
                    <li className="board-item starred"
                        onClick={() => onGetDetails(board._id)}
                        key={board._id}
                        style={{ backgroundImage: `url(${board.style.backgroundImage})` }}
                    >
                        <span className="board-fade">
                            <BoardPreview board={board} />
                        </span>
                        <div className="star-svg" onClick={(ev) => onSetBoardIsStarred(ev, board)}>
                            <StarFillSvg />
                        </div>
                    </li>
                )}
            </ul>

            <div className="boards-header flex align-center">
                <UserSvg />
                <h3>Your boards</h3>
            </div>
            <ul className="board-list">
                {boards.map(board =>
                    <li className={`board-item ${board.isStarred ? 'starred' : ''}`}
                        onClick={() => onGetDetails(board._id)}
                        key={board._id}
                        style={{ backgroundImage: `url(${board.style.backgroundImage})` }}
                    >
                        <span className="board-fade">
                            <div className="star-svg" onClick={(ev) => onSetBoardIsStarred(ev, board)}>
                                {board.isStarred ? <StarFillSvg /> : <StarSvg />}
                            </div>
                            <BoardPreview board={board} />
                        </span>
                    </li>
                )}
                <li className="create-board" onClick={onSetIsNewBoardModalOpen}>
                    Create new board
                </li>
            </ul>

            {isNewBoardModalOpen && <NewBoardModal onAddBoard={onAddBoard} onSetIsOpenModal={onSetIsOpenModal} />}
       
        </section >
    )
}