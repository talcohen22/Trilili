import { useState } from "react"
import { TaskDetailsFeatures } from "./TaskDetailsFeatures"
import { ArchiveSvg, AttachmentSvg, CardIconSvg, CheckListSvg, CopySvg, CoverSvg, DatesSvg, LabelsSvg, MembersSvg, MoveSvg } from "../svg/ImgSvg"
import { useNavigate } from "react-router"

export function TaskQuickEdit({ board, quickEdit,closeQuickEdit }) {
    const [task, setTask] = useState(quickEdit.task)
    const { groupId, position } = quickEdit
    const boardId=board._id

    const navigate = useNavigate()

    function onGetTaskDetails(ev) {
        navigate(`/board/${boardId}/${groupId}/${task.id}`)
        handleCloseQuickEdit()
    }

    function handleCloseQuickEdit(){
        closeQuickEdit()
    }
    
    function handleChange({ target }) {
        const title = target.value
        quickEdit.task.title = title
        console.log(quickEdit.task)
        setTask(quickEdit.task)
    }
    console.log(position)
    return (
        <div className="overlay">
            <div className="quickedit-modal">
                <form className='form-add-new-task' style={{ position: 'absolute', top: position.top-8, left: position.left - 258 }}>
                    <textarea
                        className='custom-textarea'
                        name="text"
                        value={task.title}
                        onChange={handleChange}
                    />
                    <div className="button-container">
                        <button className='btn-action modal-btn'>
                            Save
                        </button>
                    </div>

                </form>
                <div style={{ position: 'absolute', top: position.top-8, left: position.left + 10, }}>
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
                        <div onClick={((ev) => getDynamicCmp(ev, 'Dates'))}>
                            <ArchiveSvg />
                            <p>Remove</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}