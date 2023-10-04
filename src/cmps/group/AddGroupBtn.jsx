import { PlusBtnAddListSvg } from "../svg/ImgSvg";

export function AddGroupBtn() {

    return (
        <button className="btn-add-group flex align-center" onClick=''>
            <PlusBtnAddListSvg />
            <h1>Add another list</h1>
        </button>
    )
}