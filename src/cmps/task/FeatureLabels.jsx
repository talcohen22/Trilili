import { PencilSvg, SuggestionSvg } from "../svg/ImgSvg";
import * as React from 'react';
import { FormGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setLabelChecked, setLabelNotChecked } from "../../store/board.actions";
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { TaskFeatureDynamic } from "./TaskFeatureDynamic";
import { boardService } from "../../services/board.service.local";


export function FeatureLabels({ board, group, task, setDynamicParams, onSetLabelIdToEdit }) {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    const [labels, setLabels] = useState(board.labels)
    const [searchTxt, setSearchTxt] = useState('')

    async function handleChange(event, labelId) {
        const { target } = event
        try {
            if (target.checked) { //remove label from task
                await setLabelChecked(board, group, task, labelId)
            }
            else { //add label to task
                await setLabelNotChecked(board, group, task, labelId)
            }
        } catch (err) {
            console.log('cannot add/remove label, error: ', err);
        }
    }

    async function handleSearchChange({target}) {
        setSearchTxt(target.value)
        const filterLabels = await boardService.getLabels(board._id, target.value)
        setLabels(filterLabels)
    }

    function onEditLabel(labelId, cmp) {
        setDynamicParams({ type: `${cmp} label` })
        onSetLabelIdToEdit(labelId)
    }

    return (
        <section className="feature-labels">
            <input className="search-lables" value={searchTxt} type="text" placeholder="Search labels..." onChange={handleSearchChange} />
            <div className="labels-suggestions flex align-center">
                <SuggestionSvg />
                <h3>Labels</h3>
            </div>
            <ul className="label-options">
                {labels.map(label => (
                    <li className="flex align-center" key={label.id}>
                        <FormGroup className="checkbox-item">
                            <FormControlLabel control={<Checkbox
                                className="mui-check-box"
                                checked={task.labelIds ? task.labelIds.includes(label.id) : false}
                                onChange={() => handleChange(event, label.id)} />}
                                label={<div className="color-display"
                                    style={{ backgroundColor: label.color }}>
                                    {label.title}
                                </div>}
                                sx={{ '& .MuiSvgIcon-root': { height: '23px' } }} />
                        </FormGroup>
                        <div className="edit-label" onClick={() => onEditLabel(label.id, "Edit")}>
                            <PencilSvg />
                        </div>
                    </li>
                ))}
            </ul>
            <p className="create-new-label" onClick={() => onEditLabel(null, 'Add')}>Create a new label</p>
        </section>
    )
}

