import { CloseBtnSvg } from "../svg/ImgSvg";

export function GroupActionsModal({ handleClose ,OnRemoveGroup }) {

    function onHandleClose() {
        handleClose()
    }
    function OnRemoveGroup(){
        OnRemoveGroup()
    }

    return (
        <div className="group-actions-modal">
            <header className=" group-modal-header">
                <div></div>
                <h3>List actions</h3>
                <button className="exit-icon group-btn" onClick={onHandleClose}><CloseBtnSvg /></button>
            </header>
            <div className="group-action-content ">
                <button className="group-action-btn" onClick={OnRemoveGroup}>remove list</button>
                <button className="group-action-btn">Sort By</button>
            </div>
        </div>
    )
}