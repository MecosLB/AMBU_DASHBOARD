import React from 'react';

const Description = ({ comment = '' }) => {
    return (
        <section className={`description py-4 ${comment ? null : 'd-none'}`}>
            <h6>
                Descripción de la incidencia
            </h6>

            <div className='globe'>
                <p>
                    {comment}
                </p>
            </div>
        </section>
    );
}

export default Description;
