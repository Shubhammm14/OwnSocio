import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch, useSelector } from 'react-redux';
import Storycircle from '../../Home/Storycircle'; // Assuming this import is correct
import PostCard from '../Post/PostCard';
import CreatePostModal from '../Post/CreatePostModal';
import { getAllPostAction } from '../../../Redux/Post/postAction';

const MiddlePart = () => {
  const story = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const { post } = useSelector(store => store); // Assuming 'store' is properly configured in Redux
  const dispatch = useDispatch();
  const [createPostOpen, setCreatePostOpen] = useState(false);
const jwt=localStorage.getItem("token");
  const handleOpenCreatePostModal = () => {
    setCreatePostOpen(true);
  };

  useEffect(() => {
    dispatch(getAllPostAction(jwt));
    
  }, []); // Add dispatch as dependency to avoid lint warnings
  console.log("post",post)
  const handleCloseCreatePostModal = () => {
    setCreatePostOpen(false);
  };

  return (
    <div className='px-10'>
      {/* Section for stories */}
      <section className='border overflow-hidden flex my-5 rounded-b-md bg-white shadow-2xl ' style={{ zIndex: 1 }}>
        <div className='flex m-2 cursor-pointer overflow-x-auto' style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
          <div className="mr-2" onClick={handleOpenCreatePostModal}>
            <Avatar sx={{ width: '5rem', height: '5rem' }}>
              <AddIcon sx={{ fontSize: '3rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </Avatar>
            <p className="mx-5">New</p>
          </div>
          {/* Render story circles */}
          {story.map((item, index) => (
            <Storycircle className='flex items-center px-2' key={`story-${index}`} />
          ))}
        </div>
      </section>

      {/* Card for content */}
      <Card className='p-5 mt-5' elevation={3}>
        <div className='flex justify-center items-center' onClick={handleOpenCreatePostModal}>
          <Avatar />
          <Input className='outline-none w-[90%] rounded-full px-5 bg-transparent border ml-3' placeholder="Type something..." />
        </div>
        <div className='flex justify-center space-x-9 mt-5 cursor-pointer'>
          <div className='flex items-center' onClick={handleOpenCreatePostModal}>
            <IconButton color='secondary'>
              <ImageSearchIcon />
            </IconButton>
            <span>media</span>
          </div>
          <div className='flex items-center' onClick={handleOpenCreatePostModal}>
            <IconButton color='secondary'>
              <VideoCameraBackIcon />
            </IconButton>
            <span>video</span>
          </div>
          <div className='flex items-center' onClick={handleOpenCreatePostModal}>
            <IconButton color='secondary'>
              <ArticleIcon />
            </IconButton>
            <span>write article</span>
          </div>
        </div>
        {/* Move the modal outside of the button container */}
        <CreatePostModal handleClose={handleCloseCreatePostModal} open={createPostOpen} />
      </Card>

      <div className='my-5'>
       {post&&post.posts&&post.posts.map((item, index) => (
    <PostCard item={item} key={`post-${index}`} className='shadow-xl' />
))}

      </div>
    </div>
  );
};

export default MiddlePart;
