import { boardService } from "../../../services/board.service.local"
import { utilService } from "../../../services/util.service"
import { MemberImg } from "../../common/MemberImg"


export function Members({ board, group, task }) {

    const taskMembers = boardService.getTaskMembers(board, group, task)
   
    return (
        <section className="task-members flex">
            {taskMembers.map(member =>
                <li className="" key={member._id}>
                    <MemberImg member={member} size={24}/>
                </li>
            )}
        </section>
    )
}