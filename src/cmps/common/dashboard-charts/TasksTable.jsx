import { Members } from "../../task/TaskFeatures/Members";
import React from "react";

export function TasksTable({ tasksWithDueDate, board }) {

    return (
        <React.Fragment>
            <h1 className="time-left-title">Time left</h1>
            <table className="tasks-table" >
                <thead>
                    <tr className="table-header">
                        <th>Tasks with due date</th>
                        <th>TimeLeft</th>
                        <th>Members</th>
                    </tr>
                </thead>
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
         </React.Fragment>
    )
}