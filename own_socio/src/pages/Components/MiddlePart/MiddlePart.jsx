import { Avatar, Card, IconButton, Input ,Image} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Storycircle from '../../Home/Storycircle';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
const MiddlePart = () => {
  const story = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const post=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  const handleOpenCreatePostModal=()=>{

  }
  return (
    <div className='px-10 '>
      {/* Section for stories */}
      
      <section className='border overflow-hidden  flex my-5 rounded-b-md bg-white shadow-2xl ' style={{zIndex:1}}>
  <div className='flex m-2 cursor-pointer overflow-x-auto' style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
    <div className="mr-2">
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
      <Card className='p-5 mt-5' elevation={3} >
  <div className='flex justify-center items-center'>
    <Avatar />
    <Input className='outline-none w-[90%] rounded-full px-5 bg-transparent border ml-3' placeholder="Type something..." />
  </div>
  <div className='flex justify-center sapce-x-9 mt-5'>
    <div className='flex items-center'>
            <IconButton  color='secondary' onClick={handleOpenCreatePostModal}>
              <ImageSearchIcon/>
            </IconButton>
            <span>media</span>
    </div>
   <div className='flex items-center'>
            <IconButton  color='secondary' onClick={handleOpenCreatePostModal}>
              <VideoCameraBackIcon/>
            </IconButton>
            <span>video</span>
    </div>
    <div className='flex items-center'>
            <IconButton  color='secondary' onClick={handleOpenCreatePostModal}>
              <ArticleIcon/>
            </IconButton>
            <span>write article</span>
    </div>

    
  </div>
</Card>
<div className='my-5'>
  {post.map((item)=>
    <PostCard className='shadow-xl'/>
  )}
  
</div>
    </div>

  );
};

export default MiddlePart;
