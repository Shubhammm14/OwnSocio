import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { registerUserAction } from '../../Redux/Auth/authAction';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'female' // Set the default value to 'female'
};

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    firstName: yup.string().trim().required('First Name is required'),
    lastName: yup.string().trim().required('Last Name is required'),
    password: yup.string().min(6, "Password must be at least 6 characters").required('Password is required'),
    gender: yup.string().required('Gender is required'),
});

const Register = () => {
    const [selectedGender, setSelectedGender] = useState('female'); // Initialize selectedGender with 'female'
    const dispatch=useDispatch();
    
    const handleSubmit = (values) => {
        values.gender=selectedGender;
        dispatch(registerUserAction({data:values}))
          navigate('/')
    };
   const navigate=useNavigate();
    return (
        <div className=''>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className='w-full'>
                    <div className='space-y-5'>
                        <div>
                            <Field
                                className='w-full bg-white rounded-xl py-2 px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
                                as={TextField}
                                name='email'
                                label="E-mail"
                                variant="outlined"
                            />
                            <ErrorMessage name="email" component="div" className="text-yellow-500" />
                        </div>
                        <div>
                            <Field
                                className='w-full bg-white rounded-xl py-2 px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
                                as={TextField}
                                name='firstName'
                                label="First Name"
                                variant="outlined"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-yellow-500" />
                        </div>
                        <div>
                            <Field
                                className='w-full bg-white rounded-xl py-2 px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
                                as={TextField}
                                name='lastName'
                                label="Last Name"
                                variant="outlined"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-yellow-500" />
                        </div>
                        <RadioGroup
                            className='px-5'
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                            value={selectedGender}
                            onChange={(event) => setSelectedGender(event.target.value)}
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio sx={{ '&:checked': { color: 'yellow' } }} />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="male"
                                control={<Radio sx={{ '&:checked': { color: 'yellow' } }} />}
                                label="Male"
                            />
                        </RadioGroup>


                        <ErrorMessage name="gender" component="div" className="text-yellow-500" />

                        <div>
                            <Field
                                className='w-full bg-white rounded-xl py-2 px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
                                as={TextField}
                                type="password"
                                name='password'
                                label="Password"
                                variant='outlined'
                            />
                            <ErrorMessage name="password" component="div" className="text-yellow-500" />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" className="w-[50%] text-center mt-4 hover:bg-pink-600 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg">
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
            <div className='text-yellow-600 p-4'>
                
                 Already Have An Account?
                
                 <button className='text-purple-700 px-2' onClick={()=>navigate('../')}>Login Now</button>
            </div>
        </div>
    );
};

export default Register;
