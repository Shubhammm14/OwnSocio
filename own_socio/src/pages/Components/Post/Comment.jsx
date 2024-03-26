import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, Typography } from '@mui/material';
import { FavoriteRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likeComment } from '../../../Redux/Comment/commentAction';

const Comment = ({ item }) => {
  const { userId, content, liked } = item;
  const { auth } = useSelector(store => store);
  const { user } = auth;
  const jwt = localStorage.getItem('token');
  const [favComment, setFavComment] = useState(liked.includes(auth.user.id)); // Initialize based on liked array
  console.log('favComment:', favComment);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showCommentProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  const likeCommentHandler = async () => {
    console.log('pop');
    try {
      await dispatch(likeComment({ commentId: item.id, jwt: jwt }));
      setFavComment(!favComment);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  useEffect(() => {
    console.log('favComment changed:', favComment);
  }, [favComment]);

  return (
    <div className="comment flex pt-5 p-2 w-full">
      <Avatar className='cursor-pointer' src={user.profileImage} onClick={showCommentProfile} alt={user.firstName} />
      <div className="comment-content flex justify-between w-full">
        <Typography variant="body1" className='px-5'>
          {content}
        </Typography>
        <IconButton aria-label="like" >
  <FavoriteRounded style={{ color: favComment ? 'red' : 'gray' }} onClick={likeCommentHandler}/>
</IconButton>

      </div>
    </div>
  );
};

export default Comment;
