import { boardService } from "../../../services/board.service.local"
import { utilService } from "../../../services/util.service"
import { MemberImg } from "../../common/MemberImg"


export function Members({ board, group, task }) {

    const taskMembers = boardService.getTaskMembers(board, group, task)
   
    return (
        <section className="task-members flex">
            {taskMembers.map(member =>
                <li className="" key={member._id} style={{width:'24px',height:'24px'}}>
                    <MemberImg  member={member}/>
                </li>
            )}
        </section>
    )
}