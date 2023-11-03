import { boardService } from "../services/board.service.local"

export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const SET_GROUP = 'SET_GROUP'
export const SET_TASK = 'SET_TASK'
export const SET_CMP = 'SET_CMP'
export const SET_USER_CMP = 'SET_USER_CMP'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const SET_NEW_BOARD_MODAL = 'SET_NEW_BOARD_MODAL'
export const SET_BOARD_MENU = 'SET_BOARD_MENU'


const initialState = {
    boards: [],
    board: null,
    group: null,
    task: null,
    cmp: {type: '' , location: null},
    userCmp: {isOpen:false ,user:null, position: null},
    newBoardModal: {isOpen: false, location: null},
    boardMenu: {isOpen: false, cmpType: 'Menu'}
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    var boardt
    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case SET_BOARD:
            newState = { ...state, board: action.board }
            break
        case SET_GROUP:
            newState = { ...state, group: action.group }
            break
        case SET_TASK:
            newState = { ...state, task: action.task }
            break
        case SET_CMP:
            newState = { ...state, cmp: action.cmp }
            break
        case SET_USER_CMP:
            newState = { ...state, userCmp: action.userCmp }
            break
        case SET_NEW_BOARD_MODAL:
            newState = { ...state, newBoardModal: action.newBoardModal }
            break
        case SET_BOARD_MENU:
            newState = { ...state, boardMenu: action.boardMenu }
            break
        case REMOVE_BOARD:
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        case ADD_BOARD:
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case UPDATE_BOARD:
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break
        // case UPDATE_BOARD:
        //     boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
        //     newState = { ...state, boards }
        //     break
        case UNDO_REMOVE_BOARD:
            if (state.lastRemovedBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break

        default:
    }
    return newState
}
