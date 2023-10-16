import { AttachmentSvg, CheckListSvg, DatesSvg, LabelsSvg, MembersSvg } from "../svg/ImgSvg";
import React from 'react';
import { useParams } from "react-router";
import { updateBoardGroupTaskType } from "../../store/board.actions";

export function TaskDetailsFeatures() {
    const { boardId } = useParams()
    const { groupId } = useParams()
    const { taskId } = useParams()

    function getDynamicCmp({ target }, cpmType) {
        const data = target.getBoundingClientRect()
        const location = { top: data.top, left: data.left }
        updateBoardGroupTaskType(boardId, groupId, taskId, cpmType, location)
    }

    return (
        <React.Fragment>
            <section className="task-features">

                <h3>Add to card</h3>
                <div onClick={((ev) => getDynamicCmp(ev, 'Members'))}>
                    <MembersSvg />
                    <p>Members</p>
                </div>
                <div onClick={((ev) => getDynamicCmp(ev, 'Labels'))}>
                    <LabelsSvg />
                    <p>Labels</p>
                </div>
                <div onClick={((ev) => getDynamicCmp(ev, 'Add checklist'))}>
                    <CheckListSvg />
                    <p>Checklist</p>
                </div>
                <div onClick={((ev) => getDynamicCmp(ev, 'Dates'))}>
                    <DatesSvg />
                    <p>Dates</p>
                </div>
                <div onClick={((ev) => getDynamicCmp(ev, 'Attach'))}>
                    <AttachmentSvg />
                    <p>Attachment</p>
                </div>

            </section>

        </React.Fragment>
    )
}