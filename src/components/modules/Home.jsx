import React, { useEffect, useState } from 'react';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';
import { API_URL } from '../../data/api';
import BarChart from './BarChart';
import AverageChart from './AverageChart';
import toast from 'react-hot-toast';
import TicketItem from './TicketItem';
import { useOutletContext } from 'react-router-dom';

const formatAvg = (ms = 0) => {
    const secs = ms / 1000,
        mins = secs / 60,
        hours = mins / 60,
        days = hours / 24;

    return {
        days: Math.round(days),
        hours: Math.round(hours % 24),
        mins: Math.round(mins % 60),
        secs: Math.round(secs % 60),
    };
}

const Loader = ({ loading = true }) => {
    if (!loading) return null;

    return <div className="spinner mx-auto"></div>;
}

const Home = () => {
    const [isLoading, setLoading] = useState(false);
    const [todayTickets, setTodayTickets] = useState([]);
    const [solutionAvg, setAvg] = useState([]);
    const [stateTickets, setStateTickets] = useState([]);

    const [activeTicket, setActiveTicket] = useOutletContext();

    useEffect(() => {
        getTodayTickets();
        getSolutionAverage();
        getTicketsByState();
    }, []);

    const getTodayTickets = async () => {
        setLoading(true);
        const { data } = await axios
            // .get(`${API_URL}/ticket/get-today`)
            .post(`${API_URL}/ticket/get-ticket`)
            .catch(({ response }) => {
                const { data } = response;

                if (response.status !== '500')
                    return toast.error(data.message);
            });
        setLoading(false);

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
            high: formatAvg(high.averageDuration),
            medium: formatAvg(medium.averageDuration),
            low: formatAvg(low.averageDuration),
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

    const handleClick = (_uid = '') => {
        const ticket = [...todayTickets].find(({ uid }) => uid === _uid)
        
        setActiveTicket({
            ...ticket
        });
    }

    return (
        <article id='home' className='container module-card shadow mb-auto overflow-auto'>
            <Breadcrumb moduleName='home' />

            <div className="row align-align-items-start gap-5 gap-lg-0">
                <article className='tickets col-12 col-lg-6 px-3 mb-0 mb-lg-5'>
                    <Loader loading={isLoading} />

                    {
                        todayTickets.map((ticket, index) => {
                            return <TicketItem key={index} handleClick={handleClick} {...ticket} />
                        })
                    }
                </article>

                <article className="col-12 col-lg-6 px-5">
                    <AverageChart {...solutionAvg} />

                    <BarChart {...stateTickets} />
                </article>
            </div>
        </article>
    );
}

export default Home;
