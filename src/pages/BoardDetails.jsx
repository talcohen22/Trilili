import { useParams } from "react-router";
import { GroupList } from "../cmps/group/GroupList";
import { boardService } from "../services/board.service.local";
import { useEffect, useState } from "react";
import { BoardFilter } from "../cmps/board/BoardFilter.jsx";
import { StarSvg } from "../cmps/svg/ImgSvg";

export function BoardDetails() {
    const [board, setBoard] = useState(null)
    const { boardId } = useParams()

    useEffect(() => {
        if (boardId) loadBoard(boardId)
        // else setBoardToEdit(boardService.getEmptyBoard())

        async function loadBoard(boardId) {
            try {
                const boardById = await boardService.getById(boardId)
                setBoard(boardById)
            } catch (err) {
                console.log(err)
            }
        }
    }, [])

    return (
        <section>
            <BoardFilter/>
            {board && <GroupList board={board} />}
            
        </section>
    )
}