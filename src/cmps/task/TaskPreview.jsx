import { PencilSvg } from "../svg/ImgSvg";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { TaskLabels } from "./TaskFeatures/TaskLabels";
import { CommentCounter } from "./TaskFeatures/CommentCounter ";
import { DoneTasksCounter } from "./TaskFeatures/DoneTasksCounter";
import { DateTaskBtn } from "./TaskFeatures/DateTaskBtn";
import { TaskHeaderBgc } from "./TaskFeatures/TaskHeaderBgc ";


export function TaskPreview({
    group,
    task,
    onSetIsOpenTaskDetails,
    labelsPaletteBoard,
    onIsCheckDate,
    isExpandedLabels,
    onIsExpandedLabels }) {
    const { boardId } = useParams()

    const navigate = useNavigate()

    function onGetTaskDetails(ev) {
        navigate(`/board/${boardId}/${group.id}/${task.id}`)
    }

    function inHandleClickEditTitle(taskId) {
        console.log('taskId', taskId)
    }

    const { title, id, labelIds, style: bgHeaderClr, comments, checklists, dueDate } = task
    return (
        <article className="task-card" onClick={onGetTaskDetails}>

            {
                (bgHeaderClr) &&
                <TaskHeaderBgc
                    bgHeaderClr={bgHeaderClr}
                />
            }


            <div className="task-card-info flex ">

                {/* TaskLabels */}
                {labelIds &&
                    <TaskLabels
                        labelIds={labelIds}
                        labelsPaletteBoard={labelsPaletteBoard}
                        onIsExpandedLabels={onIsExpandedLabels}
                        isExpandedLabels={isExpandedLabels}
                    />}

                {/* task-title */}
                <p className="task-title">{title}</p>

                <div className="task-footer-dashboard flex align-center">

                    {/* DateTaskBtn */}
                    {dueDate &&
                        <DateTaskBtn
                            group={group}
                            task={task}
                            dueDate={dueDate}
                            onIsCheckDate={onIsCheckDate} />}

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