import { ExitBtnSvg } from "../svg/ImgSvg";
import { FeatureLabels } from "./FeatureLabels";


export function TaskFeaturePreview({dynamicParams, onSetIsDynamicCmpOpen}) {
    console.log(dynamicParams);
    return (
        <div className="dynamic-feature-container">

            <p className="dyn-cmp-header">{dynamicParams.type}</p>

            <div className="exit-btn" onClick={() => onSetIsDynamicCmpOpen(false)}>
                <ExitBtnSvg />
            </div>

            {dynamicParams.type === 'Labels' && <FeatureLabels/>}
        </div>
    )
}