import { useEffect, useRef, useState } from "react";
import { PlusBtnAddListSvg } from "../svg/ImgSvg";
import { AddGroupList } from "./AddGroupList";
import { boardService } from "../../services/board.service.local";
import { utilService } from "../../services/util.service";

export function AddGroupBtn({ onAddNewGroup }) {
    const [addListToggle, setAddListToggle] = useState(false)
    const [groupTitle, setGroupTitle] = useState("")
 
    function onOpenFormTitle() {
        setAddListToggle(true)
    }

    function onCancel() {
        setAddListToggle(false)
    }

    function onAddTitle(newGroupTitle) {
        const updatedNewGroup = { ...boardService.getEmptyGroup() }
        updatedNewGroup.title = newGroupTitle
        onAddNewGroup(updatedNewGroup)
        setGroupTitle(newGroupTitle)
    }


    return (
        <section>
            {!addListToggle ? (
                <button
                    className="btn-add-group flex align-center"
                    onClick={() => onOpenFormTitle()}
                >
                    <PlusBtnAddListSvg />
                    <p>Add another list</p>
                </button>
            ) : (
                <AddGroupList onAddTitle={onAddTitle} onCancel={onCancel} />
            )}
        </section>
    );
}
