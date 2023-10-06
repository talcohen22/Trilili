import { PencilSvg } from "../svg/ImgSvg";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { TaskLabels } from "./TaskFeatures/TaskLabels";
import { CommentCounter } from "./TaskFeatures/CommentCounter ";
import { DoneTasksCounter } from "./TaskFeatures/DoneTasksCounter";
// import { TaskHeaderBgc } from "../group/TaskFeatures/TaskHeaderBgc ";

export function TaskPreview({ group, task, onSetIsOpenTaskDetails, labelsPaletteBoard }) {
    const { boardId } = useParams()

    const navigate = useNavigate()
    // console.log();

    function onGetTaskDetails() {
        navigate(`/board/${boardId}/${group.id}/${task.id}`)
        onSetIsOpenTaskDetails(true)
    }

    function inHandleClickEditTitle(taskId) {
        console.log('taskId', taskId)
    }

    const { title, id, labelIds, style: bgHeaderClr, comments, checklists } = task
    // console.log('bgHeaderClr.backgroundColor', bgHeaderClr.backgroundColor)
    return (
        <article className="task-card" onClick={onGetTaskDetails}>

            {/* FIXME: Background Color AND iMAGE TO FIX !!!!!!!!!!*/}
            {/* {bgHeaderClr.backgroundColor !== '' &&
                <TaskHeaderBgc bgHeaderClr={bgHeaderClr} />
            } */}
            {/* FIXME: */}

            <div className="task-card-info flex ">

                {/* TaskLabels */}
                {labelIds &&
                    <TaskLabels
                        labelIds={labelIds}
                        labelsPaletteBoard={labelsPaletteBoard} />}

                {/* task-title */}
                <p className="task-title">{title}</p>

                <div className="task-footer-dashboard flex align-center">
                    {/* CommentCounter */}
                    {comments && < CommentCounter comments={comments} />}

                    {/* DoneTasksCounter */}
                    {checklists && < DoneTasksCounter checklists={checklists} />}
                </div>
            </div>



            <button
                className="task-preview-btn flex justify-center align-center"
                onClick={() => inHandleClickEditTitle(id)}>
                <PencilSvg />
            </button>

        </article>
    )
}