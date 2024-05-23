import React, { useState } from 'react';
import { FaLock, FaUser } from "react-icons/fa6";
import mainLogo from '../assets/images/logo.png';
import toast from 'react-hot-toast';
import { API_URL } from '../data/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        toast.dismiss();
        
        if (!username)
            return toast.error("Ingrese un nombre de usuario")
        if (!password)
            return toast.error("Ingrese una contraseña")

        const toastLoading = toast.loading('Iniciando sesión...');
        const credentials = {
            username: username,
            password: password,
        }

        const { data } = await axios
            .post(`${API_URL}/session/login`, credentials)
            .catch(({ response }) => {
                const { data } = response;

                if (response.status !== '500')
                    return toast.error(data.message);
            })
            .finally(() => {
                toast.dismiss(toastLoading);
            });

        if (!data) return;

        const { user, session } = data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', session._id);
        toast.success('Sesión iniciada correctamente');
        navigate('/dashboard');
    }

    return (
        <section id='login' className='full-container d-flex justify-content-center align-items-center '>
            <picture className='logo'>
                <img src={mainLogo} alt="Agencia de Bosques Urbanos del Área Metropolitana de Guadalajara" />
            </picture>

            <div className="login-card d-flex flex-column">
                <h5 className='mb-5'>
                    Ingresar<br/>
                    Administrador
                </h5>

                <div className="input-group mb-4 shadow">
                    <span className="input-group-text">
                        <FaUser />
                    </span>
                    <input type="text" className="form-control" placeholder="Usuario" aria-label="Usuario" value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>

                <div className="input-group mb-4 shadow">
                    <span className="input-group-text">
                        <FaLock />
                    </span>
                    <input type="password" className="form-control" placeholder="Contraseña" aria-label="Contraseña" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>

                <button className="btn btn-main mx-auto shadow" onClick={handleLogin}>
                    Iniciar sesión
                </button>
            </div>
        </section>
    );
}

export default Login;
