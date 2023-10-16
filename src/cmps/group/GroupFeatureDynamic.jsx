import { useState } from 'react'
import { ExitBtnSvg } from "../svg/ImgSvg";
import { FeatureAttachment } from '../task/FeatureAttachment';

export function GroupFeatureDynamic({ dynamicParams, onSetIsDynamicCmpOpen, setDynamicParams, board, group }) {

    <div className="dynamic-feature-container">

            <p className="dyn-cmp-header">{dynamicParams.type}</p>

            {dynamicParams.type === 'CopyList' &&
                // <FeatureAttachment setDynamicParams={setDynamicParams} />
                    <CopyList setDynamicParams={setDynamicParams} />
                }

            <div className="exit-btn" onClick={() => onSetIsDynamicCmpOpen(false)}>
                <ExitBtnSvg />
            </div>
        </div>
}
