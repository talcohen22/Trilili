import { useState,useEffect,useRef } from "react"
import { TaskDetailsFeatures } from "./TaskDetailsFeatures"
import { ArchiveSvg, AttachmentSvg, CardIconSvg, CheckListSvg, CopySvg, CoverSvg, DatesSvg, LabelsSvg, MembersSvg, MoveSvg } from "../svg/ImgSvg"
import { useNavigate } from "react-router"
import { boardService } from "../../services/board.service.local"

export function TaskQuickEdit({ board, quickEdit, closeQuickEdit, onSetBoard }) {

    const { groupId, position, task } = quickEdit
    const [title, setTitle] = useState(task.title)
    const boardId = board._id

    const navigate = useNavigate()
    const modalRef= useRef(null)
    const isComponentMounted = useRef(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                if (isComponentMounted.current) {
                    handleCloseQuickEdit();
                }
            }
            isComponentMounted.current = true
        };

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

    function handleChange({ target }) {
        setTitle(target.value)
    }

    function onUpdateTask(ev) {
        ev.preventDefault()
        const groupIdx = boardService.getGroupIdx(board, groupId)
        const group = board.groups[groupIdx]
        const taskIdx = boardService.getTaskIdx(group,task.id)
        board.groups[groupIdx].tasks[taskIdx].title=title
        onSetBoard(board)
        handleCloseQuickEdit()
    }
    function onRemoveTask(ev) {
        ev.preventDefault()
        const groupIdx = boardService.getGroupIdx(board, groupId)
        const group = board.groups[groupIdx]
        const taskIdx = boardService.getTaskIdx(group,task.id)
        board.groups[groupIdx].tasks.splice(taskIdx,1)
        onSetBoard(board)
        handleCloseQuickEdit()
    }

    return (
        <div className="overlay">
            <div className="quickedit-modal" ref={modalRef}>
                <form className='form-add-new-task' style={{ position: 'absolute', top: position.top - 8, left: position.left - 258 }} onSubmit={onUpdateTask}>
                    <textarea
                        className='custom-textarea'
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