import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../store/UsersSlice/UsersSlice';
import { fetchUsers, handleUpdatePhone } from '../../store/UsersSlice/UsersAPI';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

// Components
import Loader from '../../Components/Loader/Loader';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Formik } from 'formik';

const UpdatePhone = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { users, updatePhone, acceptPhone } = useSelector(selectUsers);

    const [initialValues, setInitialValues] = useState({
        phone: '',
    });

    useEffect(() => {
        if (acceptPhone.data.phone) {
            setInitialValues({ phone: acceptPhone.data.phone });
        }
    }, [acceptPhone.data]);

    useEffect(() => {
        if (!users.list.length) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.list.length]);

    useEffect(() => {
        if (users.list.length) {
            const user = users.list.find((user) => user.id.toString() === id.toString());
            setInitialValues({
                phone: user?.phone || '',
            });
        }
    }, [id, users.list]);

    const validationSchema = yup.object().shape({
        phone: yup.number().typeError('Must be a string').required('This field is required'),
    });

    return (
        <div className='flex flex-col items-center justify-center gap-8 max-w-[600px] mx-auto mt-8 px-4'>
            {users.loading ? (
                <div className='w-full flex items-center justify-center mt-16'>
                    <Loader />
                </div>
            ) : (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={(values, { resetForm }) => {
                        setInitialValues(values);
                        dispatch(handleUpdatePhone({ id, payload: values })).then((data) => {
                            if (!data.type.includes('rejected')) navigate('/');
                        });
                        resetForm();
                    }}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isValid,
                        dirty,
                        handleSubmit,
                    }) => (
                        <div className='w-full'>
                            <div className='w-full flex flex-col gap-4'>
                                <TextField
                                    label='Phone'
                                    value={values.phone}
                                    type='number'
                                    style={{
                                        borderColor:
                                            errors.phone && touched.phone ? 'red' : 'teal',
                                    }}
                                    name='phone'
                                    error={errors.phone && touched.phone}
                                    helperText={errors.phone && touched.phone && errors.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='w-full flex justify-end mt-4'>
                                <Button
                                    variant='contained'
                                    disabled={updatePhone.loading || acceptPhone.loading}
                                    onClick={handleSubmit}
                                >
                                    Update phone
                                </Button>
                            </div>
                        </div>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default memo(UpdatePhone);
