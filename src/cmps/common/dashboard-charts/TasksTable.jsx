import { Members } from "../../task/TaskFeatures/Members";

export function TasksTable({ tasksWithDueDate, board }) {
    console.log(board);
    return (
        <table className="tasks-table" >
            <tr>
                <th>Tasks with due date</th>
                <th>TimeLeft</th>
                <th>Members</th>
            </tr>
            <tbody>
                {tasksWithDueDate.map((task, index) => (
                    <tr key={index}>
                        <td>{task.title}</td>
                        <td>{task.timeLeft}</td>
                        <td>{<Members board={board} task={task} group={'group'} />}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}