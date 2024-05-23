import React from 'react';
import UserInfo from './topbar/UserInfo';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaHouse, FaTicket } from 'react-icons/fa6';
import axios from 'axios';
import { API_URL } from '../data/api';
import toast from 'react-hot-toast';

const SideBar = ({ user = {} }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        toast.dismiss();
        const token = localStorage.getItem('token');

        const { data } = await axios
            .put(`${API_URL}/session/logout/${token}`)
            .catch(({ response }) => {
                const { data } = response;

                if (response.status !== '500')
                    toast.error(data.message);
            });

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Sesión cerrada correctamente');
        navigate('/');
    }

    return (
        <div className="offcanvas offcanvas-end shadow" tabIndex="-1" id="sidebar">
            <div className="offcanvas-header">
                <UserInfo userName={user.userName} role={user.role} parkName={user.parkName} departmentName={user.departmentName} />

                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body d-flex flex-column">
                <p className='title'>
                    Módulos
                </p>
                <hr />

                <ul className='modules-list list-unstyled d-flex flex-column gap-3'>
                    <li>
                        <Link to={`./`}>
                            <FaHouse />
                            Inicio

                            <span>
                                <FaArrowRight />
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link to={`./tickets`}>
                            <FaTicket />
                            Incidencias

                            <span>
                                <FaArrowRight />
                            </span>
                        </Link>
                    </li>
                </ul>

                <button className="btn btn-cancel mt-auto mx-auto shadow" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default SideBar;
