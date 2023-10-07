import { PencilSvg, SuggestionSvg } from "../svg/ImgSvg";
import * as React from 'react';
import { FormGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { addLabelTask, removeLabelTask } from "../../store/board.actions";
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { TaskFeaturePreview } from "./TaskFeaturePreview";



export function FeatureLabels({ board, group, task, onSetIsDynamicCmpOpen, setDynamicParams }) {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    async function handleChange(event, labelId) {
        const { target } = event
        try {
            if (target.checked) { //remove label from task
                await addLabelTask(board, group, task, labelId)
            }
            else { //add label to task
                await removeLabelTask(board, group, task, labelId)
            }
        } catch (err) {
            console.log('cannot add/remove label, error: ', err);
        }
    }

    function onEditLabel() {
        setDynamicParams({type: 'Edit label'})
    }

    return (
        <section className="feature-labels">
            <input className="search-lables" type="text" placeholder="Search labels..." />
            <div className="labels-suggestions flex align-center">
                <SuggestionSvg />
                <h3>Labels</h3>
            </div>
            <ul className="label-options">
                {board.labels.map(label => (
                    <li className="flex align-center" key={label.id}>
                        <FormGroup className="checkbox-item">
                            <FormControlLabel control={<Checkbox
                                className="mui-check-box"
                                checked={task.labelIds.includes(label.id)}
                                onChange={() => handleChange(event, label.id)} />}
                                label={<div className="color-display"
                                    style={{ backgroundColor: label.color }}>
                                    {label.title}
                                </div>}
                                sx={{ '& .MuiSvgIcon-root': { height: '23px' } }} />
                        </FormGroup>
                        <div className="edit-label" onClick={onEditLabel}>
                            <PencilSvg />
                        </div>
                    </li>
                ))}
            </ul>
            <p className="create-new-label" onClick={onEditLabel}>Create a new label</p>
        </section>
    )
}

