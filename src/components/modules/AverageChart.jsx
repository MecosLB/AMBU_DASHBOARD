import React from 'react';
import { FaClock } from 'react-icons/fa6';

const template = {
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
}

const stringAvg = ({ days = 0, hours = 12, mins = 1, secs = 0 }) => {
    let result;

    if (days) {
        result = <p className='mb-0'>{days}<small>d</small> {hours}<small>H</small></p>;
        return result;
    }

    result = <p className='mb-0'>{hours}<small>H</small> {mins}<small>M</small></p>;

    return result;
}

const AverageChart = ({ high = template, medium = template, low = template }) => {
    return (
        <>
            <h6 className='text-center mb-5'>
                Tiempo promedio de solución por prioridad
            </h6>

            <div className='d-flex align-items-center justify-content-center flex-wrap mb-5'>
                <div className='text-center px-4'>
                    <h5 className='text-high'>
                        Alta
                    </h5>

                    <span className='counter d-flex align-items-center gap-1'>
                        <FaClock />
                        {stringAvg(high)}
                    </span>
                </div>

                <div className='text-center px-4 middle-border'>
                    <h5 className='text-medium'>
                        Media
                    </h5>

                    <span className='counter d-flex align-items-center gap-1'>
                        <FaClock />
                        {stringAvg(medium)}
                    </span>
                </div>

                <div className='text-center px-4'>
                    <h5 className='text-low'>
                        Baja
                    </h5>

                    <span className='counter d-flex align-items-center gap-1'>
                        <FaClock />
                        {stringAvg(low)}
                    </span>
                </div>
            </div>
        </>
    );
}

export default AverageChart;
