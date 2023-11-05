import { boardService } from "../services/board.service.local.js";
import { store } from '../store/store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, SET_BOARD_MENU, SET_CMP, SET_USER_CMP, SET_GROUP, SET_NEW_BOARD_MODAL, SET_TASK, UNDO_REMOVE_BOARD, UPDATE_BOARD, SET_FILTER_CMP_IS_OPEN, SET_FILTER_BY } from "./board.reducer.js";
import { utilService } from "../services/util.service.js";
import { userService } from "../services/user.service.js";

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

export function setFilterByAction(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setFilterCmpIsOpen(value) {
    store.dispatch({ type: SET_FILTER_CMP_IS_OPEN, filterCmpIsOpen: value })
}

export async function loadBoards() {
    try {
        const { filterBy } = store.getState().boardModule
        const boards = await boardService.query(filterBy)
        store.dispatch({
            type: SET_BOARDS,
            boards
        })

    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function addActivity(board, group, task, txt) {
    try {
        const groupToAdd = { id: group.id, title: group.title }
        const taskToAdd = task ? { id: task.id, title: task.title } : null
        const user = userService.getLoggedinUser()
        if (user) delete user.password

        const activity = {
            id: utilService.makeId(),
            txt,
            createdAt: Date.now(),
            byMember: user,
            group: groupToAdd,
            task: taskToAdd
        }

        board.activities.unshift(activity)

        return await updateBoard(board)



    } catch (err) {
        console.log('Cannot add activity', err)
        throw err
    }
}

export async function updateBoardBgc(board, bgc) {
    try {
        board.style.backgroundImage = bgc
        await updateBoard(board)

    } catch (err) {
        console.log('Cannot update bgc board', err)
        throw err
    }
}

export async function updateBoardUsStarred(board) {
    try {
        board.isStarred = !board.isStarred
        await updateBoard(board)

    } catch (err) {
        console.log('Cannot update isStarred board', err)
        throw err
    }
}

export async function updateColorBackground(board, group, task, color) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].style.backgroundColor = color
        board.groups[gIdx].tasks[tIdx].style.cover = ''

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot update background color', err)
        throw err
    }
}

export async function updatePhotoBackground(board, group, task, photo) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].style.backgroundColor = ''
        board.groups[gIdx].tasks[tIdx].style.cover = photo

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot update background photo', err)
        throw err
    }
}

export async function removeCover(board, group, task) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].style.backgroundColor = ''
        board.groups[gIdx].tasks[tIdx].style.cover = ''

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot remove cover', err)
        throw err
    }
}

export async function removeAttachment(board, group, task, attachIdx) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].attachment.splice(attachIdx, 1)

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot delete attachment', err)
        throw err
    }
}

export async function updateTodo(board, group, task, checklist, todoId, field, value) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)
        const clIdx = getChecklistIdx(task, checklist.id)
        const todoIdx = getTodoIdx(checklist, todoId)

        board.groups[gIdx].tasks[tIdx].checklists[clIdx].todos[todoIdx][field] = value

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot update todo', err)
        throw err
    }
}

export async function updateChecklistTitle(board, group, task, checklist, title) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)
        const clIdx = getChecklistIdx(task, checklist.id)

        board.groups[gIdx].tasks[tIdx].checklists[clIdx].title = title

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot update checklist title', err)
        throw err
    }
}

export async function addChecklistTodo(board, group, task, checklist, title) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)
        const clIdx = getChecklistIdx(task, checklist.id)

        const todo = { id: utilService.makeId(), title, isDone: false }
        board.groups[gIdx].tasks[tIdx].checklists[clIdx].todos.push(todo)

        return await updateBoard(board)
    }
    catch (err) {
        console.log('Cannot add todo', err)
        throw err
    }
}

export async function removeTodo(board, group, task, checklist, todoId) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)
        const clIdx = getChecklistIdx(task, checklist.id)
        const todoIdx = getTodoIdx(checklist, todoId)

        board.groups[gIdx].tasks[tIdx].checklists[clIdx].todos.splice(todoIdx, 1)

        await updateBoard(board)
    }
    catch (err) {
        console.log('Cannot remove todo', err)
        throw err
    }
}

export async function saveDescription(board, group, task, description) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].description = description

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot save description', err)
        throw err
    }
}

export async function setIsWatch(board, group, task) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].isWatch = !board.groups[gIdx].tasks[tIdx].isWatch

        await updateBoard(board)

    } catch (err) {
        console.log('Cannot set isWatch', err)
        throw err
    }
}

export async function saveDate(board, group, task, startDate, dueDate) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].startDate = startDate

        if (task.dueDate && dueDate) board.groups[gIdx].tasks[tIdx].dueDate = { timeStamp: dueDate.timeStamp, isDone: task.dueDate.isDone }
        else board.groups[gIdx].tasks[tIdx].dueDate = dueDate

        await updateBoard(board)
    } catch (err) {
        console.log('Cannot save date', err)
        throw err
    }
}

export async function removeDate(board, group, task) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)

        board.groups[gIdx].tasks[tIdx].startDate = null
        board.groups[gIdx].tasks[tIdx].dueDate = null

        await updateBoard(board)
    } catch (err) {
        console.log('Cannot remove date', err)
        throw err
    }
}

export async function removeChecklist(board, group, task, checklistId) {
    try {
        const gIdx = getGroupIdx(board, group)
        const tIdx = getTaskIdx(group, task)
        const clIdx = getChecklistIdx(task, checklistId)

        board.groups[gIdx].tasks[tIdx].checklists.splice(clIdx, 1)

        return await updateBoard(board)

    } catch (err) {
        console.log('Cannot remove checklist', err)
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
        store.dispatch({ type: SET_CMP, cmp: { type: '', location: null } })
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

export function updateBoardMenu(boardMenu) {
    store.dispatch({ type: SET_BOARD_MENU, boardMenu: boardMenu })
}

export async function updateNewBoardModal(newBoardModal) {
    store.dispatch({ type: SET_NEW_BOARD_MODAL, newBoardModal: newBoardModal })
}

export async function updateCmp(cmp) {
    store.dispatch({ type: SET_CMP, cmp: cmp })
}

export async function updateUserCmp(userCmp) {
    store.dispatch({ type: SET_USER_CMP, userCmp: userCmp })
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

        return await updateBoard(board)

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

function getChecklistIdx(task, checklistId) {
    return task.checklists.findIndex(cl => cl.id === checklistId)
}

function getTodoIdx(checklist, todoId) {
    return checklist.todos.findIndex(todo => todo.id === todoId)
}

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