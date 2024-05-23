import React from 'react';
import mainLogo from '../assets/images/logo.png';
import { FaBarsStaggered } from 'react-icons/fa6';
import UserInfo from './topbar/UserInfo';

const TopBar = ({ user = {} }) => {
    return (
        <nav id='topBar' className='sticky-top mb-auto'>
            <div className="container py-3">
                <picture className='logo'>
                    <img src={mainLogo} alt="Agencia de Bosques Urbanos del Área Metropolitana de Guadalajara" />
                </picture>

                <UserInfo userName={user.userName} role={user.role} parkName={user.parkName} departmentName={user.departmentName} />

                <button className='btn btn-nav' data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                    <FaBarsStaggered />
                </button>
            </div>
        </nav>
    );
}

export default TopBar;
