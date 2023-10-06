import { PencilSvg } from "../svg/ImgSvg";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

export function TaskPreview({ group, task }) {
    const { boardId } = useParams()

    const navigate = useNavigate()

    function onGetTaskDetails() {
        navigate(`/board/${boardId}/${group.id}/${task.id}`)
    }

    function inHandleClickEditTitle(taskId) {
        console.log('taskId', taskId)
    }
    return (
        <article className="task-card flex justify-space-b" onClick={onGetTaskDetails}>
            <p className="task-title">{task.title}</p>
            <button
                className="task-preview-btn flex justify-center align-center"
                onClick={() => inHandleClickEditTitle(task.id)}>
                <PencilSvg />
            </button>
        </article>
    )
}