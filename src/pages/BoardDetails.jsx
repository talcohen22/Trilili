import { useParams } from "react-router";
import { GroupList } from "../cmps/group/GroupList";
import { boardService } from "../services/board.service.local";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { setIsCheckDate, setIsExpandedLabels, updateBoard } from "../store/board.actions";

import { BoardFilter } from "../cmps/board/BoardFilter.jsx";
import { StarSvg } from "../cmps/svg/ImgSvg";
import { utilService } from "../services/util.service";
import { TaskFeatureDynamic } from "../cmps/task/TaskFeatureDynamic";



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

    async function onAddTask(newTask, groupId,direction) {
        
        try {
            const updatedBoard = board
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            if(direction==='START')updatedBoard.groups[groupIdx].tasks.unshift(newTask)
            else updatedBoard.groups[groupIdx].tasks.push(newTask)
            boardService.save(updatedBoard)
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err onAddNewGroup: ', err)
        }
    }

    async function removeGroup(groupId) {
        try {
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            const updatedBoard = board
            updatedBoard.groups.splice(groupIdx, 1)
            boardService.save(updatedBoard)
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err on RemoveGroup', err)
        }
    }
    async function removeTasks(groupId) {
        try {
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            const updatedBoard = {...board}
            updatedBoard.groups[groupIdx].tasks=[]
            boardService.save(updatedBoard)
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err on RemoveTasks', err)
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

    async function onMoveBoards(sourceBoard,destinationBoard) {
        try {
            const fromBoard = await updateBoard(sourceBoard)
            const toBoard = await updateBoard(destinationBoard)
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

    function saveCopiedGroup(copiedGroup) {
        const newGroup = boardService.getEmptyGroup()
        newGroup.title = copiedGroup.title
        newGroup.tasks = copiedGroup.tasks
        const updatedTasks = newGroup.tasks.map(task => {
            const newId =utilService.makeId();
            const updatedTask = { ...task, id: newId };
            return updatedTask;
        })
        newGroup.tasks=updatedTasks
        onAddNewGroup(newGroup)
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
                    removeGroup={removeGroup}
                    removeTasks={removeTasks}
                    saveCopiedGroup={saveCopiedGroup}
                    onMoveBoards={onMoveBoards}
                />
            }

            <TaskFeatureDynamic/>

        </section>
    )
}