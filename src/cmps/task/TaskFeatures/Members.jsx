import { boardService } from "../../../services/board.service.local"
import { utilService } from "../../../services/util.service"


export function Members({ board, group, task }) {

    const membersImgs = boardService.getMembersTaskImgs(board, group, task)
    let count = 1

    return (
        <section className="task-members flex">
            {membersImgs.map(membersImg =>
                <li className="" key={'img' + count++}>
                    <img src={utilService.getAssetSrc(`${membersImg}.jpg`)} alt="user" />

                </li>
            )}
        </section>
    )
}