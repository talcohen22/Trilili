import { AttachmentSvg, CheckListSvg, DatesSvg, LabelsSvg, MembersSvg } from "../svg/ImgSvg";
import { useEffect, useState } from 'react'
import { TaskFeaturePreview } from "./TaskFeaturePreview";
import React from 'react';



export function TaskDetailsFeatures() {
    const [isDynamicCmpOpen, setIsDynamicCmpOpen] = useState(false)
    const [dynamicParams, setDynamicParams] = useState({})

    function getDynamicCmp(cpmType) {
        setDynamicParams({ type: cpmType })
        onSetIsDynamicCmpOpen(true)

    }

    function onSetIsDynamicCmpOpen(value) {
        setIsDynamicCmpOpen(value)
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
                <div onClick={(() => getDynamicCmp('Checklist'))}>
                    <CheckListSvg />
                    <p>Checklist</p>
                </div>
                <div onClick={(() => getDynamicCmp('Dates'))}>
                    <DatesSvg />
                    <p>Dates</p>
                </div>
                <div onClick={(() => getDynamicCmp('Attachment'))}>
                    <AttachmentSvg />
                    <p>Attachment</p>
                </div>

            </section>

            {isDynamicCmpOpen &&
                <TaskFeaturePreview
                    dynamicParams={dynamicParams}
                    onSetIsDynamicCmpOpen={onSetIsDynamicCmpOpen} />}

        </React.Fragment>
    )
}