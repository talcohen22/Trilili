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
    getBoardGroupTask,
    getLabel,
    getLabels,
    getMembersTaskImgs,
    getTaskLabelsColors,
    getGroupIdx,
    getTaskIdx,
    getFormattedDate
}
// debug trick
window.bs = boardService

const BOARDS = [
    {
        "_id": "b101",
        "title": "Trilili project",
        "isStarred": true,
        "isExpandedLabels": false,
        "archivedAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "backgroundImage": "https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg"
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#4bce97",
                "colorName": 'green',
                "shade": ''
            },
            {
                "id": "l102",
                "title": "Important",
                "color": "#e2b203",
                "colorName": 'yellow',
                "shade": ''
            },
            {
                "id": "l103",
                "title": "Very important",
                "color": "#faa53d",
                "colorName": 'orange',
                "shade": ''
            },
            {
                "id": "l104",
                "title": "Most important",
                "color": "#f87462",
                "colorName": 'red',
                "shade": ''
            },
            {
                "id": "l107",
                "title": "CR",
                "color": "#e774bb",
                "colorName": 'pink',
                "shade": ''
            },
            {
                "id": "l105",
                "title": "Again",
                "color": "#9f8fef",
                "colorName": 'purple',
                "shade": ''
            },
            {
                "id": "l106",
                "title": "Help",
                "color": "#579dff",
                "colorName": 'blue',
                "shade": ''
            },
            {
                "id": "l108",
                "title": "Refactor",
                "color": "#60c6d2",
                "colorName": 'sky',
                "shade": ''
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Cohen",
                "username": "talcohen222",
                "imgUrl": "tal"
            },
            {
                "_id": "u102",
                "fullname": "Stav Cohen",
                "username": "stavcohen246",
                "imgUrl": "stav-black"
            },
            {
                "_id": "u103",
                "fullname": "Tamir Kol",
                "username": "tamirkol899",
                "imgUrl": "tamir"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Backlog-Server",
                "archivedAt": 1589983468400,
                "status": "in-progress",
                "priority": "low",
                "description": "need to check the backlog-Server",
                "labelIds": ["l101", "l102", "l105", "l106"],
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Create a server with express",
                        "createdAt": 1698249461229,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l101", "l102", "l103", "l108"],
                        "description": "install express before start",
                        "attachment": [
                            {
                                "fileName": "wood.jpg",
                                "url": "http://res.cloudinary.com/dug2dklcy/image/upload/v1698412953/wbdqdkxlzz0q0tfh4wfy.jpg"
                            },
                            {
                                "fileName": "trello 1.1.docx",
                                "url": "http://res.cloudinary.com/dug2dklcy/raw/upload/v1697983282/uhtxbewhqysvcrdudbm3.docx"
                            }
                        ],
                        "memberIds": ['u101', 'u102', 'u103'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://www.lobstershack.com.au/wp-content/uploads/2023/02/Sea-Lion-1080x675.jpg",
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": true
                        },
                        "startDate": 1698051014,
                        "isWatch": true,
                        "checklists": [
                            {
                                "id": "cl103",
                                "title": "CSS primary checklist",
                                "todos": [
                                    {
                                        "id": "td109",
                                        "title": "bug in taskDetails cmp",
                                        "isDone": true
                                    },
                                    {
                                        "id": "td110",
                                        "title": "bug in groupDetails cmp",
                                        "isDone": true
                                    },
                                    {
                                        "id": "td111",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": true
                                    },
                                ]
                            },
                            {
                                "id": "cl104",
                                "title": "CSS checklist",
                                "todos": [
                                    {
                                        "id": "td112",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": true
                                    },
                                    {
                                        "id": "td113",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                    },
                    {
                        "id": "c102",
                        "title": "Create backend services",
                        "createdAt": 1698249461230,
                        "archivedAt": 1589983468418,
                        "labelIds": ["l10", "l102", "l103", "l104", "l105", "l106", "l108", "l107"],
                        "attachment": [],
                        "memberIds": ['u103'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#26de81",
                            "cover": ""
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": false
                        },
                        "startDate": 1698051014,
                    },
                    {
                        "id": "c103",
                        "title": "Date modal approval",
                        "archivedAt": 1589983468413,
                        "labelIds": [],
                        "style": {
                            "backgroundColor": "#26de81",
                            "cover": ""
                        },
                        "dueDate": null,
                        "startDate": null,
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                    },
                    {
                        "id": "c104",
                        "title": "DB implementation",
                        "createdAt": 1698249461231,
                        "archivedAt": 1589983468412,
                        "labelIds": [],
                        "style": {
                            "backgroundColor": "#6cc3e0",
                            "cover": ""
                        },
                        "dueDate": null,
                        "startDate": null,
                        "attachment": [],
                        "memberIds": [],
                        "comments": [
                            {
                                "id": "cm101",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            },
                            {
                                "id": "cm102",
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
                                "id": "cl101",
                                "title": "check bugs",
                                "todos": [
                                    {
                                        "id": "td101",
                                        "title": "bug in taskDetails cmp",
                                        "isDone": false
                                    },
                                    {
                                        "id": "td102",
                                        "title": "bug in groupDetails cmp",
                                        "isDone": true
                                    },
                                    {
                                        "id": "td103",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                    }
                ],
                "style": {}
            },
            {

                "id": "g102",
                "title": "Backlog-client",
                "tasks": [
                    {
                        "id": "d103",
                        "title": "Planning the components tree",
                        "createdAt": 1698249461232,
                        "archivedAt": 1589983468418,
                        "labelIds": ["l10", "l102", "l103", "l104", "l105", "l106", "l108", "l107"],
                        "attachment": [],
                        "memberIds": ['u101', 'u102', 'u103'],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1672061014,
                            "isDone": false
                        },
                        "startDate": null,
                        "style": {
                            "backgroundColor": "#f87168",
                            "cover": ""
                        },
                    },
                    {
                        "id": "d104",
                        "title": "Build basic template",
                        "createdAt": 1698249461233,
                        "archivedAt": 1589983468418,
                        "labelIds": ["l108", "l104"],
                        "attachment": [],
                        "memberIds": ['u103'],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1698061014,
                            "isDone": false
                        },
                        "startDate": null,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        },
                    },
                    {
                        "id": "d105",
                        "title": "Adding npm libraries",
                        "createdAt": 1698249461234,
                        "archivedAt": 1589983468418,
                        "labelIds": ["l103", "l104", "l105", "l106"],
                        "attachment": [
                            {
                                "fileName": "trello 1.1.docx",
                                "url": "http://res.cloudinary.com/dug2dklcy/raw/upload/v1697983282/uhtxbewhqysvcrdudbm3.docx"
                            }
                        ],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/800px-Npm-logo.svg.png",
                        },
                        "dueDate": null,
                        "startDate": null,
                    },
                    {
                        "id": "d106",
                        "title": "Implement SAAS",
                        "createdAt": 1698249461238,
                        "archivedAt": 1589983468418,
                        "labelIds": [],
                        "attachment": [
                            {
                                "fileName": "trello 1.1.docx",
                                "url": "http://res.cloudinary.com/dug2dklcy/raw/upload/v1697983282/uhtxbewhqysvcrdudbm3.docx"
                            }
                        ],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://i0.wp.com/techprimelab.com/wp-content/uploads/2020/06/SCSS-or-CSS.jpg?fit=1024%2C576&ssl=1",
                        },
                        "dueDate": null,
                        "startDate": null,
                    },
                    {
                        "id": "d107",
                        "title": "Check user id - 125465",
                        "createdAt": 1698249461239,
                        "status": "in-progress",
                        "priority": "high",
                        "description": "this user have partial details",
                        "labelIds": [],
                        "attachment": [
                            {
                                "fileName": "trello 1.1.docx",
                                "url": "http://res.cloudinary.com/dug2dklcy/raw/upload/v1697983282/uhtxbewhqysvcrdudbm3.docx"
                            }
                        ],
                        "memberIds": ["u101"],
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png",
                        },
                        "dueDate": null,
                        "startDate": null,
                        "checklists": [],
                    }
                ],
                "style": {}
            },
            {
                "id": "g103",
                "title": "In development",
                "archivedAt": 1589983468400,
                "status": "in-progress",
                "priority": "low",
                "description": "",
                "labelIds": ["l101", "l102", "l105", "l106"],
                "tasks": [
                    {
                        "id": "d108",
                        "title": "Sanity test for new component",
                        "createdAt": 1698249461241,
                        "archivedAt": 1589983468418,
                        "labelIds": ["l102", "l106"],
                        "attachment": [
                            {
                                "fileName": "wood.jpg",
                                "url": "http://res.cloudinary.com/dug2dklcy/image/upload/v1698412953/wbdqdkxlzz0q0tfh4wfy.jpg"
                            },
                        ],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#9f8fef",
                            "cover": ""
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": true
                        },
                        "startDate": 1698051014,
                        "comments": [
                            {
                                "id": "cm102",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            },
                            {
                                "id": "cm103",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            },
                        ]
                    },
                    {
                        "id": "c109",
                        "title": "functional testing for app header",
                        "createdAt": 1698249461242,
                        "archivedAt": 1589983468414,
                        "style": {
                            "backgroundColor": "#fea362",
                            "cover": ""
                        },
                        "labelIds": ["l108", "l104"],
                        "attachment": [],
                        "memberIds": ['u101'],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1699961014,
                            "isDone": false
                        },
                        "startDate": null,
                    },
                    {
                        "id": "c110",
                        "title": "Connecting to PWA",
                        "createdAt": 1698249461245,
                        "archivedAt": 1589983468414,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://ionic.io/blog/wp-content/uploads/2016/05/what-is-pwa-img.png",
                        },
                        "dueDate": null,
                        "startDate": null,
                    },
                ],
                "style": {}
            },
            {
                "id": "g104",
                "title": "QA",
                "archivedAt": 1589983468400,
                "status": "in-progress",
                "priority": "low",
                "description": "",
                "labelIds": ["l102", "l105"],
                "tasks": [
                    {
                        "id": "c111",
                        "title": "Meeting with head manager for planning the code progress",
                        "createdAt": 1698249461246,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": ['u101', 'u103'],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": 1698051014,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        },
                    },
                    {
                        "id": "c112",
                        "title": "End day code review with all members",
                        "createdAt": 1698249461248,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l103", "l105"],
                        "attachment": [],
                        "memberIds": ['u103'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#579dff",
                            "cover": ""
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": false
                        },
                        "startDate": null,
                    },
                    {
                        "id": "c113",
                        "title": "Checking bug",
                        "createdAt": 1698249461265,
                        "archivedAt": 1589983468414,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://i0.wp.com/boingboing.net/wp-content/uploads/2022/08/bug.jpg?fit=1&resize=600%2C4000&ssl=1"
                        },
                        "dueDate": null,
                        "startDate": null,
                    },
                    {
                        "id": "c114",
                        "title": "Advices from head manager",
                        "createdAt": 1698249461267,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnHCT_iiFMufTpF4bhFHwRPxQkfxQle_3_Om4ryZE5P2gwaB9-39CV3SdQ_tZCYNBWOwI&usqp=CAU"
                        },
                        "dueDate": null,
                        "startDate": null,
                    },

                ],
                "style": {}
            },
            {
                "id": "g106",
                "title": "Code review",
                "archivedAt": 1589983468400,
                "status": "",
                "priority": "low",
                "description": "",
                "labelIds": ["l102", "l106"],
                "tasks": [
                    {
                        "id": "c119",
                        "title": "Implement homepage layout",
                        "createdAt": 1698249461246,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": ['u101', 'u103'],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": 1698051014,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        },
                    },
                    {
                        "id": "c120",
                        "title": "Code refactoring for performance",
                        "createdAt": 1698249461248,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l103", "l104", "l105", "l106", "l107"],
                        "attachment": [],
                        "memberIds": ['u103'],
                        "checklists": [],
                        "isWatch": true,
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://images.ctfassets.net/lzny33ho1g45/learn-html-css-p-img/12978ef50623cf76538cfe18e1011fc5/file.png?w=1520&fm=jpg&q=30&fit=thumb&h=760"
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": true
                        },
                        "startDate": null,
                        "checklists": [
                            {
                                "id": "cl106",
                                "title": "CSS primary checklist",
                                "todos": [
                                    {
                                        "id": "td115",
                                        "title": "bug in taskDetails cmp",
                                        "isDone": true
                                    },
                                    {
                                        "id": "td116",
                                        "title": "bug in groupDetails cmp",
                                        "isDone": false
                                    },
                                    {
                                        "id": "td117",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": true
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        "id": "c121",
                        "title": "Review coding style",
                        "createdAt": 1698249461246,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": ['u101', 'u103'],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1672061014,
                            "isDone": false
                        },
                        "startDate": null,
                        "style": {
                            "backgroundColor": "#e774bb",
                            "cover": ""
                        },
                    },
                ],
                "style": {}
            },
            {
                "id": "g105",
                "title": "Done",
                "archivedAt": 1589983468400,
                "status": "in-progress",
                "priority": "low",
                "description": "",
                "labelIds": ["l102", "l101"],
                "tasks": [
                    {
                        "id": "c115",
                        "title": "NPM tutorial",
                        "createdAt": 1698249461273,
                        "archivedAt": 1589983468414,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": ['u101', 'u102'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://kinsta.com/wp-content/uploads/2022/06/what-is-npm.png"
                        },
                        "dueDate": null,
                        "startDate": null,
                    },
                    {
                        "id": "c116",
                        "title": "CSS variables",
                        "createdAt": 1698249461275,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l101", "l102"],
                        "attachment": [],
                        "memberIds": ['u101'],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": null,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        },
                    },
                    {
                        "id": "c117",
                        "title": "CSS directory",
                        "createdAt": 1698249461276,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l101"],
                        "attachment": [],
                        "memberIds": ['u10'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        },
                        "dueDate": {
                            "timeStamp": 1699961014,
                            "isDone": true
                        },
                        "startDate": null,
                        "checklists": [
                            {
                                "id": "cl102",
                                "title": "CSS primary checklist",
                                "todos": [
                                    {
                                        "id": "td104",
                                        "title": "bug in taskDetails cmp",
                                        "isDone": true
                                    },
                                    {
                                        "id": "td105",
                                        "title": "bug in groupDetails cmp",
                                        "isDone": true
                                    },
                                    {
                                        "id": "td106",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": true
                                    },
                                ]
                            },
                            {
                                "id": "cl103",
                                "title": "CSS checklist",
                                "todos": [
                                    {
                                        "id": "td107",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": true
                                    },
                                    {
                                        "id": "td108",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": true
                                    }
                                ]
                            }
                        ],
                    },
                    {
                        "id": "c118",
                        "title": "Making mixins",
                        "createdAt": 1698249461279,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l104", "l106"],
                        "attachment": [
                            {
                                "fileName": "trello 1.1.docx",
                                "url": "http://res.cloudinary.com/dug2dklcy/raw/upload/v1697983282/uhtxbewhqysvcrdudbm3.docx"
                            }
                        ],
                        "memberIds": ['u101', 'u102', 'u103'],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": null,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        },
                    },
                ],
                "style": {}
            },
            {
                "id": "g107",
                "title": "Testing",
                "archivedAt": 1589983468400,
                "status": "",
                "priority": "low",
                "description": "",
                "labelIds": ["l102", "l106"],
                "tasks": [
                    {
                        "id": "c122",
                        "title": "Bug while adding task",
                        "createdAt": 1698249461248,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l103", "l105"],
                        "attachment": [],
                        "memberIds": ['u103'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#60c6d2",
                            "cover": ""
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": false
                        },
                        "startDate": null,
                    },
                    {
                        "id": "c123",
                        "title": "Bug while adding group",
                        "createdAt": 1698249461246,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": ['u101', 'u103'],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": 1698051014,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        },
                    },
                ],
                "style": {}
            },
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
                    "id": "c106",
                    "title": "Replace Logo"
                }
            }
        ],
        "cmpsOrder": ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        "_id": "b102",
        "title": "Sales and Marketing project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384751/707f35bc691220846678_pjgxni.svg",
        }
    },
    {
        "_id": "b103",
        "title": "Finance project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384735/d106776cb297f000b1f4_aixvzg.svg",
        }
    },
    {
        "_id": "b104",
        "title": "R&D project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384777/8ab3b35f3a786bb6cdac_f6yj4u.svg",
        }
    },
    {
        "_id": "b105",
        "title": "Human Resources project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384798/aec98becb6d15a5fc95e_monues.svg",
        }
    },
    {
        "_id": "b106",
        "title": "IT project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389855/92e67a71aaaa98dea5ad_ogsw1y.svg",
        }
    },
    {
        "_id": "b107",
        "title": "Engineering project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://images.unsplash.com/photo-1695056721201-078a656ef90b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000",
        }
    },
    {
        "_id": "b108",
        "title": "Design and Creative project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://images.unsplash.com/photo-1675889335685-4ac82f1e47ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000",
        }
    },
    {
        "_id": "b109",
        "title": "Strategy and Planning project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://images.unsplash.com/photo-1695983953103-17bce53a8138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000",
        }
    },
    {
        "_id": "b110",
        "title": "DevOps project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://images.unsplash.com/photo-1694802491008-a528234a9a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjk2NDA3OTE2fA&ixlib=rb-4.0.3&q=80&w=1000",
        }
    },
    {
        "_id": "b111",
        "title": "Logistics and Transportation project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://images.unsplash.com/photo-1617965215075-b1f768dc8a61?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0JTIwdmlld3xlbnwwfHwwfHx8MA%3D%3D",
        }
    },
    {
        "_id": "b112",
        "title": "Customer Support and Service project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": true,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://les.mitsubishielectric.co.uk/assets/Uploads/328a039bfe/Changing-view-from-space.jpg",
        }
    },
    {
        "_id": "b113",
        "title": "Facilities Management project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://static.vecteezy.com/system/resources/thumbnails/007/515/187/original/timelapse-of-beautiful-blue-sky-in-pure-daylight-with-puffy-fluffy-white-clouds-background-amazing-flying-through-beautiful-thick-fluffy-clouds-nature-and-cloudscape-concept-free-video.jpg",
        }
    },
    {
        "_id": "b114",
        "title": "Product Management project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zdGF0aWMvaW1hZ2VzL3dlYnNpdGUvMjAyMi0wNS9mbDUwOTQ5MjU4NjkyLWltYWdlLWtwd2IyN2dmLmpwZw.jpg?s=lD6yhtA_S-iWCgZVDqhOYS4pFBmM6tB6Fsdh3bvBNro",
        }
    },
    {
        "_id": "b115",
        "title": "Business Development project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://media.cntraveller.com/photos/611bf0b8f6bd8f17556db5e4/1:1/w_2000,h_2000,c_limit/gettyimages-1146431497.jpg",
        }
    },
    {
        "_id": "b116",
        "title": "Health and Safety project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://contents.mediadecathlon.com/s901275/k$8f51d8612b8dc765e3b89173d46a056e/1920x0/2808pt1703/5616xcr2808/Tropical-trek-in-Costa-Rica.jpeg?format=auto",
        }
    },
    {
        "_id": "b117",
        "title": "Public Relations project",
        "activities": [],
        "archivedAt": null,
        "cmpsOrder": [],
        "createdBy": null,
        "groups": [],
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://www.pbs.org/wnet/nature/files/2019/07/Super-Hummingbirds-2-1280x675.jpg",
        }
    },
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
            backgroundColor: '',
            cover: ''
        },

        startDate: null,
        dueDate: null,
        attachment: [],
        createdAt: Date.now()
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

    return { board, group, task }
}

