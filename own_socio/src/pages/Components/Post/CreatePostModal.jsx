import { Avatar, Backdrop, Box, CircularProgress, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { uploadToCloudinary } from '../../../utils/UploadToCloudnary';
import { useFormik } from 'formik';
import { createPostAction } from '../../../Redux/Post/postAction';

const CreatePostModal = ({ handleClose, open }) => {
    const { auth } = useSelector(store => store);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [caption, setCaption] = useState("");

    const handleSelectImage = async (e) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(e.target.files[0], 'image');
        console.log(imageUrl)
        setSelectedImage(imageUrl);
        setIsLoading(false);
    };

    const handleSelectVideo = async (e) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(e.target.files[0], 'video');
        setSelectedVideo(videoUrl);
        setIsLoading(false);
    };
    const dispatch=useDispatch();
    const jwt=localStorage.getItem('token')
    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: ""
        },
        onSubmit: (values) => {
            setIsLoading(true)
            values.image = selectedImage;
            values.video = selectedVideo;
            values.caption = caption;
             dispatch(createPostAction({postData:values,jwt:jwt}))
             setSelectedImage(null);
             setSelectedVideo(null)
             setCaption('')
             handleClose()
             setIsLoading(false)

            // You can perform further actions here, like dispatching an action to post the data
        }
    });

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', backgroundColor: 'white', boxShadow: '5px 5px purple', padding: '4px' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h1">
                        <div className='m-4 text-xl font-semibold text-purple-900' style={{ fontFamily: 'cursive' }}>Create Post</div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className=' '>
                                <div className='flex my-8  mx-4'>
                                    <Avatar src={auth.user.profileImg ? auth.user.profileImg : ""} />
                                    <div className='flex mx-4 flex-col text-purple-900'>
                                        <span style={{ fontFamily: "cursive" }} className='text-lg font-bold '>{auth.user.firstName} {auth.user.lastName}</span>
                                        <span style={{ fontFamily: 'cursive' }} className='opacity-70 text-sm flex'>{`@${auth.user.firstName.toLowerCase()}_${auth.user.lastName.toLowerCase()}`}<p className='mt-1'>{auth.user.id}</p></span>
                                    </div>
                                </div>
                                <textarea
                                    placeholder='Write Caption..'
                                    maxLength={250}
                                    minLength={0}
                                    onChange={(e) => setCaption(e.target.value)}
                                    value={caption}
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
                                <div>
                                    {selectedImage && <img className='h-[10rem]' src={selectedImage} alt="Selected Image" />}
                                    {selectedVideo && <video className='h-[10rem]' src={selectedVideo} controls></video>}
                                </div>
                                <div className='flex m-5 justify-between text-purple-900'>
                                    <div className='flex'>
                                        <div className='flex m-2 shadow-xl cursor-pointer rounded-xl p-2 px-4'>
                                            <input type='file' accept='image/*' id="image-input" onChange={handleSelectImage} style={{ display: "none" }} />
                                            <label htmlFor='image-input' className='flex cursor-pointer'>
                                                <ImageSearchIcon />
                                                <p className='mx-2'>Image</p>
                                            </label>
                                        </div>
                                        <div className='flex m-2 shadow-xl cursor-pointer rounded-xl p-2 px-4'>
                                            <input type='file' accept='video/*' id="video-input" onChange={handleSelectVideo} style={{ display: "none" }} />
                                            <label htmlFor='video-input' className='flex cursor-pointer'>
                                                <VideoCameraBackIcon />
                                                <p className='mx-2'>Video</p>
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className='px-8 rounded-xl text-purple-900 shadow-xl shadow-purple-900'>Post</button>
                                </div>
                            </div>
                        </form>
                    </Typography>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
            </Modal>
        </div>
    );
};

export default CreatePostModal;
