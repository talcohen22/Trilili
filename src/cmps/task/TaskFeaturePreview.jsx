import { ExitBtnSvg } from "../svg/ImgSvg";
import { EditLabel } from "./EditLabel";
import { FeatureLabels } from "./FeatureLabels";


export function TaskFeaturePreview({ dynamicParams, onSetIsDynamicCmpOpen, setDynamicParams, board, group, task }) {

    return (
        <div className="dynamic-feature-container">

            <p className="dyn-cmp-header">{dynamicParams.type}</p>

            {dynamicParams.type === 'Labels' &&
                <FeatureLabels
                    board={board}
                    group={group}
                    task={task}
                    onSetIsDynamicCmpOpen={onSetIsDynamicCmpOpen}
                    setDynamicParams={setDynamicParams} />}

            {dynamicParams.type === 'Edit label' &&
                <EditLabel setDynamicParams={setDynamicParams} />}

            <div className="exit-btn" onClick={() => onSetIsDynamicCmpOpen(false)}>
                <ExitBtnSvg />
            </div>
        </div>
    )
}