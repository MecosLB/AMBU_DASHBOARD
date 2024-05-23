import React, { useEffect } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';

const Dashboard = () => {
    return (
        <>
            <section className='bg-main full-container'>
                <TopBar />
                <SideBar />

                <Outlet />
            </section>
        </>
    );
}

export default Dashboard;
