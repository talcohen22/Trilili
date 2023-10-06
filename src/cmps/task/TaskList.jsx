import { TaskPreview } from "./TaskPreview"


export function TaskList({ group, onSetIsOpenTaskDetails, labelsPaletteBoard }) {
    const { tasks } = group
    return (
        <section className="task-list-container">
            <ul className="task-list flex column">
                {tasks.map((task) => (
                    <li key={task.id} className="list-item">
                        <TaskPreview
                            task={task}
                            group={group}
                            onSetIsOpenTaskDetails={onSetIsOpenTaskDetails}
                            labelsPaletteBoard={labelsPaletteBoard}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}