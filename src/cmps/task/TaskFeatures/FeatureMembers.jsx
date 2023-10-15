import { utilService } from "../../../services/util.service";
import { useState } from 'react'
import { VSvg } from "../../svg/ImgSvg";
import { EditTaskMember } from "../../../store/board.actions";

export function FeatureMembers({ board, group, task }) {

    const [searchTxt, setSearchTxt] = useState('')

    function handleChange({ target }) {
        setSearchTxt(target.value)
    }

    function onEditTaskMember(memberId) {
        try {
            EditTaskMember(board, group, task, memberId)
        } catch (err) {
            console.log('Cannot edit member', err)
        }
    }

    return (
        <section className="feature-members">
            <input value={searchTxt} className="search-members" type="text" placeholder="Search members" onChange={handleChange} />
            <p className="board-members">Board members</p>
            <div className="members-container">
                {board.members.map(member => (
                    member.fullname.toLowerCase().includes(searchTxt.toLowerCase()) &&
                    <div className="member flex align-center" onClick={() => onEditTaskMember(member._id)} key={member._id}>
                        <img className="member-img" src={utilService.getAssetSrc(member.imgUrl + '.jpg')} alt="user" />
                        <p className="member-name">{member.fullname}</p>
                        {task.memberIds.includes(member._id) && <VSvg />}
                    </div>
                ))}
            </div>
        </section>
    )
}