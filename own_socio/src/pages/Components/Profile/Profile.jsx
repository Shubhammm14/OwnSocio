import React, { useState } from 'react';
import { Avatar, Box, Card, Tab, Tabs, createTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import PostCard from '../Post/PostCard';
import UserReelCard from '../Reels/UserReelCard';

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" }
];

const Profile = () => {
  const dummy = [1,1,1,1,1,1,1,1,1,1];
  const { id } = useParams();
  const [value, setValue] = useState('post');
  
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

  return (
    <Card className='py-10 flex  flex-col justify-center items-center '>
      <div className='rounded-md border border-2  w-[70%] '>
        <div className='bg-black  shadow-2xl'>
        <div className='h-[15rem]'>
          <img className='rounded-t-md h-full w-full' src='https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_640.png' alt="Profile Banner" />
        </div>
        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar src='https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png' className='border border-4 border-purple-500 rounded-full transform -translate-y-24' sx={{ width: '10rem', height: '10rem' }} />
          <button className='text-purple-600 border border-2 border-purple-500 px-4 py-1 rounded-full'>EDIT PROFILE</button>
        </div>
        <div className='p-10 pb-0 text-purple-600' style={{fontFamily:"cursive"}}>
          <p className='p-2 text-4xl' style={{fontFamily:"inherit"}}>Shubham Shaw</p>
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
            ):value==='reels'?(
              <div className='flex flex-wrap gap-2 justify-center   '>
                {dummy.map((_, index) => <UserReelCard key={index} />)}
                </div>
            ):""}
          </div>
      </div>
      
    </Card>
  );
};

export default Profile;
