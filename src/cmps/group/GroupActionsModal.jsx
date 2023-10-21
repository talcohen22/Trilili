import { Fragment, useState } from "react";
import { ExitBtnSvg,TickSvg } from "../svg/ImgSvg";
import { GroupFeatureDynamic } from "./GroupFeatureDynamic";

export function GroupActionsModal({ handleClose, group, removeGroup, removeTasks, groupActionPostion, handleAddTask, saveCopiedGroup, board, onSetBoard, onMoveBoards, handleWatchGroup }) {
    const [isDynamicCmpOpen, setIsDynamicCmpOpen] = useState(false)
    const [dynamicParams, setDynamicParams] = useState({})
    function onHandleClose() {
        handleClose()
    }
    function onRemoveGroup() {
        const groupId = group.id
        removeGroup(groupId)
    }
    function onRemoveTasks() {
        const groupId = group.id
        removeTasks(groupId)
    }

    function onAddCard() {
        const groupId = group.id
        handleAddTask(groupId)
    }

    function getDynamicCmp(cpmType) {
        setDynamicParams({ type: cpmType })
        onSetIsDynamicCmpOpen(true)

    }

    function onSetIsDynamicCmpOpen(value) {
        setIsDynamicCmpOpen(value)
    }


    const { left, top } = groupActionPostion
    return (
        <Fragment>
            <div className={!isDynamicCmpOpen ? "group-actions-modal" : 'hidden'} style={{ left: left + 'px', top: top + 'px' }}>
                <div className=" group-modal-header">
                    <div></div>
                    <h3>List actions</h3>
                    <button className="exit-icon " onClick={onHandleClose}><ExitBtnSvg /></button>
                </div>
                <div>
                    <ul className="group-action-content ">
                        <li><button className="group-action-btn" onClick={onAddCard}>Add Card...</button></li>
                        <li><button className="group-action-btn" onClick={(() => getDynamicCmp('Copy list'))}>Copy list...</button></li>
                        <li><button className="group-action-btn" onClick={(() => getDynamicCmp('Move list'))}>Move list...</button></li>
                        <li><button className="group-action-btn" onClick={handleWatchGroup} >Watch {group.isWatch&&<span><TickSvg/></span>}</button></li>
                        <hr />
                        <li><button className="group-action-btn" onClick={(() => getDynamicCmp('Sort list'))}>Sort By</button></li>
                        <hr />
                        <li><button className="group-action-btn" onClick={(() => getDynamicCmp('Move all cards in list'))}>Move all cards in this list…</button></li>
                        <li><button className="group-action-btn" onClick={onRemoveTasks}>Archive all cards in this list…</button></li>
                        <hr />
                        <li><button className="group-action-btn" onClick={onRemoveGroup}>Archive this list</button></li>
                    </ul>

                </div>
            </div>
            {isDynamicCmpOpen &&
                <GroupFeatureDynamic
                    groupActionPostion={groupActionPostion}
                    dynamicParams={dynamicParams}
                    setDynamicParams={setDynamicParams}
                    group={group}
                    board={board}
                    onHandleClose={onHandleClose}
                    onSetIsDynamicCmpOpen={onSetIsDynamicCmpOpen}
                    saveCopiedGroup={saveCopiedGroup}
                    onSetBoard={onSetBoard}
                    onMoveBoards={onMoveBoards}
                />
            }
        </Fragment>
    )
}