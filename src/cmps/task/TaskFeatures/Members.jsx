import { boardService } from "../../../services/board.service.local"
import { utilService } from "../../../services/util.service"


export function Members({ board, group, task }) {

    const membersImgs = boardService.getMembersTaskImgs(board, group, task)

    return (
        <section className="task-members flex justify-right">
            {membersImgs.map(membersImg =>
                <li className="">
                    <img src={utilService.getAssetSrc(`${membersImg}.jpg`)} alt="user" />

                </li>
            )}
        </section>
    )
}