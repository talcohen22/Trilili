import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, removeBoard } from '../store/board.actions.js'
import { useNavigate } from "react-router";

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { boardService } from '../services/board.service.local.js'
import { BoardList } from '../cmps/board/BoardList.jsx'
import { Menu } from '../cmps/Menu.jsx'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()

    useEffect(() => {
        loadBoards()
    }, [])

    // async function onRemoveBoard(boardId) {
    //     try {
    //         await removeBoard(boardId)
    //         showSuccessMsg('Board removed')            
    //     } catch (err) {
    //         showErrorMsg('Cannot remove board')
    //     }
    // }

    async function onAddBoard({ title, bgc }) {
        try {
            const savedBoard = await addBoard({ title, style: { backgroundImage: bgc } })
            navigate(`/board/${savedBoard._id}`)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    // async function onUpdateBoard(board) {
    //     const price = +prompt('New price?')
    //     const boardToSave = { ...board, price }
    //     try {
    //         const savedBoard = await updateBoard(boardToSave)
    //         showSuccessMsg(`Board updated, new price: ${savedBoard.price}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot update board')
    //     }        
    // }

    // function onAddBoardMsg(board) {
    //     console.log(`TODO Adding msg to board`)
    // }
    // function shouldShowActionBtns(board) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return board.owner?._id === user._id
    // }


    return (
        <div>
            <main className='main-container'>
                {/* <button onClick={onAddBoard}>Add Board ⛐</button> */}
                <Menu />
                <BoardList boards={boards} onAddBoard={onAddBoard} />
            </main>
        </div>
    )
}