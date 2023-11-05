import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export function TaskStatusPrecentage({ taskStatus }) {
    const statusLabels = ["Done, Undone"]
    const StatusPrecentage = [taskStatus.done.percentage, taskStatus.undone.percentage]
    
    const options = {
        responsive: true,
        plugins: {
            Legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Tasks Status'
            },
        },
    }


    const data = {
        labels: statusLabels,
        datasets: [
            {
                label: '%',
                data: StatusPrecentage,
                backgroundColor: [
                    '#a6d2a7',
                    '#fcecc7'
                ],
                borderColor: [
                    '#a6d2a7',
                    '#fcecc7'
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <Doughnut data={data} options={options} />
    )
}