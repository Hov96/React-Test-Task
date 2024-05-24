import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/UsersSlice/UsersAPI';
import { selectUsers } from '../store/UsersSlice/UsersSlice';

// Components
import UserCard from '../Components/UserCard';
import Loader from '../Components/Loader/Loader';

const MainPage = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(selectUsers);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    return (
        <>
            {users.loading ? (
                <div className='w-full flex items-center justify-center mt-16'>
                    <Loader />
                </div>
            ) : users.error ? (
                <div className='p-4'>Some error message</div>
            ) : (
                <div className='p-4'>
                    <h1 className='underline text-4xl'>Users list</h1>
                    <div className='flex items-start justify-start flex-wrap gap-8 mt-5'>
                        {users.list.length ? (
                            users.list.map((user) => <UserCard user={user} key={user.id} />)
                        ) : (
                            <div>No users yet</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(MainPage);
