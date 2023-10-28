import { CommentSvg } from "../../svg/ImgSvg"

export function CommentCounter({ comments }) {

    const commentCount = comments.length;
    if (commentCount === 0) return

    return (
        <div className="task-comments flex align-center">
            <CommentSvg />
            <p className="fs12" >{commentCount}</p>
        </div>
    )
}