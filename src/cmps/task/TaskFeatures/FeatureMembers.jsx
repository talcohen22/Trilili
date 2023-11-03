import { utilService } from "../../../services/util.service";
import { useState } from 'react'
import { VSvg } from "../../svg/ImgSvg";
import { EditTaskMember } from "../../../store/board.actions";
import { useSelector } from "react-redux";

export function FeatureMembers() {

    const board = useSelector(storeState => storeState.boardModule.board)
    const group = useSelector(storeState => storeState.boardModule.group)
    const task = useSelector(storeState => storeState.boardModule.task)

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
        <section className="feature-members scroll">
            <input value={searchTxt} className="search-members" type="text" placeholder="Search members" onChange={handleChange} />
            <p className="board-members">Board members</p>
            <div className="members-container">
                {board.members.map(member => (
                    member.fullname.toLowerCase().includes(searchTxt.toLowerCase()) &&
                    <div className="member flex align-center" onClick={() => onEditTaskMember(member._id)} key={member._id}>
                        {/* <img className="member-img" 
                        style={{
                            backgroundImage:`url(${member.imgUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }} /> */}
                         <img className="member-img" style={{ backgroundImage: `url(${member.imgUrl})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center center',
                                     backgroundRepeat:'no-repeat',                                  
                                    }}/> 
                        <p className="member-name">{member.fullname + ' (' + member.username + ')'}</p>
                        {task.memberIds.includes(member._id) && <VSvg />}
                    </div>
                ))}
            </div>
        </section>
    )
}