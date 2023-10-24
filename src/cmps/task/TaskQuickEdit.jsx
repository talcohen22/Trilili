import { useState } from "react"
import { TaskDetailsFeatures } from "./TaskDetailsFeatures"
import { AttachmentSvg, CardIconSvg, CheckListSvg, DatesSvg, LabelsSvg, MembersSvg } from "../svg/ImgSvg"
import { useNavigate } from "react-router"

export function TaskQuickEdit({ board, quickEdit }) {
    const [task, setTask] = useState(quickEdit.task)
    const { groupId, position } = quickEdit
    const boardId=board._id

    const navigate = useNavigate()

    function onGetTaskDetails(ev) {
        
        navigate(`/board/${boardId}/${groupId}/${task.id}`)
    }

    
    function handleChange({ target }) {
        const title = target.value
        quickEdit.task.title = title
        console.log(quickEdit.task)
        setTask(quickEdit.task)
    }
    console.log(position)
    return (
        <div className="overlay" >
            <div>
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
                        <div onClick={((ev) => getDynamicCmp(ev, 'Dates'))}>
                            <DatesSvg />
                            <p>Edit dates</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}