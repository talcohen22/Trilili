import { PencilSvg } from "../svg/ImgSvg";


export function TaskPreview({task}){

    return(
        <article className="task-card">
            <div className="flex justify-space-b">
            <p className="task-title">{task.title}</p>
            <button className="task-preview-btn"><PencilSvg /></button>
            </div>
            <div className="task-preview-details"></div>
        </article>
    )
}