import { AttachmentSvg, CheckListSvg, DatesSvg, LabelsSvg, MembersSvg } from "../svg/ImgSvg";
import React from 'react';
import { useParams } from "react-router";
import { updateBoardGroupTaskType } from "../../store/board.actions";


export function TaskDetailsFeatures() {
    const { boardId } = useParams()
    const { groupId } = useParams()
    const { taskId } = useParams()

    function getDynamicCmp(cpmType) {
        updateBoardGroupTaskType(boardId, groupId, taskId, cpmType, null)
    }

    return (
        <React.Fragment>
            <section className="task-features">

                <h3>Add to card</h3>
                <div onClick={(() => getDynamicCmp('Members'))}>
                    <MembersSvg />
                    <p>Members</p>
                </div>
                <div onClick={(() => getDynamicCmp('Labels'))}>
                    <LabelsSvg />
                    <p>Labels</p>
                </div>
                <div onClick={(() => getDynamicCmp('Add checklist'))}>
                    <CheckListSvg />
                    <p>Checklist</p>
                </div>
                <div onClick={(() => getDynamicCmp('Dates'))}>
                    <DatesSvg />
                    <p>Dates</p>
                </div>
                <div onClick={(() => getDynamicCmp('Attach'))}>
                    <AttachmentSvg />
                    <p>Attachment</p>
                </div>

            </section>

        </React.Fragment>
    )
}