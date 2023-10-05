
import { useEffect, useLayoutEffect, useState } from "react";
import { DotsSvg, GenerateTemplateBtnSvg, PlusBtnAddListSvg } from "../svg/ImgSvg";
import { TaskList } from "../task/TaskList";
import { AddTaskModal } from "../task/AddTaskModal";
export function GroupPreview({ group, onAddTask }) {
    const [isOnAddTask, setIsOnAddTask] = useState(false)
    const [groupTitle, setGroupTitle] = useState(group.title)

    // const [isCuttingScreen, setIsCuttingScreen] = useState(false);


    // useLayoutEffect(() => {
    //     // Check if any of the group-cards are taller than the viewport.
    //     const groupCards = document.querySelectorAll(".group-card");

    //     for (const groupCard of groupCards) {
    //         const viewportHeight = window.innerHeight;
    //         const groupCardHeight = groupCard.offsetHeight;
    //         if (groupCardHeight > viewportHeight) {
    //             setIsCuttingScreen(true);
    //             console.log(true)
    //             return; // If at least one is cutting the screen, set the state and exit the loop.
    //         }
    //     }

    //     // If none of the group-cards are cutting the screen.
    //     setIsCuttingScreen(false);
    // }, []);

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
        <section className='group-card'>

            <div className="group-header flex justify-space-b align-center ">
                <input
                    className="group-title"
                    value={groupTitle}
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
            {isOnAddTask &&
                <AddTaskModal
                    group={group}
                    onAddTask={onAddTask}
                    onCloseAddTaskModal={onCloseAddTaskModal}
                />}


        </section>
    )
}

