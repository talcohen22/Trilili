import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw err
    }
}

///////////
const boards = [
    {
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
                "colorName": "green",
                "shade": ""
            },
            {
                "id": "l102",
                "title": "Important",
                "color": "#e2b203",
                "colorName": "yellow",
                "shade": ""
            },
            {
                "id": "l103",
                "title": "Very important",
                "color": "#faa53d",
                "colorName": "orange",
                "shade": ""
            },
            {
                "id": "l104",
                "title": "Most important",
                "color": "#f87462",
                "colorName": "red",
                "shade": ""
            },
            {
                "id": "l107",
                "title": "CR",
                "color": "#e774bb",
                "colorName": "pink",
                "shade": ""
            },
            {
                "id": "l105",
                "title": "Again",
                "color": "#9f8fef",
                "colorName": "purple",
                "shade": ""
            },
            {
                "id": "l106",
                "title": "Help",
                "color": "#579dff",
                "colorName": "blue",
                "shade": ""
            },
            {
                "id": "l108",
                "title": "Refactor",
                "color": "#60c6d2",
                "colorName": "sky",
                "shade": ""
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
                        "memberIds": ["u101", "u102", "u103"],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1672061014,
                            "isDone": false
                        },
                        "startDate": null,
                        "style": {
                            "backgroundColor": "#f87168",
                            "cover": ""
                        }
                    },
                    {
                        "id": "d104",
                        "title": "Build basic template",
                        "createdAt": 1698249461233,
                        "archivedAt": 1589983468418,
                        "labelIds": ["l108", "l104"],
                        "attachment": [],
                        "memberIds": ["u103"],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1698061014,
                            "isDone": false
                        },
                        "startDate": null,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        }
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
                            "cover": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/800px-Npm-logo.svg.png"
                        },
                        "dueDate": null,
                        "startDate": null
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
                            "cover": "https://i0.wp.com/techprimelab.com/wp-content/uploads/2020/06/SCSS-or-CSS.jpg?fit=1024%2C576&ssl=1"
                        },
                        "dueDate": null,
                        "startDate": null
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
                        "checklists": []
                    }

                ],
                "style": {}
            },
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
                        "memberIds": ["u101", "u102", "u103"],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://www.lobstershack.com.au/wp-content/uploads/2023/02/Sea-Lion-1080x675.jpg"
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
                                    }
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
                        ]
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
                            "cover": "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png"
                        },
                        "dueDate": null,
                        "startDate": null,
                        "checklists": []
                    },
                    {
                        "id": "c104",
                        "title": "DB implementation",
                        "createdAt": 1698249461231,
                        "archivedAt": 1589983468412,
                        "labelIds": ["l10", "l102", "l103", "l104", "l105", "l106", "l108", "l107"],
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
                        ]
                    },
                    {
                        "id": "c102",
                        "title": "Create backend services",
                        "createdAt": 1698249461230,
                        "archivedAt": 1589983468418,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": ["u103"],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#26de81",
                            "cover": ""
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": false
                        },
                        "startDate": 1698051014
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
                            }
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
                            }
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
                        "memberIds": ["u101"],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1699961014,
                            "isDone": false
                        },
                        "startDate": null
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
                            "cover": "https://ionic.io/blog/wp-content/uploads/2016/05/what-is-pwa-img.png"
                        },
                        "dueDate": null,
                        "startDate": null
                    }
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
                        "memberIds": ["u101", "u103"],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": 1698051014,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        }
                    },
                    {
                        "id": "c112",
                        "title": "End day code review with all members",
                        "createdAt": 1698249461248,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l103", "l105"],
                        "attachment": [],
                        "memberIds": ["u103"],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#579dff",
                            "cover": ""
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": false
                        },
                        "startDate": null
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
                            "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZudQRmdWvQEy3gIcpytKZj_0NIshlwC6gHqBLGEJXjFbNiutDjGnMIiUyLcBNzjPh6s&usqp=CAU"
                        },
                        "dueDate": null,
                        "startDate": null
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
                            "cover": "https://projectriskcoach.com/wp-content/uploads/2019/12/Meeting-Problems.png"
                        },
                        "dueDate": null,
                        "startDate": null
                    }
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
                        "memberIds": ["u101", "u103"],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": 1698051014,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        }
                    },
                    {
                        "id": "c120",
                        "title": "Code refactoring for performance",
                        "createdAt": 1698249461248,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l103", "l104", "l105", "l106", "l107"],
                        "attachment": [],
                        "memberIds": ["u103"],
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
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "c121",
                        "title": "Review coding style",
                        "createdAt": 1698249461246,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": ["u101", "u103"],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1672061014,
                            "isDone": false
                        },
                        "startDate": null,
                        "style": {
                            "backgroundColor": "#e774bb",
                            "cover": ""
                        }
                    }
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
                        "memberIds": ["u101", "u102"],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://kinsta.com/wp-content/uploads/2022/06/what-is-npm.png"
                        },
                        "dueDate": null,
                        "startDate": null
                    },
                    {
                        "id": "c116",
                        "title": "CSS variables",
                        "createdAt": 1698249461275,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l101", "l102"],
                        "attachment": [],
                        "memberIds": ["u101"],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": null,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        }
                    },
                    {
                        "id": "c117",
                        "title": "CSS directory",
                        "createdAt": 1698249461276,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l101"],
                        "attachment": [],
                        "memberIds": ["u10"],
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
                                    }
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
                        ]
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
                        "memberIds": ["u101", "u102", "u103"],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": null,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
                        }
                    }
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
                        "memberIds": ["u103"],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#60c6d2",
                            "cover": ""
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": false
                        },
                        "startDate": null
                    },
                    {
                        "id": "c123",
                        "title": "Bug while adding group",
                        "createdAt": 1698249461246,
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": ["u101", "u103"],
                        "checklists": [],
                        "dueDate": null,
                        "startDate": 1698051014,
                        "style": {
                            "backgroundColor": "",
                            "cover": ""
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
                    "id": "c106",
                    "title": "Replace Logo"
                }
            }
        ],
        "cmpsOrder": ["StatusPicker", "MemberPicker", "DatePicker"]
    }
]