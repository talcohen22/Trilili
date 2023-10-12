import { ExitBtnSvg } from "../svg/ImgSvg";

export function GroupActionsModal({ handleClose, group,RemoveGroup,groupActionPostion }) {

    function onHandleClose() {
        handleClose()
    }
    function OnRemoveGroup(){
        const groupId= group.id
        RemoveGroup(groupId)
    }
    const {left,top}=groupActionPostion
    console.log(left+'px',top+'px')
    return (
        <div className="group-actions-modal" style={{left:left+'px',top:top+'px'}}>
            <div className=" group-modal-header">
                <div></div>
                <h3>List actions</h3>
                <button className="exit-icon group-btn" onClick={onHandleClose}><ExitBtnSvg /></button>
            </div>
            <div>
                <ul className="group-action-content ">
                    <li><button className="group-action-btn" onClick={OnRemoveGroup}>Add Card...</button></li>
                    <li><button className="group-action-btn" onClick={OnRemoveGroup}>remove list</button></li>
                    <li><button className="group-action-btn">Sort By</button></li>
                </ul>
                
            </div>
        </div>
    )
}