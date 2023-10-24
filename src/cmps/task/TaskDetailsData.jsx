import React from "react";
import { CheckListSvg, DescriptionSvg } from "../svg/ImgSvg";
import { CheckListData } from "./TaskDetailsData/CheckListData";
import { DescriptionData } from "./TaskDetailsData/DescriptionData";
import { FeaturesData } from "./TaskDetailsData/FeaturesData";


export function TaskDetailsData({ board, group, task }) {

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
                            checklist={checklist} />
                    </div>
                </React.Fragment>
            )}


        </section>
    )
}