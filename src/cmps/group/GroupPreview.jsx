import { useState, useRef } from "react";
import { DotsSvg, EyeSvg, GenerateTemplateBtnSvg, PlusBtnAddListSvg } from "../svg/ImgSvg";
import { TaskList } from "../task/TaskList";
import { AddTaskModal } from "../task/AddTaskModal";
import { updateGroup } from "../../store/board.actions";
import { GroupActionsModal } from "../group/GroupActionsModal"

export function GroupPreview({
    board,
    group,
    onAddTask,
    onSetIsOpenTaskDetails,
    onIsCheckDate,
    onIsExpandedLabels,
    removeGroup,
    removeTasks,
    saveCopiedGroup,
    onSetBoard,
    onMoveBoards,
    openQuickEdit,
    provided }) {

    const [isOnAddTask, setIsOnAddTask] = useState(false)
    const [isOnGroupAddTask, setIsOnGroupAddTask] = useState(false)
    const [groupTitle, setGroupTitle] = useState(group.title)
    const [isOnUsingAction, setIsOnUsingAction] = useState(false)
    const [groupActionPostion, setGroupActionPosition] = useState({ left: null, top: null })
    const buttonRef = useRef(null)
    const [isDynamicCmpOpen, setIsDynamicCmpOpen] = useState(false)
    const [dynamicParams, setDynamicParams] = useState({})

    function handleInputChange({ target }) {
        const { value } = target
        setGroupTitle(value)
    }

    function handleAddTask(position) {
        (position === 'START') ? setIsOnGroupAddTask(true) : setIsOnAddTask(true)
        handleClose()
        updateGroup(board, group, 'title', groupTitle)
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            ev.target.blur()
            handleAddTask(ev)
        }
    }

    function onCloseAddTaskModal() {
        setIsOnAddTask(false)
        setIsOnGroupAddTask(false)
    }

    function handleUsingAction() {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const positionX = buttonRect.x
        const positionY = buttonRect.bottom + 7
        setGroupActionPosition({ left: positionX, top: positionY })
        setIsOnUsingAction(true)
    }

    function handleClose() {
        setIsOnUsingAction(false)
    }

    function openGroupActionModal() {
        setIsOnUsingAction(true)
    }

    function handleWatchGroup() {
        let updatedGroup = { ...group }
        if (group.isWatch === undefined) updatedGroup = { ...group, isWatch: true }
        else updatedGroup = { ...group, isWatch: !group.isWatch }
        const groupIdx = board.groups.findIndex(item => item.id === group.id)
        board.groups[groupIdx] = updatedGroup
        onSetBoard(board)
        handleClose()
    }

    function handleDynamicCmpOpen(cpmType) {
        setDynamicParams(cpmType)
        setIsDynamicCmpOpen(true)
    }

    function handleIsDynamicCmpOpen(value) {
        setIsDynamicCmpOpen(value)
    }

    const { isExpandedLabels } = board
    const labelsPaletteBoard = board.labels

    return (
        <section className='group-card'>

            <div className="group-header flex justify-space-b align-center " {...provided.dragHandleProps}>

                <input
                    className="group-title"
                    value={groupTitle}
                    onChange={handleInputChange}
                    onBlur={handleAddTask}
                    onKeyDown={handleKeyDown} />

                {group.isWatch && <span className="watch"><EyeSvg /></span>}

                <button className="group-btn dots flex justify-center align-center" ref={buttonRef} onClick={handleUsingAction}>
                    <DotsSvg />
                </button>

                {isOnUsingAction && <GroupActionsModal
                    groupActionPostion={groupActionPostion}
                    group={group}
                    handleClose={handleClose}
                    removeGroup={removeGroup}
                    handleAddTask={handleAddTask}
                    handleDynamicCmpOpen={handleDynamicCmpOpen}
                    saveCopiedGroup={saveCopiedGroup}
                    board={board}
                    onSetBoard={onSetBoard}
                    onMoveBoards={onMoveBoards}
                    handleWatchGroup={handleWatchGroup}
                    removeTasks={removeTasks}
                    openGroupActionModal={openGroupActionModal} />}

            </div>

            {isOnGroupAddTask &&
                <AddTaskModal
                    isOnAddTask={isOnAddTask}
                    group={group}
                    onAddTask={onAddTask}
                    onCloseAddTaskModal={onCloseAddTaskModal} />}

            <div className="group-tasks">
                <TaskList
                    board={board}
                    group={group}
                    onSetIsOpenTaskDetails={onSetIsOpenTaskDetails}
                    labelsPaletteBoard={labelsPaletteBoard}
                    onIsCheckDate={onIsCheckDate}
                    onIsExpandedLabels={onIsExpandedLabels}
                    isExpandedLabels={isExpandedLabels}
                    openQuickEdit={openQuickEdit} />
            </div>

            {!isOnAddTask &&
                <div className={(!isOnGroupAddTask) ? "group-footer flex justify-center align-center" : 'hidden'}>
                    <button
                        onClick={() => { handleAddTask('End') }}
                        className="group-btn add-task-btn flex align-center">
                        <PlusBtnAddListSvg />
                        Add a card
                    </button>

                    <button className="group-btn new-template flex justify-center align-center">
                        <GenerateTemplateBtnSvg />
                    </button>
                </div>}

            {isOnAddTask &&
                <AddTaskModal
                    isOnAddTask={isOnAddTask}
                    group={group}
                    onAddTask={onAddTask}
                    onCloseAddTaskModal={onCloseAddTaskModal} />}

        </section>
    )
}