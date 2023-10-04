import { useParams } from "react-router";
import { GroupList } from "../cmps/group/GroupList";
import { boardService } from "../services/board.service.local";
import { useEffect, useState } from "react";

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
        board && <GroupList board={board} />
    )
}