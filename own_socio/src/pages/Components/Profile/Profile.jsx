import React, { useState } from 'react';
import { Avatar, Box, Card, Modal, Tab, Tabs, TextField, Typography, createTheme } from '@mui/material';
import {  useParams } from 'react-router-dom';
import PostCard from '../Post/PostCard';
import UserReelCard from '../Reels/UserReelCard';
import { ErrorMessage, Field, Formik,Form } from 'formik';
import * as yup from 'yup';


const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" }
];


const initialValues = {

  first_name: '',
  last_name: '',
  bio: '',
  website: ''
};

const validationSchema = yup.object().shape({

  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  bio: yup.string().max(200, 'Bio must be at most 200 characters'),

});

const Profile = () => {
  const dummy = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const { id } = useParams();
  const [value, setValue] = useState('post');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = createTheme({
    palette: {
      purple: {
        600: '#7c3aed', // Adjust the hex value according to your preference
      },
    },
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: 'white',

    boxShadow: '5px 5px purple', // Wrapped the shadow value in quotes
    padding: '4px' // Changed 'p' to 'padding' and wrapped the value in quotes
  };





  const handleSubmit = (values) => {
    console.log("hiiiii")
    handleClose()
    console.log("Form values:", values);
  };
  return (
    <Card className='py-10 flex  flex-col justify-center items-center '>
      <div className='rounded-md border border-2  w-[70%] '>
        <div className='bg-black  shadow-2xl'>
          <div className='h-[15rem]'>
            <img className='rounded-t-md h-full w-full' src='https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_640.png' alt="Profile Banner" />
          </div>
          <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
            <Avatar src='https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png' className='border border-4 border-purple-500 rounded-full transform -translate-y-24' sx={{ width: '10rem', height: '10rem' }} />
            <button className='text-purple-600 border border-2 border-purple-500 px-4 py-1 rounded-full' onClick={handleOpen}>EDIT PROFILE</button>

          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography>
                <div className='flex flex-col justify-center items-center'>
                  <div className='w-[90%] '>
                    <div className='flex text-purple-900 justify-between m-4'>

                      <div className="flex text-lg items-center">
                        <span className="text-4xl">&times;</span>
                        <span className="mx-2">Edit Profile</span>
                      </div>

                  
                    </div>
                    <div className=' '>
                      <img className='w-full h-[25vh] rounded-xl' src='https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_640.png' />
                    </div>
                    <div>
                      <Avatar src='https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png' className='border border-4 border-purple-500 rounded-full transform -translate-y-24 mx-5 mb-0' sx={{ width: '10rem', height: '10rem' }} />
                    </div>

                    <div>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >

                        <Form className='w-full' >
                          <div className='space-y-5'>
                            <div className=''>
                              <Field
                                className='w-full bg-white rounded-xl py-2 px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
                                as={TextField}
                                name='first_name'
                                label="First Name"
                                variant="outlined"
                              />
                              <ErrorMessage name="first_name" component="div" className="text-yellow-500" />
                            </div>
                            <div className='flex flex-col'>
                              <Field
                                className='w-full bg-white rounded-xl py-2 px-4'
                                as={TextField}
                                name='last_name'
                                label="Last Name"
                                variant='outlined'
                              />
                              <ErrorMessage name="last_name" component="div" className="text-yellow-500" />
                            </div>

                            <div className='flex flex-col'>
                              <Field
                                className='w-full bg-white rounded-xl py-2 px-4'
                                as={TextField}
                                name='bio'
                                label="Bio"
                                variant='outlined'
                              />
                              <ErrorMessage name="bio" component="div" className="text-yellow-500" />
                            </div>

                            <div className='flex flex-col'>
                              <Field
                                className='w-full bg-white rounded-xl py-2 px-4'
                                as={TextField}
                                name='website'
                                label="Website"
                                variant='outlined'
                              />
                              <ErrorMessage name="website" component="div" className="text-yellow-500" />
                            </div>
                          </div>
                          <div className='flex justify-center'>
                            <button type="submit" className="w-[20%] text-center mt-4 hover:bg-pink-600 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg">
                              Save
                            </button>
                          </div>
                        </Form>
                      </Formik>


                    </div>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
          <div className='p-10 pb-0 text-purple-600' style={{ fontFamily: "cursive" }}>
            <p className='p-2 text-4xl' style={{ fontFamily: "inherit" }}>Shubham Shaw</p>
            <p className='px-2'>@ShubhamCdd</p>
            <div className='flex p-4'>
              <span>41 posts</span>
              <span className='px-4'>71 followers</span>
              <span>22 followings</span>
            </div>
          </div>
          <section className='px-7 pt-5 '>
            <Box sx={{ width: '100%' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ borderBottom: `4px solid ${theme.palette.divider}`, color: theme.palette.purple[600] }}>
                {tabs.map((item) => (
                  <Tab key={item.value} value={item.value} label={item.name} style={{ color: theme.palette.purple[600] }} />
                ))}
              </Tabs>

            </Box>

          </section></div>

        <div className='flex flex-col items-center'>
          {value === 'post' ? (
            <div className='w-[80%]'>
              {dummy.map((_, index) => <PostCard key={index} />)}
            </div>
          ) : value === 'reels' ? (
            <div className='flex flex-wrap gap-2 justify-center   '>
              {dummy.map((_, index) => <UserReelCard key={index} />)}
            </div>
          ) : ""}
        </div>
      </div>

    </Card>
  );
};

export default Profile;
