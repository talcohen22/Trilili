const chatGptPrompt ={

}

export function createBoardPrompt(projectSubject) { 
//     const createBoardPrompt=`
//     {
//         "title":"project board name",
//         "activities":[],
//         "createdBy":{"id":1,"fullname":"Trilili","imgUrl":""},
//         "groups":[
//             {
//                 "id": "grp1",
//                 "title": "tasks category",
//                 "tasks": [
//                     {
//                         "id": "task1",
//                         "title": "Select Destination Cities",
//                         "byMember":null,
//                         "status": null,
//                         "priority": null,
//                         "description": "Choose the cities you want to visit during your Europe trip.",
//                         "comments": [],
//                         "checklists": [
//                             {
//                                 "checklistId": "chk1",
//                                 "title": "City Selection Checklist",
//                                 "todos": [
//                                     {
//                                         "id": "todo1",
//                                         "title": "Research top cities to visit",
//                                         "isDone": false
//                                     },
//                                     {
//                                         "id": "todo2",
//                                         "title": "Consider local attractions and activities",
//                                         "isDone": false
//                                     }
//                                 ]
//                             }
//                         ],
//                         "attachment": [],
//                         "memberIds": [],
//                         "style": {
//                             "backgroundColor": "",
//                             "cover": ""
//                         },
//                         "labelIds": [],
//                         "createdAt":${Date.now()},
//                         "dueDate":null,
//                         "startDate":null,
//                     }
//                 ]
//             }
//         ],
//         "isExpandedLabels":false,
//         "isStarred":false,
//         "labels": [
//                 {
//                     "id": "l101",
//                     "title": "Done",
//                     "color": "#4bce97",
//                     "colorName": "green",
//                     "shade": ""
//                 },
//                 {
//                     "id": "l102",
//                     "title": "Important",
//                     "color": "#e2b203",
//                     "colorName": "yellow",
//                     "shade": ""
//                 },
//                 {
//                     "id": "l103",
//                     "title": "Very important",
//                     "color": "#faa53d",
//                     "colorName": "orange",
//                     "shade": ""
//                 },
//                 {
//                     "id": "l104",
//                     "title": "Most important",
//                     "color": "#f87462",
//                     "colorName": "red",
//                     "shade": ""
//                 },
//                 {
//                     "id": "l107",
//                     "title": "CR",
//                     "color": "#e774bb",
//                     "colorName": "pink",
//                     "shade": ""
//                 },
//                 {
//                     "id": "l105",
//                     "title": "Again",
//                     "color": "#9f8fef",
//                     "colorName": "purple",
//                     "shade": ""
//                 },
//                 {
//                     "id": "l106",
//                     "title": "Help",
//                     "color": "#579dff",
//                     "colorName": "blue",
//                     "shade": ""
//                 },
//                 {
//                     "id": "l108",
//                     "title": "Refactor",
//                     "color": "#60c6d2",
//                     "colorName": "sky",
//                     "shade": ""
//                 }
//         ],
//         "members":[],
//         "style":{"backgroundImage":"https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg"},
//     }
//     according to this format can you create me a json of a new board, with the following requirements:
//     1. i want you to create a board json of ${projectSubject} project. 
//     2. create 4 groups, each one has a title that describes all the tasks under it.
//     3. each group sould have an array of 3 tasks
//     4. some of the tasks have checklist array with todos array inside, and some of the tasks have an ampty array under the checklist field.
//     5. each checklist should have minumum  0 todos, and maximum 6 todos. i want that the avarage todos per checklist to be 3.
//     6. some of the tasks has a description field with string that describe the task, and some have an empty value ("") under the fiels description.
//     7. all off the groups, tasks and the fields under each should be related to the title of the board.
//     8. in each task.style.backgroundColor give me some color for example "#4bce97" dont put caluculations inside the value of the field. each task.style.backgroundColor should have a different color or an empty string.
//     9. task.style.cover should be an empty string. 
//     10. each task has createdAt field, please fill it with the current timestamp. dont fill with Date.now(), but give me current timeStamp integer
//     11.  the board.labels should contains all the labels like in this current board
//     12. in your answer dont put any comment.
//     13.  i want that the board.style.background to be one of this options: 
//     14. fill the task.startDate and task.dueDate.timeStamp, task.dueDate.isDone
//     15. in the board.style.backgroung put this: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384798/aec98becb6d15a5fc95e_monues.svg'`
// return createBoardPrompt
// }
// const createBoardPrompt=`{"title":"project board name","activities":[],"createdBy":{"id":1,"fullname":"Trilili","imgUrl":""},
//     "groups":[
//         {
//             "id": "grp1",
//             "title": "tasks category",
//             "tasks": [
//                 {
//                     "id": "task1",
//                     "title": "Select Destination Cities",
//                     "byMember":null,
//                     "status": null,
//                     "priority": null,
//                     "description": "Choose the cities you want to visit during your Europe trip.",
//                     "comments": [],
//                     "checklists": [
//                         {
//                             "checklistId": "chk1",
//                             "title": "City Selection Checklist",
//                             "todos": [
//                                 {
//                                     "id": "todo1",
//                                     "title": "Research top cities to visit",
//                                     "isDone": false
//                                 },
//                                 {
//                                     "id": "todo2",
//                                     "title": "Consider local attractions and activities",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "attachment": [],
//                     "memberIds": [],
//                     "style": {
//                         "backgroundColor": "",
//                         "cover": ""
//                     },
//                     "labelIds": [],
//                     "createdAt":${Date.now()},
//                     "dueDate":null,
//                     "startDate":null,
//                 }
//             ]
//         }
//     ],
//     "isExpandedLabels":false,
//     "isStarred":false,
//     "labels": [
//             {
//                 "id": "l101",
//                 "title": "Done",
//                 "color": "#4bce97",
//                 "colorName": "green",
//                 "shade": ""
//             },
//             {
//                 "id": "l102",
//                 "title": "Important",
//                 "color": "#e2b203",
//                 "colorName": "yellow",
//                 "shade": ""
//             },
//             {
//                 "id": "l103",
//                 "title": "Very important",
//                 "color": "#faa53d",
//                 "colorName": "orange",
//                 "shade": ""
//             },
//             {
//                 "id": "l104",
//                 "title": "Most important",
//                 "color": "#f87462",
//                 "colorName": "red",
//                 "shade": ""
//             },
//             {
//                 "id": "l107",
//                 "title": "CR",
//                 "color": "#e774bb",
//                 "colorName": "pink",
//                 "shade": ""
//             },
//             {
//                 "id": "l105",
//                 "title": "Again",
//                 "color": "#9f8fef",
//                 "colorName": "purple",
//                 "shade": ""
//             },
//             {
//                 "id": "l106",
//                 "title": "Help",
//                 "color": "#579dff",
//                 "colorName": "blue",
//                 "shade": ""
//             },
//             {
//                 "id": "l108",
//                 "title": "Refactor",
//                 "color": "#60c6d2",
//                 "colorName": "sky",
//                 "shade": ""
//             }
//     ],
//     "members":[],
//     "style":{"backgroundImage":"https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg"},
// }
// according to this format can you create me a json of a new board, with the following requirements:
// 1. i want you to create a board json of ${projectSubject} project.
// return createBoardPrompt
// }
const createBoardPrompt =`{ "title": "project board name", "activities": [], "createdBy": { "id": 1, "fullname": "Trilili", "imgUrl": "" }, "groups": [{ "id": "grp1", "title": "tasks category", "tasks": [{ "id": "task1", "title": "Select Destination Cities", "byMember": null, "status": null, "priority": null, "description": "Choose the cities you want to visit during your Europe trip.", "comments": [], "checklists": [{ "checklistId": "chk1", "title": "City Selection Checklist", "todos": [{ "id": "todo1", "title": "Research top cities to visit", "isDone": false }, { "id": "todo2", "title": "Consider local attractions and activities", "isDone": false }] }], "attachment": [], "memberIds": [], "style": { "backgroundColor": "", "cover": "" }, "labelIds": [], "createdAt": Date.now(), "dueDate": null, "startDate": null, }] }], "isExpandedLabels": false, "isStarred": false, "labels": [{ "id": "l101", "title": "Done", "color": "#4bce97", "colorName": "green", "shade": "" }, { "id": "l102", "title": "Important", "color": "#e2b203", "colorName": "yellow", "shade": "" }, { "id": "l103", "title": "Very important", "color": "#faa53d", "colorName": "orange", "shade": "" }, { "id": "l104", "title": "Most important", "color": "#f87462", "colorName": "red", "shade": "" }, { "id": "l107", "title": "CR", "color": "#e774bb", "colorName": "pink", "shade": "" }, { "id": "l105", "title": "Again", "color": "#9f8fef", "colorName": "purple", "shade": "" }, { "id": "l106", "title": "Help", "color": "#579dff", "colorName": "blue", "shade": "" }, { "id": "l108", "title": "Refactor", "color": "#60c6d2", "colorName": "sky", "shade": "" }], "members": [], "style": { "backgroundImage": "https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg" } } ,according to this format can you create me a json of a new board, with the following requirements:1. i want you to create a board json of ${projectSubject} project .2. create 3 groups, each one has a title that describes all the tasks under it.3. each group sould have an array of 2 tasks`
return createBoardPrompt
}