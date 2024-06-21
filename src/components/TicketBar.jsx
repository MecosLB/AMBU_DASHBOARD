import React, { useRef } from 'react';
import Header from './ticket/Header';
import Description from './ticket/Description';
import Gallery from './ticket/Gallery';
import Location from './ticket/Location';
import Action from './ticket/Action';

const TicketBar = ({ _id = '', uid = '', department_data = {}, agent_data = {}, category = '', evidence = [], comment = '', date = {}, priority = '', state = 'Activo', coordinates = {}, isUpdating, updateTickets }) => {
    const closeBtn = useRef();

    return (
        <div className="offcanvas offcanvas-start shadow" tabIndex="-1" id="ticketbar">
            <div className="offcanvas-header">
                <button type="button" ref={closeBtn} className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body d-flex flex-column">
                <Header uid={uid} priority={priority} evidence={evidence} department={department_data.name} category={category} state={state} agent={agent_data.name} />

                <Action uid={_id} state={state} closeBtn={closeBtn} isUpdating={isUpdating} updateTickets={updateTickets} />

                <Description comment={comment} />

                <Gallery evidence={evidence} />

                <Location coordinates={coordinates} />
            </div>
        </div>
    );
}

export default TicketBar;
