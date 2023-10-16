import { ExitBtnSvg } from "../svg/ImgSvg";

export function GroupActionsModal({ handleClose, group,removeGroup,groupActionPostion,handleAddTask,handleDynamicCmpOpen }) {

    function onHandleClose() {
        handleClose()
    }
    function onRemoveGroup(){
        const groupId= group.id
        removeGroup(groupId)
    }

    function onAddCard(){
        const groupId= group.id
        handleAddTask(groupId)
    }

    function getDynamicCmp(cpmType){
        handleDynamicCmpOpen({type:cpmType})
    }
    
    const {left,top}=groupActionPostion
    return (
        <div className="group-actions-modal" style={{left:left+'px',top:top+'px'}}>
            <div className=" group-modal-header">
                <div></div>
                <h3>List actions</h3>
                <button className="exit-icon group-btn" onClick={onHandleClose}><ExitBtnSvg /></button>
            </div>
            <div>
                <ul className="group-action-content ">
                    <li><button className="group-action-btn" onClick={onAddCard}>Add Card...</button></li>
                    <li><button className="group-action-btn" onClick={(()=>getDynamicCmp('CopyList'))}>Copy list...</button></li>
                    <li><button className="group-action-btn" onClick={onRemoveGroup}>remove list</button></li>
                    <li><button className="group-action-btn">Sort By</button></li>
                </ul>
                
            </div>
        </div>
    )
}