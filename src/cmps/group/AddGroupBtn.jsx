<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
=======
import { useState } from "react";
>>>>>>> 455cd5f6b5d5084a7e04614d9f1a22e6956b6e8a
import { PlusBtnAddListSvg } from "../svg/ImgSvg";
import { AddGroupList } from "./AddGroupList";
import { boardService } from "../../services/board.service.local";

export function AddGroupBtn({ onAddNewGroup }) {
    const [addListToggle, setAddListToggle] = useState(false)
<<<<<<< HEAD
    const [groupTitle, setGroupTitle] = useState("")
 
=======

>>>>>>> 455cd5f6b5d5084a7e04614d9f1a22e6956b6e8a
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
    )
}
