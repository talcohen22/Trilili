import { useState } from "react";
import { PlusBtnAddListSvg } from "../svg/ImgSvg";
import { AddGroupList } from "./AddGroupList";
import { boardService } from "../../services/board.service.local";

export function AddGroupBtn({ onAddNewGroup }) {
    const [addListToggle, setAddListToggle] = useState(false)
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
