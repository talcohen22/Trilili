import { TaskPreview } from "./TaskPreview"


export function TaskList({
    group,
    onSetIsOpenTaskDetails,
    labelsPaletteBoard,
    onIsCheckDate,
    isExpandedLabels,
    onIsExpandedLabels }) {
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
                            onIsCheckDate={onIsCheckDate}
                            onIsExpandedLabels={onIsExpandedLabels}
                            isExpandedLabels={isExpandedLabels}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}