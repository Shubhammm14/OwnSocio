import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Backdrop, Card, CardHeader, CircularProgress, Grid, Input } from '@mui/material';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CottageIcon from '@mui/icons-material/Cottage';
import SearchUserChatCard from '../Components/SearchUser/SearchUserChatCard';
import ChatMessage from './ChatMessage';

import { createChat, createMessage, findChatMessages, findUserChat } from '../../Redux/Chat/chatAction';
import { searchUserAction } from '../../Redux/Auth/authAction';
import { uploadToCloudinary } from '../../utils/UploadToCloudnary';
import Stomp from 'stompjs';
import SockJS from "sockjs-client"
const Message = () => {
  const [searchUser, setSearchUser] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(false)
  const [selectedImage,setSelectedImage]=useState();
  const [selectedVideo,setSelectedVideo]=useState()
  const [stompClient, setStompClient] = useState(null);
  const chatContainerRef=useRef()
  useEffect(() => {
    const sock = new SockJS('http://localhost:8080/ws');
    const stomp = Stomp.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onError);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const onConnect = () => {
    console.log('WebSocket connected');
  };

  const onError = (error) => {
    console.error('WebSocket connection error:', error);
  };

  const sendMessageToServer = (msgg) => {
    if (stompClient && msgg) {
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(msgg));
    }
  };
  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    dispatch({ type: 'CREATE_MESSAGE_SUCCESS', payload: receivedMessage }); // Update Redux state
  };
  
  const handleFile = (event) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;

    if (file) {
      if (window.FileReader) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileType = file.type.split('/')[0];

          if (fileType === 'image') {
            handleSelectImage(e.target.result);
          } else if (fileType === 'video') {
            handleSelectVideo(e.target.result);
          } else {
            console.error('Unsupported file type.');
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.error('FileReader API not supported by the browser.');
      }
    } else {
      console.error('No file selected.');
    }
  };

  const handleSelectImage = async (imageData) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(imageData, 'image');
    setSelectedImage(imageUrl);
    setIsLoading(false);
  };

  const handleSelectVideo = async (videoData) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(videoData, 'video');
    setSelectedVideo(videoUrl);
    setIsLoading(false);
  };

  const handleSearchUser = (e) => {
    const { value } = e.target;
    setSearchUser(value);
    dispatch(searchUserAction(value));
    console.log('Search Query:', value);
  };

  const handleClick = (item) => {
    setCurrentChat(item);
    dispatch(createChat(item.id));
  };

  useEffect(() => {
    dispatch(findUserChat());
  }, [message.chats]);

  useEffect(() => {
    if (currentChat) {
      dispatch(findChatMessages({ chatId: currentChat.id }));
    }
  }, [currentChat,message.messages]);

  const enter = (e) => {
    if (e.key === 'Enter') {
      dispatch(createMessage({ msg: msg, image: selectedImage, video: selectedVideo, chatId: currentChat.id, sendMessageToServer }));
      setMsg('');
      setSelectedImage('');
      setSelectedVideo('');
    }
  };

  useEffect(() => {
    if (stompClient !== null && auth.user && currentChat) {
      const subscription = stompClient.subscribe(`/user/${currentChat.id}/private`, onMessageReceive);
    }
  }, [stompClient, auth.user, currentChat]);
  useEffect(()=>{
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop=chatContainerRef.current.scrollHeight;
    }
  },[message.messages])
  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>
        {/* Left Sidebar */}
        <Grid className='' item xs={3}>
          <div className='flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex  space-x-4 items-center py-5'>
                <h1
                  className='flex m-4 text-2xl font-bold text-purple-400 cursor-pointer'
                  onClick={() => navigate('/')}
                  style={{ fontFamily: 'cursive' }}
                >
                  <CottageIcon className='mx-1' />
                  <p className=''>Home</p>
                </h1>
              </div>
              <div className='h-[83vh]'>
                <div className='relative'>
                  <Input
                    onChange={handleSearchUser}
                    className='outline-none w-[90%] rounded-full px-5 bg-transparent border shadow-xl shadow-purple-300 ml-3'
                    placeholder='Type something...'
                  />
                  {searchUser &&
                    auth.SearchedUser &&
                    auth.SearchedUser.map((item) => (
                      <Card className='absolute top-[3rem] w-full z-10  cursor-pointer' key={item.id}>
                        <CardHeader
                          onClick={() => {
                            setSearchUser('');
                            handleClick(item);
                          }}
                          avatar={<Avatar src={item.profileImg} />}
                          title={`${item.firstName} ${item.lastName}`}
                          subheader={`@${item.firstName.toLowerCase()}_${item.lastName.toLowerCase()}${item.id}`}
                        />
                      </Card>
                    ))}
                </div>
                <div className='h-full space-y-4 mt-5 overflow-y-scroll scrollbarhide'>
                  {message.chats &&
                    message.chats.map((item) => (
                      <SearchUserChatCard key={item.id} setCurrentChat={setCurrentChat} item={item} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>

        {/* Right Chat Section */}
        {currentChat && (
          <Grid className='px-5' item xs={9}>
            <div>
              <div className='flex justify-between items-center border-1 my-4 shadow-xl shadow-purple-300 p-5 bg-purple-100 rounded-lg'>
                <div className='flex items-center space-x-3 '>
                  <Avatar
                    src={
                      auth.user.id === currentChat.users[1].id
                        ? currentChat.users[0].profileImg
                        : currentChat.users[1].profileImg
                    }
                  />
                  <p className='px-3'>
                    {auth.user.id === currentChat.users[1].id
                      ? `${currentChat.users[0].firstName} ${currentChat.users[0].lastName}`
                      : `${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`}
                  </p>
                </div>
                <div>
                  <MoreVertIcon />
                </div>
              </div>
              <div ref={chatContainerRef} className='overflow-y-scroll h-[80vh] px-10 space-y-5 py-10 scrollbarhide'>
                {message.messages &&
                  message.messages.map((item) => <ChatMessage key={item.id} item={item} />)}
              </div>
            </div>
            <div className='sticky bottom-7 border-1'>
              <div className='my-5 py-1 w-[97%] flex items-center justify-center space-x-5 shadow-xl shadow-purple-300 bg-purple-200 rounded-full '>
              {selectedImage && <img className='h-[10rem]' src={selectedImage} alt="Selected Image" />}
                                    {selectedVideo && <video className='h-[10rem]' src={selectedVideo} controls></video>}
                <input
                  className='w-[90%] p-2 bg-purple-200'
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyPress={enter}
                  type='text'
                  placeholder='type a message...'
                  value={msg}
                />
                <div>
                  <input
                    type='file'
                    accept='image/*,video/*'
                    onChange={handleFile}
                    className='hidden'
                    id='file-input'
                  />
                  <label htmlFor='file-input'>
                    <AddPhotoAlternateOutlined />
                  </label>
                </div>
               
              </div>
              <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                        
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Message;
