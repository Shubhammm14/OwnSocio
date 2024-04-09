import React, { useEffect, useState } from 'react';
import PopularUserCard from '../UsersCards/PopularUserCard';
import { Avatar, Card, CardHeader, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findSuggestions, searchUserAction } from '../../../Redux/Auth/authAction';
import { Navigate, useNavigate } from 'react-router-dom';

const HomeRight = () => {
  const { auth } = useSelector(store => store);
  const [searchUser, setSearchUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchuser = (e) => {
    const value = e.target.value;
    setSearchUser(value);
    dispatch(searchUserAction(value));
  };

  useEffect(() => {
    dispatch(findSuggestions());
  }, []);

  const handleClick = ({ id }) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className=''>
      <div className='m-5 my-10 relative'>
        <Input
          onChange={handleSearchuser}
          value={searchUser}
          className='outline-none w-[90%] rounded-full px-5 bg-transparent border shadow-xl shadow-purple-300 ml-3'
          placeholder="Type something..."
        />
        {searchUser && auth.SearchedUser && (
          auth.SearchedUser.map((item) => (
            <Card key={item.id} className="absolute top-[3rem] w-full z-10 cursor-pointer" onClick={() => handleClick({ id: item.id })}>
              <CardHeader
                avatar={<Avatar src={item.profileImg} />}
                title={item.firstName + ' ' + item.lastName}
                subheader={`@${item.firstName.toLowerCase()}_${item.lastName.toLowerCase()}${item.id}`}
              />
            </Card>
          ))
        )}
      </div>
      <div className='flex justify-between items-center mx-10'>
        <p className='font-semibold opacity-70 text-purple-900' style={{ fontFamily: 'cursive' }}>Suggestions for you</p>
        <p className='text-xs font-semibold opacity-95 cursor-pointer text-purple-900' onClick={() => dispatch(findSuggestions())}>Refresh</p>
      </div>
      <div className='space-y-4'>
        {auth.suggestions&&auth.suggestions.map((item) => (
          <PopularUserCard key={item.id} className='my-4' item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomeRight;
