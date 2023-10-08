import { useState } from "react"
import { useSelector } from "react-redux"

export function TaskLabels({
    labelIds,
    labelsPaletteBoard,
    onIsExpandedLabels,
    isExpandedLabels }) {

    const [toggleLabelTxt, setToggleLabelTxt] = useState(isExpandedLabels)
    const boards = useSelector(storeState => storeState.boardModule.boards)

    const renderLabel = (labelId, backgroundColor, titleTxt) => (
        <div
            className="task-label flex justify-center align-center "
            key={labelId}
            style={{ backgroundColor }}
        >
            {isExpandedLabels && <p className="fs12">{titleTxt}</p>}
        </div >
    )

    function onToggleLabelTxt(ev) {
        ev.stopPropagation()
        onIsExpandedLabels()
        setToggleLabelTxt(!toggleLabelTxt)
    }

    return (
        <section className="task-labels-interface flex" onClick={onToggleLabelTxt}>
            {labelIds.map((labelId) => {
                const matchingLabel =
                    labelsPaletteBoard.find((paletteItem) =>
                        (paletteItem.id === labelId))

                if (matchingLabel) {
                    const backgroundColor = matchingLabel.color
                    const titleTxt = matchingLabel.title
                    return renderLabel(labelId, backgroundColor, titleTxt)
                }
                return null
            })}
        </section>
    )
}
