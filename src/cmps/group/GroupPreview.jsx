import { useState } from "react";
import { DotsSvg, GenerateTemplateBtnSvg, PlusBtnAddListSvg } from "../svg/ImgSvg";
import { TaskList } from "../task/TaskList";
import { AddTaskModal } from "../task/AddTaskModal";
export function GroupPreview({ group, onAddTask }) {
    const [inputValue, setInputValue] = useState(group.title)
    const [isOnAddTask, setIsOnAddTask] = useState(false)

    function handleInputChange(ev) {
        setInputValue(ev.target.value)
    }
    function handleAddTask() {
        setIsOnAddTask(true)
    }

    function onCloseAddTaskModal() {
        setIsOnAddTask(false)
    }

    return (
        <section className="group-card">

            <div className="group-header flex justify-space-b align-center ">
                <input
                    className="group-title"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={(ev) => ev.target.classList.add("focused")}
                    onBlur={(ev) => ev.target.classList.remove("focused")}
                />
                <button className="group-btn flex justify-center align-center">
                    <DotsSvg />
                </button>
            </div>

            <div className="group-tasks">
                <TaskList group={group} />
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
            {isOnAddTask && <AddTaskModal group={group} onAddTask={onAddTask} onCloseAddTaskModal={onCloseAddTaskModal} />}
        </section>
    )
}

