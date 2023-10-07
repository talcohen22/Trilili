
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg,
    getEmptyGroup,
    getEmptyTask,
    setBoardGroups,
    // getEmptyLabelsPalette
    getBoardGroupTask
}
// debug trick
window.bs = boardService

const BOARDS = [

    {
        "_id": "b101",
        "title": "Robot dev proj",
        "isStarred": false,
        "archivedAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "backgroundImage": "https://images.unsplash.com/photo-1695056721201-078a656ef90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000"
        },
        "labels": [
            {
                "id": "l101",
                "title": "Remote",
                "color": "#4bce97"
            },
            {
                "id": "l102",
                "title": "Important",
                "color": "#e2b203"
            },
            {
                "id": "l103",
                "title": "For fun",
                "color": "#faa53d"
            },
            {
                "id": "l104",
                "title": "CR",
                "color": "#f87462"
            },
            {
                "id": "l105",
                "title": "Delay",
                "color": "#9f8fef"
            },
            {
                "id": "l106",
                "title": "Help",
                "color": "#579dff"
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468400,
                "status": "in-progress",
                "priority": "low",
                "description": "description",
                "labelIds": ["l104", "l105", "l102"],
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "archivedAt": 1589983468414,
                        "style": {
                            "backgroundColor": "#26de81"
                        }
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "archivedAt": 1589983468418
                    },
                    {
                        "id": "c103",
                        "title": "Add Boarder",
                        "archivedAt": 1589983468413,
                        "style": {
                            "backgroundColor": "#26de81"
                        }
                    },
                    {
                        "id": "c104",
                        "title": "Add Bgc",
                        "archivedAt": 1589983468412

                    }
                ],
                "style": {}
            },
            {

                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress",
                        "priority": "high",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            },
                            {
                                "id": "12hmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212js",
                                        "title": "To Do 1",
                                        "isDone": true
                                    },
                                    {
                                        "id": "wew32",
                                        "title": "To Do 2",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],

                        "memberIds": ["u101"],
                        "labelIds": ["l101", "l102", "l105", "l106"],
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "backgroundColor": "#26de81"
                        }
                    }
                ],
                "style": {}
            }
        ],

        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "group": {
                    "id": "g101",
                    "title": "Urgent Stuff"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ],
        "cmpsOrder": ["StatusPicker", "MemberPicker", "DatePicker"]
    }
]


_createBoards()

async function query(filterBy = {}) {
    var boards = await storageService.query(STORAGE_KEY)
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, { ...getEmptyBoard(), title: board.title, style: { backgroundImage: board.style.backgroundImage } })
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

// function getEmptyBoard() {
//     return {

//         title: 'Board-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),

//         title: '',
//         bgc: 'https://images.unsplash.com/photo-1695056721201-078a656ef90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000',

//     }
// }

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = BOARDS
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}

async function createTask(boardId, groupId, taskToAdd) {
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex((group) => group.id === groupId)
        let task = taskToAdd
        task[id] = utilService.makeId()
        board.group[groupIdx].tasks.push(task)
        return save(board)
    } catch (err) {

    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {title: 'Jira G', price: 980}).then(x => console.log(x))
function getEmptyBoard() {
    return {
        title: "",
        isStarred: false,
        archivedAt: null,
        createdBy: null,
        style: { backgroundImage: "" },
        labels: [],
        members: [],
        groups: [],
        activities: [],
        cmpsOrder: []
    }
}


function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: '',
        tasks: [],
    }
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        title: '',
        status: null, // monday
        priority: null,
        description: '',
        comments: [],
        checklists: [],
        memberIds: [],
        labelIds: [],
        dueDate: null,
        byMember: null,
        style: {
            backgroundColor: ''
        }
    }
}

function setBoardGroups(board, group, title) {
    const idx = board.groups.findIndex(g => g.id === group.id)
    board.groups[idx].title = title
    return board
}

// function getEmptyLabelsPalette() {
//     return [
//         {
//             id: "l101",
//             title: "",
//             color: "#4bce97",
//         },
//         {
//             id: "l102",
//             title: "",
//             color: "#e2b203",
//         },
//         {
//             id: "l103",
//             title: "",
//             color: "#faa53d",
//         },
//         {
//             id: "l104",
//             title: "",
//             color: "#f87462",
//         },
//         {
//             id: "l105",
//             title: "",
//             color: "#9f8fef",
//         },
//         {
//             id: "l106",
//             title: "",
//             color: "#579dff",
//         }
//     ];
// }

async function getBoardGroupTask(boardId, groupId, taskId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    return {board, group, task}
}


