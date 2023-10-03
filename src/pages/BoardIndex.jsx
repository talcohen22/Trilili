import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard, updateBoard, removeBoard } from '../store/board.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { boardService } from '../services/board.service.local.js'
import { BoardList } from '../cmps/board/BoardList.jsx'
import { Menu } from '../cmps/Menu.jsx'

export function BoardIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

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

    // async function onAddBoard() {
    //     const board = boardService.getEmptyBoard()
    //     board.title = prompt('Title?')
    //     try {
    //         const savedBoard = await addBoard(board)
    //         showSuccessMsg(`Board added (id: ${savedBoard._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add board')
    //     }        
    // }

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
                <Menu/>
                <BoardList boards={boards}/>
            </main>
        </div>
    )
}