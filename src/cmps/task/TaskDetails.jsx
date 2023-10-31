import { useParams } from "react-router"
import { CardIconSvg, ExitBtnSvg, EyeSvg } from "../svg/ImgSvg"
import { TaskDetailsFeatures } from "./TaskDetailsFeatures"
import { TaskDetailsData } from "./TaskDetailsData"
import { useEffect, useState, useRef } from 'react'
import { boardService } from "../../services/board.service.local"
import { useNavigate } from "react-router"
import { useSelector } from 'react-redux'
import { FastAverageColor } from 'fast-average-color'

export function TaskDetails({ onSetChecklistIdToEdit }) {

    const boards = useSelector(storeState => storeState.boardModule.boards);

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
    const [board, setBoard] = useState(null)
    const [bgColor, setBgColor] = useState('transparent')
    const { boardId } = useParams()
    const { groupId } = useParams()
    const { taskId } = useParams()
    const navigate = useNavigate()
    const wrapperRef = useRef(null)
    useClickOutsideCmp(wrapperRef)

    useEffect(() => {
        loadTask()
    }, [taskId, boards])

    async function loadTask() {
        try {
            const { board, group, task } = await boardService.getBoardGroupTask(boardId, groupId, taskId)
            setTask(task)
            setGroup(group)
            setBoard(board)
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

    useEffect(() => {
        async function getBgc() {
            if (task) {
                const fac = new FastAverageColor();
                const color = await fac.getColorAsync(task.style.cover);
                setBgColor(color.hex);
            }
        }
        if (task && task.style.cover) getBgc();

    }, [task]);


    if (!task) return <div></div>

    const isCover = task.style.backgroundColor || task.style.cover

    return (
        <div className="overlay flex justify-center" onClick={handleClickOutside} >

            <section className="task-details-container" ref={wrapperRef}>

                {isCover &&
                    <div className={`cover ${task.style.cover ? 'img' : ''}`}
                        style={{
                            backgroundColor: task.style.backgroundColor ? task.style.backgroundColor : bgColor ? bgColor : 'transparent',
                            backgroundImage: task.style.cover ? `url(${task.style.cover})` : 'none'
                        }}>

                    </div>}

                <header className="task-header flex align-top">
                    <div className="title-img">
                        <CardIconSvg />
                    </div>
                    <div className="task-title">
                        <h1>{task.title}</h1>
                        <p className="flex align-center">in list
                            <a href="#">{group.title}</a>
                            {task.isWatch && <EyeSvg />}
                        </p>
                    </div>
                </header>

                <main className="task-details-content flex">
                    <TaskDetailsData
                        board={board}
                        group={group}
                        task={task}
                        onSetChecklistIdToEdit={onSetChecklistIdToEdit} />
                    <TaskDetailsFeatures />
                </main>

                <div className="exit-taxt-details-btn" onClick={onGetBoardDetails}>
                    <ExitBtnSvg />
                </div>

            </section>

        </div>
    )
}

