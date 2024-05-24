import React, { useEffect, useState } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import TicketBar from '../components/TicketBar';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [activeTicket, setActiveTicket] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        const { agent_data, department_data, park_data } = JSON.parse(localStorage.getItem('user'));

        setUser({
            userName: agent_data.name,
            role: agent_data.role,
            departmentName: department_data.name,
            parkName: park_data.name,
        });
    }
    return (
        <>
            <section className='bg-main full-container d-flex flex-column justify-content-center'>
                <TopBar user={{ ...user }} />
                <SideBar user={{ ...user }} />

                <Outlet context={[activeTicket, setActiveTicket]} />
                <TicketBar {...activeTicket} />
            </section>
        </>
    );
}

export default Dashboard;
