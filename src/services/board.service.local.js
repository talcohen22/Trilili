
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
    getGroupTask,
    getLabel,
    getLabels
}
// debug trick
window.bs = boardService

const BOARDS = [
    {
        "_id": "b101",
        "title": "Trilili project",
        "isStarred": false,
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
                "title": "",
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
                "title": "",
                "color": "#faa53d",
                "colorName": 'orange',
                "shade": ''
            },
            {
                "id": "l104",
                "title": "CR",
                "color": "#f87462",
                "colorName": 'red',
                "shade": ''
            },
            {
                "id": "l107",
                "title": "",
                "color": "#e774bb",
                "colorName": 'pink',
                "shade": ''
            },
            {
                "id": "l105",
                "title": "",
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
                "title": "",
                "color": "#60c6d2",
                "colorName": 'sky',
                "shade": ''
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Cohen",
                "imgUrl": "tal"
            },
            {
                "_id": "u102",
                "fullname": "Stav Cohen",
                "imgUrl": "stav-black"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Backlog-Server",
                "archivedAt": 1589983468400,
                "status": "in-progress",
                "priority": "low",
                "description": "description",
                "labelIds": ["l101", "l102", "l105", "l106"],
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Create a server with express",
                        "archivedAt": 1589983468414,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": ['u102'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://www.lobstershack.com.au/wp-content/uploads/2023/02/Sea-Lion-1080x675.jpg",
                        }
                    },
                    {
                        "id": "c102",
                        "title": "Create backend services",
                        "archivedAt": 1589983468418,
                        "labelIds": ["l10", "l102", "l103", "l104", "l105", "l106", "l108", "l107"],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#26de81",
                            "cover": "#26de81"
                        },
                    },
                    {
                        "id": "c103",
                        "title": "Date modal approval",
                        "archivedAt": 1589983468413,
                        "labelIds": [],
                        "style": {
                            "backgroundColor": "#26de81",
                            "cover": "#26de81"
                        },
                        "dueDate": {
                            "timeStamp": 1702061014,
                            "isDone": false
                        },
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                    },
                    {
                        "id": "c104",
                        "title": "DB implementation",
                        "archivedAt": 1589983468412,
                        "labelIds": [],
                        "style": {
                            "backgroundColor": "#6cc3e0",
                            "cover": "#6cc3e0"
                        },
                        "dueDate": {
                            "timeStamp": 1692061014,
                            "isDone": false
                        },
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
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
                                        "isDone": true
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
                        "archivedAt": 1589983468418,
                        "labelIds": ["l10", "l102", "l103", "l104", "l105", "l106", "l108", "l107"],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1696061014,
                            "isDone": false
                        },
                        "style": {
                            "backgroundColor": "#f87168",
                            "cover": "#f87168"
                        },
                    },
                    {
                        "id": "d104",
                        "title": "Build basic template",
                        "archivedAt": 1589983468418,
                        "labelIds": ["l103", "l104"],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1698061014,
                            "isDone": false
                        },
                    },
                    {
                        "id": "d105",
                        "title": "Adding npm libraries",
                        "archivedAt": 1589983468418,
                        "labelIds": ["l103", "l104", "l105", "l106"],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://trello.com/1/cards/651c005f1738798047c7fd5b/attachments/651c00bd111368598b586279/download/npm.png",
                        }
                    },
                    {
                        "id": "d106",
                        "title": "Implement SAAS",
                        "archivedAt": 1589983468418,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://trello.com/1/cards/651c01062962bafe88c816a7/attachments/651c01361d684fd84072e13e/download/231-sass-logo-sass.png",
                        }
                    },
                    {
                        "id": "d107",
                        "title": "Check user id - 125465",
                        "status": "in-progress",
                        "priority": "high",
                        "description": "description",
                        "attachment": [],
                        "memberIds": ["u101"],
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://trello.com/1/cards/651c01e29ae065f6e43d8f03/attachments/651c020196c5fb62cc35bdf3/download/219969.png",
                        }
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
                "description": "description",
                "labelIds": ["l101", "l102", "l105", "l106"],
                "tasks": [
                    {
                        "id": "d108",
                        "title": "Sanity test for new component",
                        "archivedAt": 1589983468418,
                        "labelIds": ["l102", "l106"],
                        "attachment": [],
                        "memberIds": [],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#9f8fef",
                            "cover": "#9f8fef"
                        },
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
                        "archivedAt": 1589983468414,
                        "style": {
                            "backgroundColor": "#fea362",
                            "cover": "#fea362"
                        },
                        "labelIds": ["l103", "l104"],
                        "attachment": [],
                        "memberIds": ['u102'],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1699961014,
                            "isDone": false
                        },
                    },
                    {
                        "id": "c110",
                        "title": "",
                        "archivedAt": 1589983468414,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": ['u102'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://trello.com/1/cards/651c03270cfcb4617c6352e9/attachments/651c03746e39588ea43be583/download/benefit_of_PWA.png",
                        }
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
                "description": "description",
                "labelIds": ["l102", "l105"],
                "tasks": [
                    {
                        "id": "c111",
                        "title": "Meeting with head manager for planning the code progress",
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": ['u102'],
                        "checklists": [],
                    },
                    {
                        "id": "c112",
                        "title": "End day code review with all members",
                        "archivedAt": 1589983468414,
                        "labelIds": ["l103", "l105"],
                        "attachment": [],
                        "memberIds": ['u102'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "#579dff",
                            "cover": "#579dff"
                        },
                    },
                    {
                        "id": "c113",
                        "title": "Checking bug",
                        "archivedAt": 1589983468414,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": ['u102'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2011/09/thumb_720_450_bug-on-computer-chip_shutterstock_4027501.jpg"
                        },
                    },
                    {
                        "id": "c114",
                        "title": "Advices from head manager",
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l105"],
                        "attachment": [],
                        "memberIds": ['u102', 'u104'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://www.youthemployment.org.uk/dev/wp-content/uploads/2018/07/achievement-3408115_640-600x287.jpg"
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
                "description": "description",
                "labelIds": ["l102", "l101"],
                "tasks": [
                    {
                        "id": "c115",
                        "title": "NPM tutorial",
                        "archivedAt": 1589983468414,
                        "labelIds": [],
                        "attachment": [],
                        "memberIds": ['u102', 'u104'],
                        "checklists": [],
                        "style": {
                            "backgroundColor": "",
                            "cover": "https://www.syncfusion.com/blogs/wp-content/uploads/2023/04/How-You-Should-Treat-NPM-Audit-Results.png"
                        },
                    },
                    {
                        "id": "c116",
                        "title": "CSS variables",
                        "archivedAt": 1589983468414,
                        "labelIds": ["l102", "l101"],
                        "attachment": [],
                        "memberIds": ['u102', 'u104'],
                        "checklists": [],
                    },
                    {
                        "id": "c117",
                        "title": "CSS directory",
                        "archivedAt": 1589983468414,
                        "labelIds": ["l101"],
                        "attachment": [],
                        "memberIds": ['u102', 'u104'],
                        "checklists": [],
                        "dueDate": {
                            "timeStamp": 1699961014,
                            "isDone": true
                        },
                        "checklists": [
                            {
                                "id": "cl102",
                                "title": "CSS directory checklist",
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
                                "title": "CSS directory checklist",
                                "todos": [
                                    {
                                        "id": "td107",
                                        "title": "bug in boardDetails cmp",
                                        "isDone": false
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
                        "archivedAt": 1589983468414,
                        "labelIds": ["l104", "l106"],
                        "attachment": [],
                        "memberIds": ['u102', 'u104'],
                        "checklists": [],
                    },
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
            "backgroundImage": "https://media-cdn.tripadvisor.com/media/photo-s/15/48/9f/c9/a-great-view-of-good.jpg",
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
        "isStarred": false,
        "labels": [],
        "members": [],
        "style": {
            "backgroundImage": "https://hips.hearstapps.com/hmg-prod/images/beautiful-landscape-view-of-fuji-mountain-in-royalty-free-image-1623253648.jpg?crop=1xw:1xh;center,top&resize=980:*",
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
            "backgroundImage": "https://www.skyview.com/dynamic-media/assets/images/home/animated-masthead-sky-optimized.jpg?width=2560&k=4XJaRhknSIht3XnyH6T2oQ&gravity=center&v=responsiveImage",
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
            "backgroundImage": "https://verdonsecret.com/wp-content/uploads/2019/03/sillans-la-cascade-la-cascade.jpg",
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

async function getGroupTask(boardId, groupId, taskId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)

    return { group, task }
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

