import React from 'react';
import { FaHouse, FaTicket } from 'react-icons/fa6';

const module = {
    home: {
        text: 'Inicio',
        icon: <FaHouse />
    },
    tickets: {
        text: 'Incidencias',
        icon: <FaTicket />
    }
}

const Breadcrumb = ({ moduleName = 'home' }) => {
    return (
        <>
            <div className='breadcrumb'>
                {module[moduleName].icon}

                <h5>
                    {module[moduleName].text}
                </h5>
            </div>

            <hr className='divider' />
        </>
    );
}

export default Breadcrumb;
