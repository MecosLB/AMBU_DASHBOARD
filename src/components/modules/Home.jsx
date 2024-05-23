import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';
import { API_URL } from '../../data/api';
import BarChart from './BarChart';
import AverageChart from './AverageChart';

const Home = () => {
    const [todayTickets, setTodayTickets] = useState([]);
    const [solutionAvg, setAvg] = useState([]);
    const [stateTickets, setStateTickets] = useState([]);

    useEffect(() => {
        getTodayTickets();
        getSolutionAverage();
        getTicketsByState();
    }, []);

    const getTodayTickets = async () => {
        const { data } = await axios
            .get(`${API_URL}/ticket/get-today`)
            .catch(({ response }) => {
                const { data } = response;

                if (response.status !== '500')
                    return toast.error(data.message);
            });

        setTodayTickets(data);
    }

    const getSolutionAverage = async () => {
        const { data } = await axios
            .get(`${API_URL}/ticket/get-average`)
            .catch(({ response }) => {
                const { data } = response;

                if (response.status !== '500')
                    return toast.error(data.message);
            });

        const { avgDurationByPriority: averageData } = data;
        const { Alta: high, Media: medium, Baja: low } = averageData

        setAvg({
            high: high.averageDuration,
            medium: medium.averageDuration,
            low: low.averageDuration,
        });
    }

    const getTicketsByState = async () => {
        const { data } = await axios
            .get(`${API_URL}/ticket/get-state`)
            .catch(({ response }) => {
                const { data } = response;

                if (response.status !== '500')
                    return toast.error(data.message);
            });

        const { count: active } = data.find(({ _id }) => _id === 'activo'),
            { count: following } = data.find(({ _id }) => _id === 'seguimiento'),
            { count: closed } = data.find(({ _id }) => _id === 'concluido');

        setStateTickets({
            active: active,
            following: following,
            closed: closed,
        });
    }

    return (
        <article id='home' className='container module-card shadow mb-auto overflow-auto'>
            <Breadcrumb moduleName='home' />

            <div className="row align-items-center">
                <article className="col-6">
                    <BarChart {...stateTickets} />
                </article>

                <article className="col-6">
                    <AverageChart {...solutionAvg} />
                </article>
            </div>
        </article>
    );
}

export default Home;
