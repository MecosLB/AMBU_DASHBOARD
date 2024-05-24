import React from 'react';
import { FaRegCircleDot } from 'react-icons/fa6';

const priorityColor = {
    alta: 'text-high',
    media: 'text-medium',
    baja: 'text-low',
}

const statusColor = {
    concluido: 'high',
    seguimiento: 'medium',
    activo: 'low',
}

const Header = ({ uid = '', evidence = [], priority = '', department = '', category = '', state = 'Activo', agent = '' }) => {
    return (
        <section className='header d-flex align-items-center gap-3'>
            <picture className='photo'>
                <img className='w-100' src={`data:image/png;base64,${evidence[0] ? evidence[0].data : ''}`} aria-hidden="true" />
            </picture>

            <div className='info overflow-hidden w-100'>
                <p className='mb-0 uid text-overflow'>
                    {uid} - <span className={`${priorityColor[priority.toLocaleLowerCase()]}`}>{priority}</span>
                </p>

                <h5 className='mb-2 department text-overflow'>
                    {department} - {category}
                </h5>

                <span className={`status mb-3 bg-${statusColor[state]}`}>
                    <FaRegCircleDot className={`text-${statusColor[state]}`} />
                    <small>
                        {state}
                    </small>
                </span>

                <p className='agent text-overflow'>
                    Subido por <span>{agent}</span>
                </p>
            </div>

        </section>
    );
}

export default Header;
