import { AttachmentSvg, DescriptionSvg, EyeSvg, PencilSvg } from "../svg/ImgSvg"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { TaskLabels } from "./TaskFeatures/TaskLabels"
import { CommentCounter } from "./TaskFeatures/CommentCounter "
import { DoneTasksCounter } from "./TaskFeatures/DoneTasksCounter"
import { DateTaskBtn } from "./TaskFeatures/DateTaskBtn"
import { TaskHeaderBgc } from "./TaskFeatures/TaskHeaderBgc "
import { Members } from "./TaskFeatures/Members"
import { useRef } from "react"
import { boardService } from "../../services/board.service.local"

export function TaskPreview({
    board,
    group,
    task,
    onSetIsOpenTaskDetails,
    labelsPaletteBoard,
    onIsCheckDate,
    isExpandedLabels,
    onIsExpandedLabels,
    openQuickEdit }) {

    const { boardId } = useParams()
    const buttonRef = useRef(null)
    const navigate = useNavigate()
    const idxs = boardService.getVideoAttachmentIdx(task)

    function onGetTaskDetails(ev) {
        navigate(`/board/${boardId}/${group.id}/${task.id}`)
    }

    function inHandleClickEditTitle(event, task) {
        event.stopPropagation()
        const position = getQuickEditPosition()
        const groupId = group.id
        openQuickEdit(task, groupId, position)
    }

    function getQuickEditPosition() {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const positionX = buttonRect.right
        const positionY = buttonRect.top
        return ({ left: positionX, top: positionY })
    }

    const { title, id, labelIds, style: bgHeaderClr, comments, checklists, dueDate, startDate } = task

    return (
        <article className="task-card" onClick={onGetTaskDetails}>

            {bgHeaderClr && <TaskHeaderBgc bgHeaderClr={bgHeaderClr} />}

            <div className="task-card-info flex ">

                {/* TaskLabels */}
                {labelIds &&
                    <TaskLabels
                        labelIds={labelIds}
                        labelsPaletteBoard={labelsPaletteBoard}
                        onIsExpandedLabels={onIsExpandedLabels}
                        isExpandedLabels={isExpandedLabels} />}

                {/* task-title */}
                <p className="task-title">{title}</p>

                <div className="task-footer-dashboard flex align-center">

                    {task.isWatch &&
                        <div className="watch flex"><EyeSvg /></div>
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
                        </div>}

                    {task.attachment.length > 0 &&
                        <div className="attachment flex">
                            <AttachmentSvg />
                            <p>{task.attachment.length}</p>
                        </div>}

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

            {idxs.length > 0 &&
                idxs.map(idx => (
                    <div key={idx} className="video-container">
                        <video width='100%' height="100" controls style={{ padding: '4px 8px 4px 12px' }} >
                            <source src={task.attachment[idx].url} type="video/mp4" />
                        </video>
                    </div>
                ))}

            <button
                ref={buttonRef}
                className="task-preview-btn flex justify-center align-center"
                onClick={(ev) => inHandleClickEditTitle(ev, task)}>
                <PencilSvg />
            </button>

        </article>
    )
}

