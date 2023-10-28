import { useState, useEffect, useRef } from "react"
import { TaskDetailsFeatures } from "./TaskDetailsFeatures"
import { ArchiveSvg, AttachmentSvg, CardIconSvg, CheckListSvg, CopySvg, CoverSvg, DatesSvg, LabelsSvg, MembersSvg, MoveSvg } from "../svg/ImgSvg"
import { useNavigate } from "react-router"
import { boardService } from "../../services/board.service.local"
import { updateBoardGroupTaskType } from "../../store/board.actions"

export function TaskQuickEdit({ board, quickEdit, closeQuickEdit, onSetBoard }) {

    const { groupId, position, task } = quickEdit
    const [title, setTitle] = useState(task.title)
    const boardId = board._id

    const navigate = useNavigate()
    const modalRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        handleBlur()
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target) &&
                event.target.className === 'overlay quick-edit-overlay') {
                handleCloseQuickEdit();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

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
    function onRemoveTask(ev) {
        ev.preventDefault()
        const groupIdx = boardService.getGroupIdx(board, groupId)
        const group = board.groups[groupIdx]
        const taskIdx = boardService.getTaskIdx(group, task.id)
        board.groups[groupIdx].tasks.splice(taskIdx, 1)
        onSetBoard(board)
        handleCloseQuickEdit()
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

    return (
        <div className="overlay quick-edit-overlay" id="overlay">
            <div className="quickedit-modal" ref={modalRef}>
                <form className='form-add-new-task' style={{ position: 'absolute', top: position.top - 8, left: position.left - 258 }} onSubmit={onUpdateTask}>
                    <textarea ref={inputRef}
                        className='custom-textarea quick-edit-textarea'
                        name="text"
                        value={title}
                        onChange={handleChange}
                    />
                    <div className="button-container">
                        <button className='btn-action modal-btn'>
                            Save
                        </button>
                    </div>

                </form>
                <div style={{ position: 'absolute', top: position.top - 8, left: position.left + 10, }}>
                    <section className="task-quickedit-features">
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
                        <div onClick={((ev) => getDynamicCmp(ev, 'Move'))}>
                            <MoveSvg />
                            <p>Move</p>
                        </div>
                        <div onClick={((ev) => getDynamicCmp(ev, 'Copy'))}>
                            <CopySvg />
                            <p>Copy</p>
                        </div>

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