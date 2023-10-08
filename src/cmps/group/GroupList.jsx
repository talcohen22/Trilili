import { TaskDetails } from "../task/TaskDetails";
import { AddGroupBtn } from "./AddGroupBtn";
import { GroupPreview } from "./GroupPreview";
import { useParams } from "react-router";
import React from 'react';

export function GroupList({
    board,
    onAddNewGroup,
    onAddTask,
    onSetIsOpenTaskDetails,
    onIsCheckDate,
    onIsExpandedLabels }) {

    const { groups } = board
    const { taskId } = useParams()

    return (
        <React.Fragment>
            <section className='groups-list-container'>
                <ul className="groups-list">
                    {groups.map((group) => (
                        <li key={group.id}>
                            <GroupPreview
                                board={board}
                                group={group}
                                onAddTask={onAddTask}
                                onSetIsOpenTaskDetails={onSetIsOpenTaskDetails}
                                onIsCheckDate={onIsCheckDate}
                                onIsExpandedLabels={onIsExpandedLabels} />
                        </li>
                    ))}
                </ul>
                <AddGroupBtn onAddNewGroup={onAddNewGroup} />
            </section>
            {taskId && <TaskDetails />}
        </React.Fragment>
    )
}
