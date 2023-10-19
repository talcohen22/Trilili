import { boardService } from "../services/board.service.local.js";
import { store } from '../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, SET_CMP, SET_GROUP, SET_TASK, UNDO_REMOVE_BOARD, UPDATE_BOARD } from "./board.reducer.js";
import { utilService } from "../services/util.service.js";

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({
            type: SET_BOARDS,
            boards
        })

    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getActionRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function updateBoardGroupTaskType(boardId, groupId, taskId, type, location) {
    if (boardId === null) {
        store.dispatch({ type: SET_BOARD, board: null })
        store.dispatch({ type: SET_GROUP, group: null })
        store.dispatch({ type: SET_TASK, task: null })
        store.dispatch({ type: SET_CMP, cmp: {type: '' , location: null} })
    }
    else {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const cmp = { type, location }
        store.dispatch({ type: SET_BOARD, board: board })
        store.dispatch({ type: SET_GROUP, group: group })
        store.dispatch({ type: SET_TASK, task: task })
        store.dispatch({ type: SET_CMP, cmp: cmp })
    }
}

export async function updateCmp(cmp){
    store.dispatch({ type: SET_CMP, cmp: cmp })
}

export async function updateGroup(board, group, field, value) {
    try {
        const idx = board.groups.findIndex(g => g.id === group.id)
        board.groups[idx][field] = value
        await updateBoard(board)
    } catch (err) {
        console.log('Cannot update group', err)
        throw err
    }
}

export async function addTaskAttach(board, group, task, attach) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)
        board.groups[gIdx].tasks[tIdx].attachment.push(attach)
        await updateBoard(board)
    } catch (err) {
        console.log('Cannot add attachment', err)
        throw err
    }
}

export async function setLabelNotChecked(board, group, task, labelId) {
    try {
        const newLabelIds = task.labelIds.filter(lId => lId !== labelId)

        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].labelIds = newLabelIds

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot remove label from task', err)
        throw err
    }
}

export async function setLabelChecked(board, group, task, labelId) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].labelIds.push(labelId)

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot remove label from task', err)
        throw err
    }
}

export async function editLabel(board, group, task, labelId, color, title) {
    try {
        const newLabel = {
            id: utilService.makeId(),
            title,
            color: color.color,
            colorName: color.colorName,
            shade: color.shade
        }

        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        if (task.labelIds.includes(labelId)) { //edit
            const labelIdx = board.labels.findIndex(label => label.id === labelId)
            board.labels[labelIdx].title = title
            board.labels[labelIdx].color = color.color
            board.labels[labelIdx].colorName = color.colorName
            board.labels[labelIdx].shade = color.shade

        }
        else { //add
            board.labels.push(newLabel)
            board.groups[gIdx].tasks[tIdx].labelIds.push(newLabel.id)
        }

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot add label', err)
        throw err
    }
}

export async function removeLabel(board, group, task, labelId) {
    const gIdx = getGroupIdx(board, group)
    const tIdx = getTaskIdx(group, task)
    const lTaskIdx = getLabelIdsIndex(task, labelId)

    const lBoardIdx = board.labels.findIndex(label => label.id === labelId)
    board.labels.splice(lBoardIdx, 1)

    board.groups[gIdx].tasks[tIdx].labelIds.splice(lTaskIdx, 1)

    await updateBoard(board)
}

export async function addChecklist(board, group, task, title) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        const checklist = {
            id: utilService.makeId(),
            title,
            todos: []
        }

        board.groups[gIdx].tasks[tIdx].checklists.push(checklist)

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot add checklist', err)
        throw err
    }
}

export async function EditTaskMember(board, group, task, memberId) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        if (board.groups[gIdx].tasks[tIdx].memberIds.includes(memberId)) {
            const memberIdx = task.memberIds.findIndex(mId => mId === memberId)
            board.groups[gIdx].tasks[tIdx].memberIds.splice(memberIdx, 1)
        }
        else {
            board.groups[gIdx].tasks[tIdx].memberIds.push(memberId)
        }
        await updateBoard(board)

    } catch (err) {
        console.log('Cannot edit member', err)
        throw err
    }
}

function getGroupIdx(board, group) {
    return board.groups.findIndex(g => g.id === group.id)
}

function getTaskIdx(group, task) {
    return group.tasks.findIndex(t => t.id === task.id)
}

function getLabelIdsIndex(task, labelId) {
    return task.labelIds.findIndex(lId => lId === labelId)
}

// export async function addBoard(board) {
//     try {
//         const savedBoard = await boardService.save(board)
//         console.log('Added Board', savedBoard)
//         store.dispatch(getActionAddBoard(savedBoard))
//         return savedBoard
//     } catch (err) {
//         console.log('Cannot add board', err)
//         throw err
//     }
// }

export function addBoard(board) {
    return boardService.save(board)
        .then(savedBoard => {
            // store.dispatch({type: SET_CURR_BOARD, board: savedBoard})
            store.dispatch({ type: ADD_BOARD, board: savedBoard })
            return savedBoard
        })
        .catch(err => {
            console.log('Cannot save board', err)
            throw err
        })
}

export function updateBoard(board) {
    return boardService.save(board)
        .then(savedBoard => {
            store.dispatch(getActionUpdateBoard(savedBoard))
            return savedBoard
        })
        .catch(err => {
            console.log('Cannot save board', err)
            throw err
        })
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {
    store.dispatch({
        type: REMOVE_BOARD,
        boardId
    })
    showSuccessMsg('Board removed')

    boardService.remove(boardId)
        .then(() => {
            console.log('Server Reported - Deleted Succesfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove board')
            console.log('Cannot load boards', err)
            store.dispatch({
                type: UNDO_REMOVE_BOARD
            })
        })
}

export async function setIsCheckDate(board, group, task) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)
        board.groups[gIdx].tasks[tIdx].dueDate.isDone = !board.groups[gIdx].tasks[tIdx].dueDate.isDone
        await updateBoard(board)
    } catch (err) {
        console.log('Cannot remove label from task', err)
        throw err
    }
}

export async function setIsExpandedLabels(board) {
    try {
        board.isExpandedLabels = !board.isExpandedLabels
        await updateBoard(board)
    } catch (err) {
        console.log('Cannot remove label from task', err)
        throw err
    }
}