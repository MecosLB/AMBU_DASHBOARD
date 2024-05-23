import React from 'react';

const AverageChart = ({ high = 0, medium = 0, low = 0 }) => {
    return (
        <>
            <h6 className='text-center'>
                Minutos promedio de solución por estatus
            </h6>

            <p>
                {high}
            </p>
            <p>
                {medium}
            </p>
            <p>
                {low}
            </p>
        </>
    );
}

export default AverageChart;
