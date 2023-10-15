import { useParams } from "react-router";
import { GroupList } from "../cmps/group/GroupList";
import { boardService } from "../services/board.service.local";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { setIsCheckDate, setIsExpandedLabels, updateBoard } from "../store/board.actions";

import { BoardFilter } from "../cmps/board/BoardFilter.jsx";
import { StarSvg } from "../cmps/svg/ImgSvg";


export function BoardDetails() {
    const { boardId } = useParams()
    const [board, setBoard] = useState(null)
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        if (boardId) loadBoard(boardId)
        async function loadBoard(boardId) {
            try {
                const boardById = await boardService.getById(boardId)
                setBoard(boardById)
            } catch (err) {
                console.log(err)
            }
        }
    }, [boards])

    async function onAddNewGroup(newGroup) {
        try {
            const updatedBoard = board
            updatedBoard.groups.push(newGroup)
            boardService.save(updatedBoard)
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err', err)
        }
    }

    async function onAddTask(newTask, groupId) {
        try {
            const updatedBoard = board
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            updatedBoard.groups[groupIdx].tasks.push(newTask)
            boardService.save(updatedBoard)
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err onAddNewGroup: ', err)
        }
    }

    async function onSetBoard(updatedBoard) {
        try {
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
        } catch (err) {
            console.log(err);
        }
    }

    async function onIsCheckDate(group, task) {
        try {
            setIsCheckDate(board, group, task)
        } catch (err) {
            console.log('err')
        }
    }

    async function onIsExpandedLabels() {
        try {
            setIsExpandedLabels(board)
        } catch (err) {
            console.log('err')
        }
    }



    if (!board) return <div></div>
    return (
        <section
            className="board-details"
            style={{ backgroundImage: `url(${board.style.backgroundImage})` }}>

            <BoardFilter board={board} onSetBoard={onSetBoard} />
            {board &&
                <GroupList
                    board={board}
                    onAddNewGroup={onAddNewGroup}
                    onAddTask={onAddTask} 
                    onSetBoard={onSetBoard}                         
                    onIsCheckDate={onIsCheckDate}
                    onIsExpandedLabels={onIsExpandedLabels}
                />
            }

        </section>
    )
}