import { boardService } from "../../../services/board.service.local"
import { utilService } from "../../../services/util.service";
import { setIsWatch, updateBoardGroupTaskType } from "../../../store/board.actions";
import { EyeSvg, PlusBtnAddListSvg, VSvg } from "../../svg/ImgSvg";
import { useParams } from "react-router";
import { DatesData } from "./DatesData";

export function FeaturesData({ board, group, task }) {

    const { boardId } = useParams()
    const { groupId } = useParams()
    const { taskId } = useParams()

    const membersImgs = boardService.getMembersTaskImgs(board, group, task)
    let count = 1
    const labelsColors = boardService.getTaskLabelsColors(board, task)

    function getDynamicCmp(ev, cpmType) {
        const parentElement = ev.currentTarget;
        const data = parentElement.getBoundingClientRect()
        const location = { top: data.top, left: data.left }
        updateBoardGroupTaskType(boardId, groupId, taskId, cpmType, location)
    }

    async function onSetIsWatch() {
        try {
            await setIsWatch(board, group, task)
        } catch (err) {
            console.log('Cannot set isWatch', err)
        }
    }

    return (
        <section className="features-data flex">

            {/* members */}
            {membersImgs.length > 0 &&
                <div className="members">
                    <p className="title">Members</p>
                    <div className="members-img flex align-center">
                        {membersImgs.map(membersImg =>
                            <li className="" key={'img' + count++}>
                                <img src={utilService.getAssetSrc(`${membersImg}.jpg`)} alt="user" />
                            </li>
                        )}
                        <button className="plus-ptn" onClick={((ev) => getDynamicCmp(ev, 'Members'))}>
                            <PlusBtnAddListSvg />
                        </button>
                    </div>
                </div>}

            {/* labels */}
            {labelsColors.length > 0 &&
                <div className="labels">
                    <p className="title">Labels</p>
                    <div className="labels-colors flex align-center">
                        {labelsColors.map(labelsColor =>
                            <li className="flex align-center justify-center" key={'img' + count++}
                                style={{ backgroundColor: labelsColor.color }}>
                                {labelsColor.title}
                            </li>
                        )}
                        <button className="plus-ptn" onClick={((ev) => getDynamicCmp(ev, 'Labels'))}>
                            <PlusBtnAddListSvg />
                        </button>
                    </div>
                </div>}

            {/* isWatch */}
            <div className="watch">
                <p className="title">Notofications</p>
                <div className="notifications flex" onClick={onSetIsWatch}>
                    <EyeSvg />
                    {task.isWatch ? <p className="txt">Watching</p> : <p className="txt">Watch</p>}
                    {task.isWatch &&
                        <div className="v-icon flex justify-center align-center"><VSvg /></div>}
                </div>
            </div>

            {/* dates */}
            {(task.startDate !== null || task.dueDate !== null) &&
                <DatesData
                    board={board}
                    group={group}
                    task={task} />}

        </section>
    )

}