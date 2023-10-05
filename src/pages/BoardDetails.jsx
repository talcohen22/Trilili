import { useParams } from "react-router";
import { GroupList } from "../cmps/group/GroupList";
import { boardService } from "../services/board.service.local";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { updateBoard } from "../store/board.actions";

import { BoardFilter } from "../cmps/board/BoardFilter.jsx";
import { StarSvg } from "../cmps/svg/ImgSvg";


export function BoardDetails() {
    const { boardId } = useParams()
    const [board, setBoard] = useState(null)

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

    async function onAddNewGroup(newGroup) {
        // console.log('newGroup: ', newGroup)
        try {
            const updatedBoard = board
            updatedBoard.groups.push(newGroup)
            boardService.save(updatedBoard)

            // console.log('test')
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
            console.log('savedBoard', savedBoard)
        } catch (err) {
            console.log('err onAddNewGroup: ', err)
        }
    }

    return (
        <section>
            <BoardFilter/>
            {board && <GroupList board={board} onAddNewGroup={onAddNewGroup} />}
            
        </section>

    )
}