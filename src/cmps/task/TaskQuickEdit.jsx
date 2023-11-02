import { useState, useEffect, useRef } from "react"
import { ArchiveSvg, CardIconSvg, CopySvg, CoverSvg, DatesSvg, LabelsSvg, MembersSvg, MoveSvg } from "../svg/ImgSvg"
import { useNavigate } from "react-router"
import { boardService } from "../../services/board.service.local"
import { addActivity, updateBoardGroupTaskType } from "../../store/board.actions"
import { useSelector } from "react-redux"

export function TaskQuickEdit({ board, quickEdit, closeQuickEdit, onSetBoard }) {

    const { groupId, position, task } = quickEdit
    const [title, setTitle] = useState(task.title)
    const boardId = board._id

    const navigate = useNavigate()
    const modalRef = useRef(null)
    const inputRef = useRef(null)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [componentHeight, setComponentHeight] = useState(0);

    const cmp = useSelector(storeState => storeState.boardModule.cmp)

    useEffect(() => {

        if (modalRef.current) {
            let height = modalRef.current.clientHeight;
            setComponentHeight(height);
        }

        const textLength = inputRef.current.value.length
        inputRef.current.setSelectionRange(textLength, textLength)

        handleBlur()
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target) &&
                event.target.className === 'overlay quick-edit-overlay') {
                const isPopoverOpen = !!cmp.type
                if (isPopoverOpen) {
                    updateBoardGroupTaskType(null, null, null, '', null)
                    return
                }
                handleCloseQuickEdit();
            }
            else {
                updateBoardGroupTaskType(null, null, null, '', null)
            }
        }
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }

    }, [handleCloseQuickEdit])

    function onGetTaskDetails(ev) {
        navigate(`/board/${boardId}/${groupId}/${task.id}`)
        handleCloseQuickEdit()
    }

    function handleCloseQuickEdit() {
        closeQuickEdit()
    }
    function handleBlur() {
        if (inputRef.current && inputRef.current.value) {
            inputRef.current.focus();
        }
    }

    function onUpdateTask(ev) {
        ev.preventDefault()

        if (!title || !title.trim()) {
            handleBlur()
            return
        }
        const groupIdx = boardService.getGroupIdx(board, groupId)
        const group = board.groups[groupIdx]
        const taskIdx = boardService.getTaskIdx(group, task.id)
        board.groups[groupIdx].tasks[taskIdx].title = title
        onSetBoard(board)
        handleCloseQuickEdit()
    }

    async function onRemoveTask(ev) {
        try {
            ev.preventDefault()
            const groupIdx = boardService.getGroupIdx(board, groupId)
            const group = board.groups[groupIdx]
            const taskIdx = boardService.getTaskIdx(group, task.id)
            group.tasks.splice(taskIdx, 1)
            onSetBoard(board)
            handleCloseQuickEdit()
            const strHtml = `removed ${task.title} from ${group.title}`
            await addActivity(board, group, task, strHtml)
        } catch (err) {
            console.log('cannot delete task: ', err)
        }

    }

    function handleChange({ target }) {
        setTitle(target.value)
    }

    function getDynamicCmp(ev, cpmType) {
        const parentElement = ev.currentTarget;
        const data = parentElement.getBoundingClientRect()
        const location = { top: data.top, left: data.left }
        updateBoardGroupTaskType(board._id, groupId, task.id, cpmType, location)
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            ev.target.blur()
            onUpdateTask(ev)
        }
    }


    return (
        <div className="overlay quick-edit-overlay" id="overlay">
            <div className="quickedit-modal flex"
                ref={modalRef}
                style={{
                    position: 'absolute',
                    top: position.top + componentHeight > screenHeight ? screenHeight - componentHeight - 10 : position.top - 8,
                    left: position.left + 422 - 258 > screenWidth ? position.left - 258 - 158 : position.left - 258,
                    flexDirection: position.left + 422 - 258 > screenWidth ? 'row-reverse' : ''
                }}>

                <form className='form-add-new-task'
                    onSubmit={onUpdateTask}>
                    <textarea ref={inputRef}
                        className='custom-textarea quick-edit-textarea'
                        name="text"
                        value={title}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} />
                    <div className="button-container">
                        <button className='btn-action modal-btn'>
                            Save
                        </button>
                    </div>
                </form>

                <div>
                    <section className="task-quickedit-features flex"
                        style={{ alignItems: position.left + 422 - 258 > screenWidth ? 'end' : 'start' }}>
                        <div onClick={onGetTaskDetails}>
                            <CardIconSvg />
                            <p>Open card</p>
                        </div>
                        <div onClick={((ev) => getDynamicCmp(ev, 'Labels'))}>
                            <LabelsSvg />
                            <p>Edit labels</p>
                        </div>
                        <div onClick={((ev) => getDynamicCmp(ev, 'Members'))}>
                            <MembersSvg />
                            <p>Change members</p>
                        </div>
                        <div onClick={((ev) => getDynamicCmp(ev, 'Cover'))}>
                            <CoverSvg />
                            <p>Change cover</p>
                        </div>
                        {/* <div onClick={((ev) => getDynamicCmp(ev, 'Move'))}>
                            <MoveSvg />
                            <p>Move</p>
                        </div>
                        <div onClick={((ev) => getDynamicCmp(ev, 'Copy'))}>
                            <CopySvg />
                            <p>Copy</p>
                        </div> */}

                        <div onClick={((ev) => getDynamicCmp(ev, 'Dates'))}>
                            <DatesSvg />
                            <p>Edit dates</p>
                        </div>
                        <div onClick={onRemoveTask}>
                            <ArchiveSvg />
                            <p>Remove</p>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    )
}