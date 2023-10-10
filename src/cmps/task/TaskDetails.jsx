import { useParams } from "react-router";
import { CardIconSvg, ExitBtnSvg, EyeSvg } from "../svg/ImgSvg";
import { TaskDetailsFeatures } from "./TaskDetailsFeatures";
import { TaskDetailsData } from "./TaskDetailsData";
import { useEffect, useState } from 'react'
import { boardService } from "../../services/board.service.local";
import { useNavigate } from "react-router";

export function TaskDetails() {

    const [task, setTask] = useState(null)
    const [group, setGroup] = useState(null)
    const [board, setBoard] = useState(null)
    const { boardId } = useParams()
    const { groupId } = useParams()
    const { taskId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadTask()
    }, [taskId])

    async function loadTask() {
        try {
            const {board, group, task } = await boardService.getBoardGroupTask(boardId, groupId, taskId)
            setTask(task)
            setGroup(group)
            setBoard(board)
        } catch (err) {
            showErrorMsg('Cant load task')
        }
    }

    function onGetBoardDetails(){
        navigate(-1)
    }

    if (!task) return <div></div>
    return (
        <div className="overlay">
            <section className="task-details-container">

                <header className="task-header flex align-top">
                    <div className="title-img">
                        <CardIconSvg />
                    </div>
                    <div className="task-title">
                        <h1>{task.title}</h1>
                        <p className="flex align-center">in list
                            <a href="#">{group.title}</a>
                            <EyeSvg />
                        </p>
                    </div>
                </header>

                <main className="task-details-content flex justify-space-b">
                    <TaskDetailsData task={task} />
                    <TaskDetailsFeatures board={board} group={group} task={task} />
                </main>

                <div className="exit-taxt-details-btn" onClick={onGetBoardDetails}>
                    <ExitBtnSvg />
                </div>


            </section>
        </div>
    )
}

