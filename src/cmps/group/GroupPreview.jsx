
import { useState, useRef, useEffect } from "react";
import { DotsSvg, GenerateTemplateBtnSvg, PlusBtnAddListSvg } from "../svg/ImgSvg";
import { TaskList } from "../task/TaskList";
import { AddTaskModal } from "../task/AddTaskModal";
import { boardService } from "../../services/board.service.local";
import { updateGroup } from "../../store/board.actions";
import { GroupActionsModal } from "../group/GroupActionsModal"

export function GroupPreview({ board, group, onAddTask, onSetIsOpenTaskDetails, RemoveGroup }) {

    const [isOnAddTask, setIsOnAddTask] = useState(false)
    const [groupTitle, setGroupTitle] = useState(group.title)
    const [isOnUsingAction, setIsOnUsingAction] = useState(false)
    const [groupActionPostion,setGroupActionPosition]=useState({left:null,top:null})
    // const [inputActive, setInputActive] = useState(false);
    // const inputRef = useRef(null);

    // const handleClickOutside = (event) => {
    //     if (inputRef.current && !inputRef.current.contains(event.target)) {
    //       setInputActive(false);
    //     }
    //   };

    //   useEffect(() => {
    //     document.addEventListener('click', handleClickOutside);

    //     return () => {
    //       document.removeEventListener('click', handleClickOutside);
    //     };
    //   }, []);

    function handleInputChange({ target }) {
        const { value } = target
        setGroupTitle(value)
    }

    function handleAddTask({ target }) {
        setIsOnAddTask(true)
        updateGroup(board, group, 'title', groupTitle)
    }

    function handleUsingAction(ev) {
        console.log(ev);
        const positionX= ev.pageX
        const positionY= ev.pageX
        console.log(positionX,positionY) 
        setGroupActionPosition({left:positionX,top:positionY})
        setIsOnUsingAction(true)
    }

    function handleClose() {
        setIsOnUsingAction(false)
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') handleAddTask(ev)
    }

    function onCloseAddTaskModal() {
        setIsOnAddTask(false)
    }

    const labelsPaletteBoard = board.labels
    return (
        <section className='group-card'>

            <div className="group-header flex justify-space-b align-center ">
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
                <button className="group-btn flex justify-center align-center" onClick={handleUsingAction}>
                    <DotsSvg />
                </button>
                <div>
                    {isOnUsingAction && <GroupActionsModal groupActionPostion={groupActionPostion}
                        group={group}
                        handleClose={handleClose}
                        RemoveGroup={RemoveGroup}
                    />}
                </div>
            </div>

            <div className="group-tasks">
                <TaskList
                    group={group}
                    onSetIsOpenTaskDetails={onSetIsOpenTaskDetails}
                    labelsPaletteBoard={labelsPaletteBoard} />
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

