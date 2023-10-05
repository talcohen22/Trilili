import { TaskPreview } from "./TaskPreview"


export function TaskList({ group }) {
    const { tasks } = group
    return (
        <section className="task-list-container">
            <ul className="task-list flex column">
                {tasks.map((task) => (
                    <li key={task.id} className="list-item">
                        <TaskPreview task={task} />
                    </li>
                ))}
            </ul>
        </section>
    )
}