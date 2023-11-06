import { useEffect, useRef } from "react";
import { dashboardService } from "../../services/dashboardService";
import { ExitBtnSvg } from "../svg/ImgSvg";
import { TaskStatusPrecentage } from "./dashboard-charts/TaskStatusPrecentage";
import { TasksByLabel } from "./dashboard-charts/TasksByLabel";
import { TasksTable } from "./dashboard-charts/TasksTable";


export function Dashboard({ board, handleCloseDashboard }) {

    const tasksByLabels = dashboardService.countTasksByLabels(board);
    const taskStatus = dashboardService.calculateTaskStatus(board)
    const tasksWithDueDate = dashboardService.getTasksWithDueDate(board);
    const modalRef = useRef(null)

    useEffect(() => {

        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseDashboard()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    return (
        <div className="dashboard-overlay">
            <div className="dashboard-container" ref={modalRef}>
                <div className="dashboard-title"><h1>{board.title + ' Dashboard'}</h1> </div>
                <div className="close-dashboard"><button onClick={handleCloseDashboard}><ExitBtnSvg /></button></div>
                <div className="div2 dashboard-element"><div>
                    <div className="kpi-card">
                        <div className="complete"><h1>Tasks Completed</h1></div>
                        <div className="kpi-value completed-kpi">{taskStatus.done.count}</div>
                    </div>
                </div></div>
                <div className="div3 dashboard-element">
                    <div className="kpi-card" >
                        <div className="in-progres"><h1>Tasks in progress</h1></div>
                        <div className="kpi-value in-progres-kpi">{taskStatus.undone.count}</div>
                    </div>
                </div>
                <div className="div4 dashboard-element"> <TaskStatusPrecentage taskStatus={taskStatus} /></div>
                <div className="div5 dashboard-element"><TasksTable board={board} tasksWithDueDate={tasksWithDueDate} /></div>
                <div className="div6 dashboard-element"><TasksByLabel tasksByLabels={tasksByLabels} /></div>
            </div>
        </div>
    )
}