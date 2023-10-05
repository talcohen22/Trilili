import { PencilSvg } from "../svg/ImgSvg";


export function TaskPreview({task}){

    return(
        <article className="task-card flex justify-space-b">
            <p className="task-title">{task.title}</p>
            <button className="task-preview-btn flex justify-center align-center"><PencilSvg /></button>
        </article>
    )
}