import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { registerNewUser } from '../../store/RegisterSlice/RegisterAPI';
import { selectRegister } from '../../store/RegisterSlice/RegisterSlice';
import { fetchAllergies } from '../../store/UsersSlice/UsersAPI';
import { selectUsers } from '../../store/UsersSlice/UsersSlice';
import { useNavigate } from 'react-router-dom';

// Components
import { Formik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

export const RegisterUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register } = useSelector(selectRegister);
    const { allergies } = useSelector(selectUsers);

    useEffect(() => {
        if (!allergies.list.length) {
            dispatch(fetchAllergies());
        }
    }, []);

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .typeError('Must be a string')
            .min(2, 'Name should contain at least 2 characters')
            .required('This field is required'),
        email: yup
            .string()
            .typeError('Example: example@example.com')
            .email('Please write correct email')
            .required('This field is required'),
        phone: yup.number().typeError('Must be a string').required('This field is required'),
        allergies: yup.array().min(1, 'Select at least one allergy'),
    });

    return (
        <div className='max-w-[600px] flex flex-col justify-center items-center gap-6 mx-auto px-4' id='registerUser'>
            <h1 className='text-4xl xl:text-5xl font-semibold my-8 text-center'>Sign Up a new user</h1>

            <Formik
                initialValues={{ name: '', email: '', phone: '', allergies: [] }}
                onSubmit={(values, { resetForm }) => {
                    dispatch(registerNewUser(values)).then((data) => {
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
                    setFieldValue,
                    handleSubmit,
                }) => (
                    <div className='w-full'>
                        <div className='w-full flex flex-col gap-4'>
                            <TextField
                                label='Name'
                                value={values.name}
                                style={{
                                    borderColor: errors.name && touched.name ? 'red' : 'teal',
                                }}
                                name='name'
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name && errors.name}
                                onChange={handleChange}
                            />
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
                            <TextField
                                label='Phone Number'
                                type='number'
                                value={values.phone}
                                style={{
                                    borderColor:
                                        errors.phone && touched.phone ? 'red' : 'teal',
                                }}
                                name='phone'
                                error={errors.phone && touched.phone}
                                helperText={errors.phone && touched.phone && errors.phone}
                                onChange={handleChange}
                            />

                            <Autocomplete
                                multiple
                                limitTags={2}
                                id='multiple-limit-tags'
                                options={allergies.list.map((e) => ({
                                    label: e,
                                    value: e.toLowerCase() + '_',
                                }))}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Allergies'
                                        error={touched.allergies && Boolean(errors.allergies)}
                                        helperText={touched.allergies && errors.allergies}
                                    />
                                )}
                                name='allergies'
                                value={values.allergies}
                                isOptionEqualToValue={(option, value) =>
                                    option.value === value.value
                                }
                                onChange={(event, value) => setFieldValue('allergies', value)}
                            />
                        </div>

                        <div className='w-full flex justify-end mt-4'>
                            <Button
                                variant='contained'
                                disabled={register.loading}
                                onClick={handleSubmit}
                            >
                                Create Account
                            </Button>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default memo(RegisterUser);
