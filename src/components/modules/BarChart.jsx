import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
        },
    },
};

const labels = ['Activo', 'Seguimiento', 'Concluido'];

const BarChart = ({ active = 0, following = 0, closed = 0 }) => {
    const data = {
        labels,
        datasets: [
            {
                label: 'Incidencias',
                data: [active, following, closed],
                backgroundColor: [
                    'rgba(117, 183, 152, 0.2)',
                    'rgba(255, 218, 106, 0.2)',
                    'rgba(234, 134, 143, 0.2)',
                ],
                borderColor: [
                    'rgba(117, 183, 152, 1)',
                    'rgba(255, 218, 106, 1)',
                    'rgba(234, 134, 143, 1)',
                ],
                borderWidth: 1
            },
        ],
    };

    return (
        <>
            <h6 className='text-center'>
                Incidencias registradas por estatus
            </h6>

            <Bar options={options} data={data} />
        </>
    );
}

export default BarChart;