async function getLabel(boardId, labelId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    const label = board.labels.find(label => label.id === labelId)
    return label
}

async function getLabels(boardId, txt) {
    const newTxt = txt.toLowerCase()
    const board = await storageService.get(STORAGE_KEY, boardId)

    const labels = board.labels.filter(label => {
        return label.shade.toLowerCase().includes(newTxt) ||
            label.title.toLowerCase().includes(newTxt) ||
            label.colorName.toLowerCase().includes(newTxt)
    })
    return labels
}


function getMembersTaskImgs(board, group, task) {
    var membersImg = []
    task.memberIds.forEach(memberId => {
        board.members.forEach(member => {
            if (member._id === memberId) membersImg.push(member.imgUrl)
        })
    })

    return membersImg
}

function getTaskLabelsColors(board, task) {
    var labelsColors = []
    task.labelIds.forEach(labelId => {
        board.labels.forEach(label => {
            if (label.id === labelId) labelsColors.push({ color: label.color, title: label.title })
        })
    })

    return labelsColors
}


export function getGroupIdx(board, groupId) {
    return board.groups.findIndex(g => g.id === groupId)
}

function getFormattedDate(timestamp) {
    const currentDate = new Date()

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ]
    const dateInMilliseconds = timestamp * 1000
    const date = new Date(dateInMilliseconds)
    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    var formattedDate = `${month} ${day}${currentDate.getFullYear() !== year ? ', ' + year : ''}`

    return { date, formattedDate }
}

// function getGroupIdx(board, group) {
//     return board.groups.findIndex(g => g.id === group.id)
// }

export function getTaskIdx(group, taskId) {
    return group.tasks.findIndex(t => t.id === taskId)
}