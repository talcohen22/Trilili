import { TaskPreview } from "./TaskPreview"

import { Component } from 'react'
import { ReactDOM } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
export function TaskList({
    board,
    group,
    onSetIsOpenTaskDetails,
    labelsPaletteBoard,
    onIsCheckDate,
    isExpandedLabels,
    onIsExpandedLabels }) {
    const { tasks } = group
    return (
        <section className="task-list-container">
            <Droppable droppableId={group.id} type='task'>
                {(provided) => (
                    <ul className="task-list flex column" {...provided.droppableProps} ref={provided.innerRef} style={{ 'overflow:': 'hidden' }}>
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <li key={task.id} className="list-item"
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <TaskPreview
                                            task={task}
                                            group={group}
                                            board={board}
                                            onSetIsOpenTaskDetails={onSetIsOpenTaskDetails}
                                            labelsPaletteBoard={labelsPaletteBoard}
                                            onIsCheckDate={onIsCheckDate}
                                            onIsExpandedLabels={onIsExpandedLabels}
                                            isExpandedLabels={isExpandedLabels}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>

        </section>
    )
}