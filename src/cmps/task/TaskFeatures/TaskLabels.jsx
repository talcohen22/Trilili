import { useState } from "react"
import { useSelector } from "react-redux"

export function TaskLabels({ labelIds, labelsPaletteBoard, onIsExpandedLabels, isExpandedLabels }) {

    const [toggleLabelTxt, setToggleLabelTxt] = useState(isExpandedLabels)
    const boards = useSelector(storeState => storeState.boardModule.boards)

    const dynClass = isExpandedLabels ? "expanded-labels" : ""

    const renderLabel = (labelId, backgroundColor, titleTxt) => (
        <div
            className={`task-label flex align-center ${dynClass} `}
            key={labelId}
            onClick={onToggleLabelTxt}
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
        <section className="task-labels-interface flex" >
            {labelIds.map((labelId) => {
                const matchingLabel =
                    labelsPaletteBoard.find((paletteItem) =>
                        (paletteItem.id === labelId && paletteItem.color !== '#091E420F'))

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
