import React, { memo, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../store/UsersSlice/UsersSlice';
import {
    fetchAllergies,
    fetchUsers,
    handleUpdateAllergies,
} from '../../store/UsersSlice/UsersAPI';

// Components
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import { Autocomplete, TextField } from '@mui/material';
import Loader from '../../Components/Loader/Loader';

const UpdateAllergies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { users, allergies, updateAllergies } = useSelector(selectUsers);
    const [initialValues, setInitialValues] = useState({
        allergies: [],
    });

    const validationSchema = yup.object().shape({
        allergies: yup.array().min(1, 'Select at least one allergy'),
    });

    useEffect(() => {
        if (
            updateAllergies.data.user &&
            updateAllergies.data.user.allergies &&
            updateAllergies.data.user.allergies.length
        ) {
            setInitialValues({ allergies: updateAllergies.data.user.allergies });
        }
    }, [updateAllergies.data]);

    useEffect(() => {
        if (!allergies.list.length) {
            dispatch(fetchAllergies());
        }
    }, [dispatch, allergies.list.length]);

    // Using different useEffect to escape duplicated requests
    useEffect(() => {
        if (!users.list.length) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.list.length]);

    useEffect(() => {
        if (users.list.length) {
            const user = users.list.find((user) => user.id.toString() === id.toString());
            setInitialValues({
                allergies: user.allergies || [],
            });
        }
    }, [id, users.list]);

    return (
        <div className='flex flex-col items-center justify-center gap-8 max-w-[600px] mx-auto mt-8 px-4'>
            {users.loading || allergies.loading ? (
                <div className='w-full flex items-center justify-center mt-16'>
                    <Loader />
                </div>
            ) : (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={(values, { resetForm }) => {
                        setInitialValues(values);
                        dispatch(handleUpdateAllergies({ id, payload: values })).then(
                            (data) => {
                                if (!data.type.includes('rejected')) navigate('/');
                            },
                        );
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
                        setFieldValue,
                    }) => (
                        <div className='w-full'>
                            <div className='w-full flex flex-col gap-4'>
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
                                            error={
                                                touched.allergies && Boolean(errors.allergies)
                                            }
                                            helperText={touched.allergies && errors.allergies}
                                        />
                                    )}
                                    name='allergies'
                                    value={values.allergies}
                                    isOptionEqualToValue={(option, value) =>
                                        option.value === value.value
                                    }
                                    onChange={(event, value) =>
                                        setFieldValue('allergies', value)
                                    }
                                />
                            </div>

                            <div className='w-full flex justify-end mt-4'>
                                <Button
                                    variant='contained'
                                    disabled={updateAllergies.loading}
                                    onClick={handleSubmit}
                                >
                                    Update allergies
                                </Button>
                            </div>
                        </div>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default memo(UpdateAllergies);
