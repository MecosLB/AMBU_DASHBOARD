import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../data/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const textDict = {
    activo: 'Dar seguimiento',
    seguimiento: 'Concluir',
}

const classDict = {
    activo: 'follow',
    seguimiento: 'end',
}

const Loader = ({ loading = true }) => {
    if (!loading) return null;

    return <div className="spinner sm mx-auto"></div>;
}

const Action = ({ uid, state, closeBtn, isUpdating, updateTickets }) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const handleClick = async () => {
        const newStatus = {
            activo: 'seguimiento',
            seguimiento: 'concluido',
        }

        setLoading(true);
        const { data } = await axios
            .put(`${API_URL}/ticket/${uid}`, {
                state: newStatus[state],
            })
            .catch(({ response }) => {
                const { data } = response;

                if (response.status !== '500')
                    return toast.error(data.message);
            });
        setLoading(false);

        if (!data) return;

        updateTickets(!isUpdating);
        toast.success('Incidencia actualizada');
        closeBtn.current?.click();
        navigate('/');

    }

    return (
        <div className='d-flex justify-content-center mt-4 mb-4'>
            <button className={`btn btn-${classDict[state]}`} onClick={handleClick}>
                <Loader loading={isLoading} />

                <span className={isLoading ? 'd-none' : ''}>
                    {textDict[state]}
                </span>
            </button>
        </div>
    );
}

export default Action;
