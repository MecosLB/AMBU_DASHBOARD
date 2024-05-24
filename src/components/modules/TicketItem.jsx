import React from 'react';

const priorityColor = {
    alta: 'text-high',
    media: 'text-medium',
    baja: 'text-low',
}

const TicketItem = ({ uid = '', department_data = {}, category = '', evidence = [], comment = '', date = {}, priority = '', handleClick }) => {
    return (
        <div className='item d-flex align-items-center gap-3' data-bs-toggle="offcanvas" data-bs-target="#ticketbar" aria-controls="ticketbar" onClick={() => handleClick(uid)}>
            <picture className='photo'>
                <img className='w-100' src={`data:image/png;base64,${evidence[0].data}`} aria-hidden="true" />
            </picture>

            <div className='info overflow-hidden w-100'>
                <p className='mb-0 uid text-overflow'>
                    {uid} - <span className={`${priorityColor[priority.toLocaleLowerCase()]}`}>{priority}</span>
                </p>

                <p className='mb-2 department text-overflow'>
                    {department_data.name} - {category}
                </p>

                <p className={`mb-3 comment ${comment ? null : 'd-none '}`}>
                    {comment}
                </p>

                <small className='date'>
                    {[...(date.creation).split('T')].shift()}
                </small>
            </div>
        </div>
    );
}

export default TicketItem;
