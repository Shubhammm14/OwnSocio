import React, { useEffect, useState } from 'react';
import { Avatar, Backdrop, Box, Card, CircularProgress, IconButton, Input, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch, useSelector } from 'react-redux';
import Storycircle from '../../Home/Storycircle'; // Assuming this import is correct
import PostCard from '../Post/PostCard';
import CreatePostModal from '../Post/CreatePostModal';
import { getAllPostAction } from '../../../Redux/Post/postAction';
import { Modal } from '@mui/material';
import { uploadToCloudinary } from '../../../utils/UploadToCloudnary';
import { Description } from '@mui/icons-material';
import { UserActiveStoryAction, createstoryAction, followersActiveStoryAction } from '../../../Redux/Story/storyAction';

const MiddlePart = () => {
  const { posts } = useSelector(state => state.post); // Assuming 'state' is properly configured in Redux
  const dispatch = useDispatch();
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const jwt = localStorage.getItem("token");
  const {story}=useSelector(store=>store)
  const handleOpenCreatePostModal = () => {
    setCreatePostOpen(true);
  };
  useEffect(()=>{
    dispatch(UserActiveStoryAction({id:auth.user.id,jwt:localStorage.getItem('token')}))
    dispatch(followersActiveStoryAction())
    console.log("stories",story)
  },[])
  useEffect(() => {
    dispatch(getAllPostAction(jwt));
   
  }, [dispatch, jwt]); // Added 'dispatch' and 'jwt' as dependencies to avoid lint warnings

  const handleCloseCreatePostModal = () => {
    setCreatePostOpen(false);
  };
  const [description,setDescription]=useState('')
  const [openStoryModal, setOpenStoryModal] = useState(false);

  const handleOpenStoryModal = () => {
    setOpenStoryModal(true);
  };

  const handleCloseStoryModal = () => {
    setStoryType('')
    setSelectedStory('')
    setOpenStoryModal(false);
  };
  const [selectedStory,setSelectedStory]=useState()
  const {auth}=useSelector(store=>store)
   const [storyType,setStoryType]=useState()
   const [isLoading,setIsLoading]=useState(false)
   const handleSelectedstory = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0]; // Get the main type (image or video)
      setStoryType(fileType);
      const data = await uploadToCloudinary(file, fileType);
      
      setSelectedStory(data)
    }
     else{
      console.log('file not slected')
     } 
    setIsLoading(false);
 
  };
  const handleCreateStory = () => {
    dispatch(createstoryAction({
        stryData: {
            url: selectedStory,
            storyType: storyType
        }, 
        jwt: localStorage.getItem('token')
    }));
    handleCloseStoryModal();
};

  
  return (
    <div className='px-10'>
      <Modal open={openStoryModal} onClose={handleCloseStoryModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Content of the story modal */}
        <div>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', backgroundColor: 'white', boxShadow: '5px 5px purple', padding: '4px' }}>
        <Typography id="modal-modal-title" variant="h6" component="h1">
                        <div className='m-4 text-xl font-semibold text-purple-900' style={{ fontFamily: 'cursive' }}>Create story</div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className='flex my-8  mx-4'>
                                    <Avatar src={auth.user.profileImg ? auth.user.profileImg : ""} />
                                    <div className='flex mx-4 flex-col text-purple-900'>
                                        <span style={{ fontFamily: "cursive" }} className='text-lg font-bold '>{auth.user.firstName} {auth.user.lastName}</span>
                                        <span style={{ fontFamily: 'cursive' }} className='opacity-70 text-sm flex'>{`@${auth.user.firstName.toLowerCase()}_${auth.user.lastName.toLowerCase()}`}<p className='mt-1'>{auth.user.id}</p></span>
                                    </div>

                                </div>
                                <div>
                                    {selectedStory&&storyType==='image' && <img className='h-[10rem]' src={selectedStory} alt="Selected Image" />}
                                    {selectedStory &&storyType==='video'&& <video className='h-[10rem]' src={selectedStory} controls></video>}
                                </div>
                                <textarea
                                    placeholder='Write description...'
                                    maxLength={50}
                                    minLength={0}
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    rows={4}
                                    style={{
                                        resize: 'none',
                                        minHeight: '6em',
                                        maxHeight: '6em',
                                        width: '100%',
                                        boxShadow: '0 12px 15px rgba(0, 0, 0, 0.1)',
                                        boxSizing: 'border-box',
                                        padding: '10px',
                                        fontSize: '16px',
                                    }}
                                />
                                <div className='flex m-5 justify-between text-purple-900'>
                                    <div className='flex'>
                                        <div className='flex m-2 shadow-xl cursor-pointer rounded-xl p-2 px-4'>
                                            <input type='file' accept='image/*' id="image-input" onChange={(e)=>{
                                              setStoryType('image')
                                              handleSelectedstory(e)}} style={{ display: "none" }} />
                                            <label htmlFor='image-input' className='flex cursor-pointer'>
                                                <ImageSearchIcon />
                                                <p className='mx-2'>Image</p>
                                            </label>
                                        </div>
                                        <div className='flex m-2 shadow-xl cursor-pointer rounded-xl p-2 px-4'>
                                            <input type='file' accept='video/*' id="video-input" onChange={
                                              (e)=>{
                                                setStoryType('video')
                                              handleSelectedstory(e)
                                              }
                                              } style={{ display: "none" }} />
                                            <label htmlFor='video-input' className='flex cursor-pointer'>
                                                <VideoCameraBackIcon />
                                                <p className='mx-2'>Video</p>
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" onClick={handleCreateStory} className='px-8 rounded-xl text-purple-900 shadow-xl shadow-purple-900'>Post</button>
                                </div>
                    </Typography>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                        onClick={handleCloseStoryModal}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
        </Box>
          </div>
      </Modal>

      {/* Section for stories */}
      <section className='border overflow-hidden flex my-5 rounded-b-md bg-white shadow-2xl' style={{ zIndex: 1 }}>
        <div className='flex m-2 cursor-pointer overflow-x-auto' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="mr-2" onClick={handleOpenStoryModal}>
            <Avatar sx={{ width: '5rem', height: '5rem' }}>
              <AddIcon sx={{ fontSize: '3rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </Avatar>
            <p className="mx-5">New</p>
          </div>
          {/* Render story circles */}
          
           {story.ActiveStories[0]&& <Storycircle className='flex items-center px-2' item={story.ActiveStories} />}
          
          {story.followersActiveStories.map((item, index) => (
            <Storycircle className='flex items-center px-2' key={`story-${index}`} item={item} />
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
        {posts && posts.slice().reverse().map((item, index) => (
          <PostCard item={item} key={`post-${index}`} className='shadow-xl' />
        ))}
      </div>
    </div>
  );
};

export default MiddlePart;
