import { PencilSvg, SuggestionSvg } from "../svg/ImgSvg";
import * as React from 'react';
import { FormGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function FeatureLabels() {
    return (
        <section className="feature-labels">
            <input className="search-lables" type="text" placeholder="Search labels..." />
            <div className="labels-suggestions flex align-center">
                <SuggestionSvg />
                <h3>Labels</h3>
            </div>
            <ul className="label-options">
                <li className="flex align-center">
                    <FormGroup className="checkbox-item">
                        <FormControlLabel control={<Checkbox />}
                            label={<div className="color-display" style={{ backgroundColor: "#ffa2a2" }}></div>} ////////////////////////need to change the bgc
                            sx={{ '& .MuiSvgIcon-root': { height: '23px' } }} />
                    </FormGroup>
                    <PencilSvg />
                </li>
                <li className="flex align-center">
                    <FormGroup className="checkbox-item">
                        <FormControlLabel control={<Checkbox />}
                            label={<div className="color-display" style={{ backgroundColor: "#63c1ff" }}></div>} ////////////////////////need to change the bgc
                            sx={{ '& .MuiSvgIcon-root': { height: '23px' } }} />
                    </FormGroup>
                    <PencilSvg />
                </li>
            </ul>
            <p className="create-new-label">Create a new label</p>


        </section>
    )
}

