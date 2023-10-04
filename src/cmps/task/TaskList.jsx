import { TaskPreview } from "./TaskPreview"


export function TaskList(){
    const tasks=[
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
    ]
    return(
        <section className="task-list-container">
        <ul className="task-list flex column">
            {tasks.map((task)=>(
                <li className="list-item" key={task.id}>
                    <TaskPreview task={task}/>
                </li>
            ))}
        </ul>
        </section>
    )
}