import React, { memo } from 'react';

// Components
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className='flex justify-between items-center px-4 py-8 md:p-8 h-[60px] bg-teal-500'>
            <Link to={'/'}>
                <h1 className='text-[24px] text-white font-bold'>Website</h1>
            </Link>

            <Link to='/register-user'>
                <Button variant='contained'>Add new user</Button>
            </Link>
        </div>
    );
};

export default memo(MainPage);
