import { useNavigate } from "react-router";
import { UserSvg } from "../svg/ImgSvg";
import { BoardPreview } from "./BoardPreview";
import { useState } from "react";
import { NewBoardModal } from "./NewBoardModal";
import { boardService } from "../../services/board.service.local";

export function BoardList({ boards, onAddBoard }) {

    const navigate = useNavigate()
    const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false)

    async function onGetDetails(boardId) {
        const board = await boardService.getById(boardId)
        navigate(`/board/${boardId}`)
    }

    function onSetIsOpenModal(){
        setIsNewBoardModalOpen(!isNewBoardModalOpen)
    }

    return (
        <section className="board-list-container">
            <h1>WorkSpace name</h1>
            <div className="boards-header">
                <UserSvg />
                <h3>Your boards</h3>
            </div>
            <ul className="board-list">
                {boards.map(board =>
                    <li className="board-item" onClick={() => onGetDetails(board._id)} key={board._id}>
                        <span className="board-fade">
                            <BoardPreview board={board} />
                        </span>
                    </li>

                )}
                <li onClick={() => setIsNewBoardModalOpen(!isNewBoardModalOpen)}>
                    Create new board
                </li>
            </ul>
            {isNewBoardModalOpen && <NewBoardModal onAddBoard={onAddBoard} onSetIsOpenModal={onSetIsOpenModal} />}
        </section >
    )
}