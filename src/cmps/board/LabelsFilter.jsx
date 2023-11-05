import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { boardService } from "../../services/board.service.local";
import { PencilSvg } from "../svg/ImgSvg";


export function LabelsFilter({ board, filterBy, onSetFilterBy }) {

    const inUseLabels = boardService.getInUseLabels(board)

    return (
        <section className="labels-filter">

            <h2>Labels</h2>

            <ul className="label-options">
                {inUseLabels.map(label => (
                    <li className="flex align-center" key={label.id}>
                        <FormGroup className="checkbox-item">
                            <FormControlLabel control={<Checkbox
                                className="mui-check-box"
                                checked={filterBy.labels.includes(label.id)}
                                onChange={(ev) => onSetFilterBy(ev, 'labels', label.id)}
                            />}
                                label={<div className="color-display"
                                    style={{ backgroundColor: label.color }}>
                                    {label.title}
                                </div>}
                                sx={{ '& .MuiSvgIcon-root': { height: '23px' } }} />
                        </FormGroup>
                    </li>
                ))}
            </ul>

        </section>
    )
}