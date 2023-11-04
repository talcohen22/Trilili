import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadBoards, addBoard } from '../store/board.actions.js'
import { useNavigate } from "react-router";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BoardList } from '../cmps/board/BoardList.jsx'
import { Menu } from '../cmps/Menu.jsx'

export function BoardIndex() {

    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()

    useEffect(() => {
        loadBoards()
    }, [filterBy])

    async function onAddBoard({ title, bgc }) {
        try {
            const savedBoard = await addBoard({ title, style: { backgroundImage: bgc } })
            navigate(`/board/${savedBoard._id}`)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    return (
        <div>
            <main className='main-container'>
                <Menu />
                <BoardList boards={boards} onAddBoard={onAddBoard} />
            </main>
        </div>
    )
}