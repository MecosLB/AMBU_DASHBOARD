import React from 'react';
import { FaCircleUser, FaTree } from 'react-icons/fa6';

const UserInfo = ({ userName = 'User Name', role = 'Supervisor', parkName = 'Metropolitano', departmentName = 'Forestal', }) => {
    return (
        <article className='user-info'>
            <span className='photo'>
                <FaCircleUser />
            </span>

            <div>
                <small className='park'>
                    <FaTree />
                    {parkName}
                </small>

                <h5 className='name'>
                    {userName}
                </h5>

                <small className='role'>
                    {role} - {departmentName}
                </small>
            </div>
        </article>
    );
}

export default UserInfo;