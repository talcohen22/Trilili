import { ExitBtnSvg } from "../svg/ImgSvg";
import { EditLabel } from "./EditLabel";
import { FeatureAttachment } from "./FeatureAttachment";
import { FeatureLabels } from "./FeatureLabels";
import { useState } from 'react'
import { DeleteLabel } from "./TaskFeatures/DeleteLabel";

export function TaskFeatureDynamic({ dynamicParams, onSetIsDynamicCmpOpen, setDynamicParams, board, group, task }) {

    const [labelIdToEdit, setLabelIdToEdit] = useState('')

    function onSetLabelIdToEdit(labelId) {
        setLabelIdToEdit(labelId)
    }

    return (
        <div className="dynamic-feature-container">

            <p className="dyn-cmp-header">{dynamicParams.type}</p>

            {dynamicParams.type === 'Labels' &&
                <FeatureLabels
                    board={board}
                    group={group}
                    task={task}
                    setDynamicParams={setDynamicParams}
                    onSetLabelIdToEdit={onSetLabelIdToEdit} />}

            {dynamicParams.type === 'Edit label' &&
                <EditLabel
                    board={board}
                    group={group}
                    task={task}
                    setDynamicParams={setDynamicParams}
                    labelIdToEdit={labelIdToEdit} />}

            {dynamicParams.type === 'Delete Label' &&
                <DeleteLabel
                    board={board}
                    group={group}
                    task={task}
                    setDynamicParams={setDynamicParams}
                    labelIdToEdit={labelIdToEdit} />}

            {dynamicParams.type === 'Attach' &&
                <FeatureAttachment
                    board={board}
                    group={group}
                    task={task}
                    setDynamicParams={setDynamicParams} />}

            <div className="exit-btn" onClick={() => onSetIsDynamicCmpOpen(false)}>
                <ExitBtnSvg />
            </div>
        </div>
    )
}