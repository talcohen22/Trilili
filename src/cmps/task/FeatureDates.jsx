import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export function FeatureDates() {
    return (
        <section className="feature-dates scroll">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker orientation="landscape" />
            </LocalizationProvider>
            <p>Start date</p>
            <div className='flex'>
                <input type="checkbox" />
                <input type="text" placeholder="M/D/YYYY" />
            </div>
            <p>Due date</p>
            <div className='flex'>
                <input type="checkbox" />
                <input type="text" placeholder="" />
                <input type="text" />
            </div>
            <button>Save</button>
            <button>Remove</button>
        </section>
    )
}