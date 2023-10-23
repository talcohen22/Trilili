import { AttachmentSvg, DescriptionSvg, EyeSvg, PencilSvg } from "../svg/ImgSvg";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { TaskLabels } from "./TaskFeatures/TaskLabels";
import { CommentCounter } from "./TaskFeatures/CommentCounter ";
import { DoneTasksCounter } from "./TaskFeatures/DoneTasksCounter";
import { DateTaskBtn } from "./TaskFeatures/DateTaskBtn";
import { TaskHeaderBgc } from "./TaskFeatures/TaskHeaderBgc ";
import { Members } from "./TaskFeatures/Members";


export function TaskPreview({
    board,
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

    const { title, id, labelIds, style: bgHeaderClr, comments, checklists, dueDate, startDate } = task

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

                    {task.isWatch &&
                        <div className="watch flex">
                            <EyeSvg />
                        </div>
                    }

                    {/* DateTaskBtn */}
                    {(dueDate || startDate) &&
                        <DateTaskBtn
                            group={group}
                            task={task}
                            dueDate={dueDate}
                            startDate={startDate}
                            onIsCheckDate={onIsCheckDate} />}

                    {task.description &&
                        <div className="description flex">
                            <DescriptionSvg />
                        </div>
                    }

                    {task.attachment.length > 0 &&
                        <div className="attachment flex">
                            <AttachmentSvg />
                            <p>{task.attachment.length}</p>
                        </div>
                    }

                    {/* CommentCounter */}
                    {comments && < CommentCounter comments={comments} />}

                    {/* DoneTasksCounter */}
                    {checklists && < DoneTasksCounter checklists={checklists} />}

                    {task.memberIds.length > 0 &&
                        <Members
                            board={board}
                            group={group}
                            task={task} />}
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