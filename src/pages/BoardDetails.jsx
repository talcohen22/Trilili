import { useParams } from "react-router"
import { GroupList } from "../cmps/group/GroupList"
import { boardService } from "../services/board.service.local"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { addActivity, getActionUpdateBoard, setIsCheckDate, setIsExpandedLabels, updateBoard, updateBoardMenu, updateUserCmp } from "../store/board.actions"
import { BoardFilter } from "../cmps/board/BoardFilter.jsx";
import { utilService } from "../services/util.service";
import { TaskFeatureDynamic } from "../cmps/task/TaskFeatureDynamic";
import { TaskQuickEdit } from "../cmps/task/TaskQuickEdit";
import { BoardMenuDynamic } from "../cmps/board/BoardMenuDynamic";
import { useDispatch } from "react-redux";
import { SOCKET_EVENT_BOARD_UPDATED, socketService } from "../services/socket.service";
import { AvatarModal } from "../cmps/common/AvatarModal";
import { Dashboard } from "../cmps/common/Dashboard";
import { Filter } from "../cmps/board/Filter.jsx";

export function BoardDetails() {

    const { boardId } = useParams()
    const [board, setBoard] = useState(null)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isQuickEditOpen, setIsQuickEditOpen] = useState(false)
    const [isViewDashboard, setIsViewDashboard] = useState(false)
    const [quickEdit, setQuickEdit] = useState(null)
    const [checklistIdToEdit, setChecklistIdToEdit] = useState('')

    const boardMenu = useSelector(storeState => storeState.boardModule.boardMenu);
    const userCmp = useSelector(storeState => storeState.boardModule.userCmp)
    const filterCmpIsOpen = useSelector(storeState => storeState.boardModule.filterCmpIsOpen)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    function onSetChecklistIdToEdit(checklistId) {
        setChecklistIdToEdit(checklistId)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BOARD_UPDATED, board => {
            dispatch(getActionUpdateBoard(board))
        })

        return () => {
            socketService.off(SOCKET_EVENT_BOARD_UPDATED)
        }
    }, [])

    useEffect(() => {
        if (boardId) loadBoard(boardId)
        async function loadBoard(boardId) {
            try {
                const boardById = await boardService.getById(boardId, filterBy)
                setBoard(boardById)
                document.title = `${boardById.title} | Trilili`
            } catch (err) {
                console.log(err)
            }
        }
    }, [boards, filterBy])

    async function onAddNewGroup(newGroup) {
        try {
            const updatedBoard = board
            updatedBoard.groups.push(newGroup)
            const strHtml = `added ${newGroup.title} to this board`
            const savedBoard = await addActivity(updatedBoard, newGroup, null, strHtml)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err', err)
        }
    }

    async function onAddTask(newTask, groupId, direction) {
        try {
            const updatedBoard = board
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            const group = updatedBoard.groups[groupIdx]
            if (direction === 'START') group.tasks.unshift(newTask)
            else group.tasks.push(newTask)
            boardService.save(updatedBoard)
            const strHtml = `added <span className="task-title">${newTask.title}</span> to ${group.title}`
            await addActivity(updatedBoard, group, newTask, strHtml)
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err onAddNewGroup: ', err)
        }
    }

    function openQuickEdit(task, groupId, position) {
        setQuickEdit({ task, groupId, position })
        setIsQuickEditOpen(true)

    }
    function closeQuickEdit() {
        setIsQuickEditOpen(false)
    }

    async function removeGroup(groupId) {
        try {
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            const updatedBoard = board
            const group = updatedBoard.groups[groupIdx]
            updatedBoard.groups.splice(groupIdx, 1)
            const strHtml = `removed list ${group.title}`
            const savedBoard = await addActivity(updatedBoard, group, null, strHtml)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err on RemoveGroup', err)
            throw err
        }
    }
    async function removeTasks(groupId) {
        try {
            const groupIdx = board.groups.findIndex((group) => group.id === groupId)
            const updatedBoard = { ...board }
            updatedBoard.groups[groupIdx].tasks = []
            boardService.save(updatedBoard)
            const savedBoard = await updateBoard(updatedBoard)
            setBoard(savedBoard)
        } catch (err) {
            console.log('err on RemoveTasks', err)
        }
    }

    async function onSetBoard(updatedBoard) {
        try {
            setBoard(updatedBoard)
            const savedBoard = await updateBoard(updatedBoard)
        } catch (err) {
            console.log(err);
        }
    }

    async function onMoveBoards(sourceBoard, destinationBoard) {
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
            const newId = utilService.makeId();
            const updatedTask = { ...task, id: newId };
            return updatedTask;
        })
        newGroup.tasks = updatedTasks
        onAddNewGroup(newGroup)
    }

    function onOpenMenuCmp(ev, cmpType) {
        if (cmpType) { updateBoardMenu({ isOpen: true, cmpType: cmpType }) }

        else updateBoardMenu({ isOpen: true, cmpType: boardMenu.cmpType })
    }

    function onCloseMenuCmp() {
        updateBoardMenu({ isOpen: false, cmpType: boardMenu.cmpType })
    }

    function onCloseAvatarModal() {
        updateUserCmp({ isOpen: false, user: null, position: null })
    }

    function onToggleDashboard() {
        setIsViewDashboard(!isViewDashboard)
    }

    if (!board) return <div></div>
    return (
        <section
            className="board-details"
            style={{ backgroundImage: `url(${board.style.backgroundImage})` }}>

            <BoardFilter board={board} onSetBoard={onSetBoard} onOpenMenuCmp={onOpenMenuCmp} onToggleDashboard={onToggleDashboard} />

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
                    openQuickEdit={openQuickEdit}
                    onSetChecklistIdToEdit={onSetChecklistIdToEdit} />
            }

            <TaskFeatureDynamic checklistIdToEdit={checklistIdToEdit} />

            {isQuickEditOpen && <TaskQuickEdit board={board} quickEdit={quickEdit} closeQuickEdit={closeQuickEdit} onSetBoard={onSetBoard} />}

            <BoardMenuDynamic board={board} onOpenMenuCmp={onOpenMenuCmp} onCloseMenuCmp={onCloseMenuCmp} />
            {(userCmp.isOpen === true) && <AvatarModal member={userCmp.user} position={userCmp.position} onCloseAvatarModal={onCloseAvatarModal} />}
            {(isViewDashboard) && <Dashboard />}

            {filterCmpIsOpen && <Filter board={board} />}
        </section>
    )
}