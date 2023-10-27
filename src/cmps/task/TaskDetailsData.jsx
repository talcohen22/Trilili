import React from "react";
import { AttachmentSvg, CheckListSvg, DescriptionSvg } from "../svg/ImgSvg";
import { CheckListData } from "./TaskDetailsData/CheckListData";
import { DescriptionData } from "./TaskDetailsData/DescriptionData";
import { FeaturesData } from "./TaskDetailsData/FeaturesData";
import { AttachmentData } from "./TaskDetailsData/AttachmentData";


export function TaskDetailsData({ board, group, task, onSetChecklistIdToEdit }) {

    return (
        <section className="task-details-data">
            <FeaturesData
                board={board}
                group={group}
                task={task} />

            <div className="description-svg">
                <DescriptionSvg />
            </div>
            <DescriptionData
                board={board}
                group={group}
                task={task}
            />

            {task.checklists.length > 0 && task.checklists.map(checklist =>
                <React.Fragment key={checklist.id}>
                    <div className="checklist-svg">
                        <CheckListSvg />
                    </div>
                    <div className="checklist-item">
                        <CheckListData
                            board={board}
                            group={group}
                            task={task}
                            checklist={checklist}
                            onSetChecklistIdToEdit={onSetChecklistIdToEdit} />
                    </div>
                </React.Fragment>
            )}

            {task.attachment.length > 0 &&
                <React.Fragment>
                    <div className="attachment-svg">
                        <AttachmentSvg />
                    </div>
                    <p className="attachment-header">Attachment</p>
                    <div className="attachments-container flex"> 
                        {task.attachment.map((attachment, idx) =>
                            <div key={idx}>
                                <AttachmentData 
                                board={board}
                                group={group}
                                task={task}
                                attachment={attachment}
                                attachIdx={idx} />
                            </div>
                        )}
                    </div>
                </React.Fragment>

            }


        </section>
    )
}