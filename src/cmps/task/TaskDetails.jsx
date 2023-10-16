import { useParams } from "react-router"
import { CardIconSvg, ExitBtnSvg, EyeSvg } from "../svg/ImgSvg"
import { TaskDetailsFeatures } from "./TaskDetailsFeatures"
import { TaskDetailsData } from "./TaskDetailsData"
import { useEffect, useState, useRef } from 'react'
import { boardService } from "../../services/board.service.local"
import { useNavigate } from "react-router"

export function TaskDetails() {

    function useClickOutsideCmp(ref) {
        useEffect(() => {
            function handleClickOutside(event) { }

            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }


    const [task, setTask] = useState(null)
    const [group, setGroup] = useState(null)
    // const [board, setBoard] = useState(null)
    const { boardId } = useParams()
    const { groupId } = useParams()
    const { taskId } = useParams()
    const navigate = useNavigate()
    const wrapperRef = useRef(null);
    useClickOutsideCmp(wrapperRef);

    useEffect(() => {
        loadTask()
    }, [taskId])

    async function loadTask() {
        try {
            const { group, task } = await boardService.getGroupTask(boardId, groupId, taskId)
            setTask(task)
            setGroup(group)
            // setBoard(board)
        } catch (err) {
            console.log('Cant load task')
        }
    }

    function onGetBoardDetails() {
        navigate(-1)
    }

    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onGetBoardDetails()
        }
    }

    if (!task) return <div></div>
    return (
        <div className="overlay" onClick={handleClickOutside} >
            <section className="task-details-container" ref={wrapperRef}>

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
                    <TaskDetailsFeatures />
                </main>

                <div className="exit-taxt-details-btn" onClick={onGetBoardDetails}>
                    <ExitBtnSvg />
                </div>


            </section>
        </div>
    )
}

