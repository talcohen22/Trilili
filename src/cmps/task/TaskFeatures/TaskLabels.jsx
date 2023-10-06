export function TaskLabels({ labelIds, labelsPaletteBoard }) {

    const renderLabel = (labelId, backgroundColor) => (
        <div
            className="task-label flex justify-center align-center"
            key={labelId}
            style={{ backgroundColor }}
        >
            <p></p>
        </div >
    )

    return (
        <section className="task-labels-interface flex">
            {labelIds.map((labelId) => {
                const matchingLabel =
                    labelsPaletteBoard.find((paletteItem) =>
                        (paletteItem.id === labelId))

                if (matchingLabel) {
                    const backgroundColor = matchingLabel.color
                    return renderLabel(labelId, backgroundColor)
                }
                return null
            })}
        </section>
    )
}
