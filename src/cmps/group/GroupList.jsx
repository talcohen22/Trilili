
import { dragAndDropService } from "../../services/drag-and-drop.service.js"
import { AddGroupBtn } from "./AddGroupBtn";
import { GroupPreview } from "./GroupPreview";
import { TaskDetails } from "../task/TaskDetails";
import { useParams } from "react-router";
import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



export function GroupList({
    board,
    onAddNewGroup,
    onAddTask,
    onSetIsOpenTaskDetails,
    onSetBoard,
    onIsCheckDate,
    onIsExpandedLabels
}) {
    const { groups } = board
    const { taskId } = useParams()

    function onHandleDragEnd(result) {
        const updateBoard = dragAndDropService.handleDragEnd(result, board)
        onSetBoard(updateBoard)
    }


    return (

        <React.Fragment>
            <section className='groups-list-container'>
                <DragDropContext onDragEnd={onHandleDragEnd}>
                    <Droppable
                        droppableId='board'
                        direction='horizontal'
                        type='group'
                    >
                        {(provided) => ( // Fixed the syntax here
                            <ul className='groups-list' {...provided.droppableProps} ref={provided.innerRef}>
                                {Array.isArray(groups) &&
                                    groups.map((group, index) => (
                                        <Draggable
                                            key={group.id}
                                            draggableId={group.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    key={group.id}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps} // You should include dragHandleProps for dragging
                                                    ref={provided.innerRef}
                                                >
                                                    <GroupPreview style={{ overflow: 'hidden' }}
                                                        provided={provided}
                                                        board={board}
                                                        group={group}
                                                        onAddTask={onAddTask}
                                                        onSetIsOpenTaskDetails={onSetIsOpenTaskDetails}
                                                        onIsCheckDate={onIsCheckDate}
                                                        onIsExpandedLabels={onIsExpandedLabels} />
                                                
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <AddGroupBtn onAddNewGroup={onAddNewGroup} />
            </section>
            {taskId && <TaskDetails board={board} />}
        </React.Fragment>
    );
}

