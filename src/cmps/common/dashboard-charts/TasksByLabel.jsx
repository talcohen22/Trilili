import { useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function TasksByLabel({ tasksByLabels }) {
    const boardLabels = tasksByLabels.labels.map((label) => { return label.title })
    const labelsColor = tasksByLabels.labels.map((label) => { return label.color })
    const options = {
        responsive: true,
        plugins: {
            Legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Tasks Count Per Label'
            },
        },
    }
    const data = {
        labels: boardLabels,
        datasets: [
            {
                label: 'Tasks count',
                data: tasksByLabels.taskCounts,
                backgroundColor: labelsColor.map((color) => { return color })
                ,
                borderColor: labelsColor.map((color) => { return color })
                ,
                borderWidth: 1,
            },
        ],
    }
    return (
        <Bar data={data} options={options} />
    )
}