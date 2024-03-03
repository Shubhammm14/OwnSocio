import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from '@mui/material';
import * as yup from 'yup';

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().min(6, "Password must be at least 6 characters").required('Password is required')
});

const Login = () => {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className=''>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className='w-full '>
          <div className='space-y-5 '>
            <div className=''>
              <Field
                className='w-full bg-white rounded-xl py-2 px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
                as={TextField}
                name='email'
                label="E-mail"
                variant="outlined"
              />
              <ErrorMessage name="email" component="div" className="text-yellow-500" />
            </div>
            <div className='flex flex-col '>
              <Field
                className='w-full bg-white rounded-xl py-2 px-4'
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
          <button type="submit" className=" w-[50%] text-center mt-4 hover:bg-pink-600 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg">
            Submit
          </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
