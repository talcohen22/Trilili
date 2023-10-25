

export function DatesData({ task }) {
    console.log(task);

    const datesTitle = (task.startDate && !task.dueDate) ? 'Start date' : (!task.startDate && task.dueDate) ? 'Due date' : 'Dates'

    return (
        <div className="dates-data">
            <p>{datesTitle}</p>
        </div>
    )
}