
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
    getEmptyTask
}
// debug trick
window.bs = boardService

const BOARDS = [
    {
        _id: "b101",
        title: "Robot dev proj",
        isStarred: false,
        archivedAt: 1589983468418,
        createdBy: {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1695056721201-078a656ef90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=400"
        },
        labels: [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Progress",
                "color": "#61bd33"
            }
        ],
        members: [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        groups: [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo"

                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
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
                        "archivedAt": 1589983468418,
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress", // monday
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
                            }
                        ],
                        "memberIds": ["u101"],
                        "labelIds": ["l101", "l102"],
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
        activities: [
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

        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        _id: "b102",
        title: "Marketing Campaign",
        isStarred: true,
        archivedAt: null,
        createdBy: {
            "_id": "u102",
            "fullname": "Alice Johnson",
            "imgUrl": "http://marketing-img"
        },
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1675889335685-4ac82f1e47ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=400"
        },
        labels: [
            {
                "id": "l103",
                "title": "Completed",
                "color": "#3498db"
            },
            {
                "id": "l104",
                "title": "In Progress",
                "color": "#e67e22"
            }
        ],
        members: [
            {
                "_id": "u103",
                "fullname": "Charlie Smith",
                "imgUrl": "http://charlie-img"
            },
            {
                "_id": "u104",
                "fullname": "David Brown",
                "imgUrl": "http://david-img"
            }
        ],
        groups: [
            {
                "id": "g103",
                "title": "Content Creation",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c105",
                        "title": "Write blog post"
                    },
                    {
                        "id": "c106",
                        "title": "Design infographics"
                    }
                ],
                "style": {}
            },
            {
                "id": "g104",
                "title": "Social Media",
                "tasks": [
                    {
                        "id": "c107",
                        "title": "Schedule tweets",
                        "archivedAt": null,
                        "status": "in-progress",
                        "priority": "medium",
                        "description": "Plan and schedule tweets for next week.",
                        "comments": [
                            {
                                "id": "XyZab",
                                "txt": "Don't forget to include the latest product launch details!",
                                "createdAt": 1654321234567,
                                "byMember": {
                                    "_id": "u103",
                                    "fullname": "Charlie Smith",
                                    "imgUrl": "http://charlie-img"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "aBcDe",
                                "title": "To-Do",
                                "todos": [
                                    {
                                        "id": "12345",
                                        "title": "Create graphics",
                                        "isDone": false
                                    },
                                    {
                                        "id": "67890",
                                        "title": "Write captions",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u103", "u104"],
                        "labelIds": ["l103", "l104"],
                        "dueDate": 1689876543210,
                        "byMember": {
                            "_id": "u103",
                            "username": "Charlie",
                            "fullname": "Charlie Smith",
                            "imgUrl": "http://charlie-img"
                        },
                        "style": {
                            "backgroundColor": "#e74c3c"
                        }
                    }
                ],
                "style": {}
            }
        ],
        activities: [
            {
                "id": "a102",
                "txt": "Created Campaign",
                "createdAt": 167890,
                "byMember": {
                    "_id": "u103",
                    "fullname": "Charlie Smith",
                    "imgUrl": "http://charlie-img"
                },
                "group": {
                    "id": "g103",
                    "title": "Content Creation"
                },
                "task": {
                    "id": "c105",
                    "title": "Write blog post"
                }
            }
        ],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        _id: "b103",
        title: "Project Management",
        isStarred: false,
        archivedAt: null,
        createdBy: {
            "_id": "u105",
            "fullname": "Eva Davis",
            "imgUrl": "http://evadavis-img"
        },
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1695983953103-17bce53a8138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=400"
        },
        labels: [
            {
                "id": "l105",
                "title": "High Priority",
                "color": "#e74c3c"
            },
            {
                "id": "l106",
                "title": "Low Priority",
                "color": "#f1c40f"
            }
        ],
        members: [
            {
                "_id": "u106",
                "fullname": "Frank Miller",
                "imgUrl": "http://frank-img"
            },
            {
                "_id": "u107",
                "fullname": "Grace Lee",
                "imgUrl": "http://grace-img"
            }
        ],
        groups: [
            {
                "id": "g105",
                "title": "Planning",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c108",
                        "title": "Define project scope"
                    },
                    {
                        "id": "c109",
                        "title": "Create timeline"
                    }
                ],
                "style": {}
            },
            {
                "id": "g106",
                "title": "Execution",
                "tasks": [
                    {
                        "id": "c110",
                        "title": "Implement feature A",
                        "archivedAt": null,
                        "status": "in-progress",
                        "priority": "high",
                        "description": "Develop and test feature A.",
                        "comments": [
                            {
                                "id": "Comment123",
                                "txt": "Don't forget to test backward compatibility.",
                                "createdAt": 1700000000000,
                                "byMember": {
                                    "_id": "u106",
                                    "fullname": "Frank Miller",
                                    "imgUrl": "http://frank-img"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "Checklist456",
                                "title": "To-Do",
                                "todos": [
                                    {
                                        "id": "Todo789",
                                        "title": "Write unit tests",
                                        "isDone": false
                                    },
                                    {
                                        "id": "Todo012",
                                        "title": "Document changes",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u106", "u107"],
                        "labelIds": ["l105", "l106"],
                        "dueDate": 1700000000000,
                        "byMember": {
                            "_id": "u106",
                            "username": "Frank",
                            "fullname": "Frank Miller",
                            "imgUrl": "http://frank-img"
                        },
                        "style": {
                            "backgroundColor": "#3498db"
                        }
                    }
                ],
                "style": {}
            }
        ],
        activities: [
            {
                "id": "a103",
                "txt": "Created Project",
                "createdAt": 169000,
                "byMember": {
                    "_id": "u106",
                    "fullname": "Frank Miller",
                    "imgUrl": "http://frank-img"
                },
                "group": {
                    "id": "g105",
                    "title": "Planning"
                },
                "task": {
                    "id": "c108",
                    "title": "Define project scope"
                }
            }
        ],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        _id: "b104",
        title: "Event Planning",
        isStarred: true,
        archivedAt: null,
        createdBy: {
            "_id": "u108",
            "fullname": "Michael Smith",
            "imgUrl": "http://michael-img"
        },
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1695983953103-17bce53a8138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=400"
        },
        labels: [
            {
                "id": "l107",
                "title": "High Priority",
                "color": "#e74c3c"
            },
            {
                "id": "l108",
                "title": "Medium Priority",
                "color": "#3498db"
            }
        ],
        members: [
            {
                "_id": "u109",
                "fullname": "Olivia Johnson",
                "imgUrl": "http://olivia-img"
            },
            {
                "_id": "u110",
                "fullname": "James Lee",
                "imgUrl": "http://james-img"
            }
        ],
        groups: [
            {
                "id": "g107",
                "title": "Preparation",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c113",
                        "title": "Select venue"
                    },
                    {
                        "id": "c114",
                        "title": "Create guest list"
                    }
                ],
                "style": {}
            },
            {
                "id": "g108",
                "title": "Execution",
                "tasks": [
                    {
                        "id": "c115",
                        "title": "Decorations setup",
                        "archivedAt": null,
                        "status": "in-progress",
                        "priority": "high",
                        "description": "Set up decorations and lighting for the event.",
                        "comments": [
                            {
                                "id": "Comment321",
                                "txt": "Ensure we have enough balloons for the entrance.",
                                "createdAt": 1750000000000,
                                "byMember": {
                                    "_id": "u109",
                                    "fullname": "Olivia Johnson",
                                    "imgUrl": "http://olivia-img"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "Checklist789",
                                "title": "To-Do",
                                "todos": [
                                    {
                                        "id": "Todo111",
                                        "title": "Hang banners",
                                        "isDone": false
                                    },
                                    {
                                        "id": "Todo222",
                                        "title": "Arrange tables",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u109", "u110"],
                        "labelIds": ["l107", "l108"],
                        "dueDate": 1750000000000,
                        "byMember": {
                            "_id": "u109",
                            "username": "Olivia",
                            "fullname": "Olivia Johnson",
                            "imgUrl": "http://olivia-img"
                        },
                        "style": {
                            "backgroundColor": "#f1c40f"
                        }
                    }
                ],
                "style": {}
            }
        ],
        activities: [
            {
                "id": "a104",
                "txt": "Created Event",
                "createdAt": 174000,
                "byMember": {
                    "_id": "u109",
                    "fullname": "Olivia Johnson",
                    "imgUrl": "http://olivia-img"
                },
                "group": {
                    "id": "g107",
                    "title": "Preparation"
                },
                "task": {
                    "id": "c113",
                    "title": "Select venue"
                }
            }
        ],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        _id: "b105",
        title: "Product Development",
        isStarred: false,
        archivedAt: null,
        createdBy: {
            "_id": "u112",
            "fullname": "Sophia Johnson",
            "imgUrl": "http://sophia-img"
        },
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1694802491008-a528234a9a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=400"
        },
        labels: [
            {
                "id": "l109",
                "title": "High Priority",
                "color": "#e74c3c"
            },
            {
                "id": "l110",
                "title": "Low Priority",
                "color": "#3498db"
            }
        ],
        members: [
            {
                "_id": "u113",
                "fullname": "Emma Lee",
                "imgUrl": "http://emma-img"
            },
            {
                "_id": "u114",
                "fullname": "Liam Smith",
                "imgUrl": "http://liam-img"
            }
        ],
        groups: [
            {
                "id": "g109",
                "title": "Planning",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c116",
                        "title": "Market Research"
                    },
                    {
                        "id": "c117",
                        "title": "Define Features"
                    }
                ],
                "style": {}
            },
            {
                "id": "g110",
                "title": "Development",
                "tasks": [
                    {
                        "id": "c118",
                        "title": "Prototype Design",
                        "archivedAt": null,
                        "status": "in-progress",
                        "priority": "high",
                        "description": "Create the initial prototype design.",
                        "comments": [
                            {
                                "id": "Comment456",
                                "txt": "Remember to include user feedback.",
                                "createdAt": 1780000000000,
                                "byMember": {
                                    "_id": "u113",
                                    "fullname": "Emma Lee",
                                    "imgUrl": "http://emma-img"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "Checklist123",
                                "title": "To-Do",
                                "todos": [
                                    {
                                        "id": "Todo333",
                                        "title": "Design wireframes",
                                        "isDone": false
                                    },
                                    {
                                        "id": "Todo444",
                                        "title": "Implement UI",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u113", "u114"],
                        "labelIds": ["l109", "l110"],
                        "dueDate": 1780000000000,
                        "byMember": {
                            "_id": "u113",
                            "username": "Emma",
                            "fullname": "Emma Lee",
                            "imgUrl": "http://emma-img"
                        },
                        "style": {
                            "backgroundColor": "#3498db"
                        }
                    }
                ],
                "style": {}
            }
        ],
        activities: [
            {
                "id": "a105",
                "txt": "Created Project",
                "createdAt": 177000,
                "byMember": {
                    "_id": "u113",
                    "fullname": "Emma Lee",
                    "imgUrl": "http://emma-img"
                },
                "group": {
                    "id": "g109",
                    "title": "Planning"
                },
                "task": {
                    "id": "c116",
                    "title": "Market Research"
                }
            }
        ],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
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
//         bgc: 'https://images.unsplash.com/photo-1695056721201-078a656ef90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=400',

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
        style: {},
    }
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        title: '',
        status: null, // monday
        priority: null,
        description: null,
        comments: [],
        checklists: [],
        memberIds: null,
        labelIds: null,
        dueDate: null,
        byMember: null,
        style: {

        }
    }
}