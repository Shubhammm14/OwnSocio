import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Storycircle = ({ item }) => {
  
  const { auth } = useSelector(store => store);
  

  // Check if item and item[0].user are defined before accessing properties
  const userName = item && item[0] && item[0].user ? item[0].user.firstName : '';
  const navigate = useNavigate();
  console.log("ii",item)
  return (
    <div className='px-1 text-center'>
      <Avatar
        src={item && item[0]?.user?.profileImg || ''}
        sx={{
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
        }}
        onClick={() => {
          auth.Stories=item
          navigate(`/stories/${item[0].user.id}`)
          console.log('Avatar clicked!');
        }}
      >
      </Avatar>
      <p className='overflow-x-hidden'> {item && item[0]?.user?.id === (auth?.user?.id || '') ? 'your' : userName}</p>
    </div>
  );
}

export default Storycircle;
