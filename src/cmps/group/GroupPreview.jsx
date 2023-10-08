import { useState, useRef, useEffect } from "react";
import { DotsSvg, GenerateTemplateBtnSvg, PlusBtnAddListSvg } from "../svg/ImgSvg";
import { TaskList } from "../task/TaskList";
import { AddTaskModal } from "../task/AddTaskModal";
import { boardService } from "../../services/board.service.local";

export function GroupPreview({ board, group, onAddTask, onSetIsOpenTaskDetails,provided }) {

    const [isOnAddTask, setIsOnAddTask] = useState(false)
    const [groupTitle, setGroupTitle] = useState(group.title)

function handleInputChange({ target }) {
        const { value } = target
        setGroupTitle(value)
    }

    function handleAddTask({ target }) {
        setIsOnAddTask(true)
        const newBoard = boardService.setBoardGroups(board, group, groupTitle)
        boardService.save({ ...board, groups: newBoard.groups })
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') handleAddTask(ev)
    }

    function onCloseAddTaskModal() {
        setIsOnAddTask(false)
    }

    return (
        <section className='group-card'>

            <div className="group-header flex justify-space-b align-center " {...provided.dragHandleProps}>
                <input
                    // ref={inputRef}
                    // onFocus={() => setInputActive(true)}
                    // onBlur={() => setInputActive(false)}
                    className="group-title"
                    value={groupTitle}
                    onChange={handleInputChange}
                    // onFocus={(ev) => ev.target.classList.add("focused")}
                    // onBlur={(ev) => ev.target.classList.remove("focused")}
                    onKeyDown={handleKeyDown}
                />
                <button className="group-btn flex justify-center align-center">
                    <DotsSvg />
                </button>
            </div>

            <div className="group-tasks">
                <TaskList group={group} onSetIsOpenTaskDetails={onSetIsOpenTaskDetails} />
            </div>

            {!isOnAddTask &&
                <div className="group-footer flex justify-center align-center">
                    <button
                        onClick={handleAddTask}
                        className="group-btn add-task-btn flex align-center">
                        <PlusBtnAddListSvg />
                        Add a card
                    </button>


                    <button className="group-btn flex justify-center align-center">
                        <GenerateTemplateBtnSvg />
                    </button>
                </div>
            }
            {isOnAddTask &&
                <AddTaskModal
                    group={group}
                    onAddTask={onAddTask}
                    onCloseAddTaskModal={onCloseAddTaskModal}
                />}


        </section>
    )
}