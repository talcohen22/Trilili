import { TaskPreview } from "./TaskPreview"

import { useState } from 'react'
import { ReactDOM } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { GenerateTemplateBtnSvg, PlusBtnAddListSvg } from "../svg/ImgSvg"
import { AddTaskModal } from "./AddTaskModal"
export function TaskList({
    board,
    group,
    onSetIsOpenTaskDetails,
    labelsPaletteBoard,
    onIsCheckDate,
    isExpandedLabels,
    onIsExpandedLabels,
    openQuickEdit,
    isOnAddTask,
    onCloseAddTaskModal,
    onAddTask,
    handleClose,
    updateGroup,
    groupTitle }) {
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
                                            openQuickEdit={openQuickEdit}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {isOnAddTask &&
                            <AddTaskModal
                                isOnAddTask={isOnAddTask}
                                group={group}
                                onAddTask={onAddTask}
                                onCloseAddTaskModal={onCloseAddTaskModal}
                            />}
                    </ul>
                )}
            </Droppable>

        </section>
    )
}