import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../store/UsersSlice/UsersSlice';
import { fetchUsers, handleUpdateEmail } from '../../store/UsersSlice/UsersAPI';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

// Components
import Button from '@mui/material/Button';
import Loader from '../../Components/Loader/Loader';
import { TextField } from '@mui/material';
import { Formik } from 'formik';

const UpdateEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { users, updateEmail, acceptEmail } = useSelector(selectUsers);

    const [initialValues, setInitialValues] = useState({
        email: '',
    });

    useEffect(() => {
        if (acceptEmail.data.email) {
            setInitialValues({ email: acceptEmail.data.email });
        }
    }, [acceptEmail.data]);

    useEffect(() => {
        if (!users.list.length) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.list.length]);

    useEffect(() => {
        if (users.list.length) {
            const user = users.list.find((user) => user.id.toString() === id.toString());
            setInitialValues({
                email: user?.email || '',
            });
        }
    }, [id, users.list]);

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .typeError('Example: example@example.com')
            .email('Please write correct email')
            .required('This field is required'),
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
                        dispatch(handleUpdateEmail({ id, payload: values })).then((data) => {
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
                                    label='Email'
                                    value={values.email}
                                    style={{
                                        borderColor:
                                            errors.email && touched.email ? 'red' : 'teal',
                                    }}
                                    name='email'
                                    error={errors.email && touched.email}
                                    helperText={errors.email && touched.email && errors.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='w-full flex justify-end mt-4'>
                                <Button
                                    variant='contained'
                                    disabled={updateEmail.loading || acceptEmail.loading}
                                    onClick={handleSubmit}
                                >
                                    Update email
                                </Button>
                            </div>
                        </div>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default memo(UpdateEmail);
