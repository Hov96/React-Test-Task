import React from 'react';

// Components
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';

const MainPageWrapper = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default MainPageWrapper;
