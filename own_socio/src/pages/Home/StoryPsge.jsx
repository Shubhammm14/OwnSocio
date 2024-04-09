import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../Redux/Chat/chatAction';
import Stomp from 'stompjs';
import SockJS from "sockjs-client"

// Helper function to check if a string is a valid image URL
const isImageURL = (str) => {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(str);
};

// Helper function to check if a string is a valid video URL
const isVideoURL = (str) => {
    return /\.(mp4|webm|ogg)$/i.test(str);
};

const StoryPage = () => {
    const { auth } = useSelector(store => store);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [msg, setMsg] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedVideo, setSelectedVideo] = useState('');
    const [currentChat, setCurrentChat] = useState(null); // Initialize currentChat as null
    const [typing, setTyping] = useState(false); // Track if user is typing
    const dispatch = useDispatch();
    const [stompClient, setStompClient] = useState(null);
    const chatContainerRef = useRef();

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!typing) { // Only change story index if not typing
                setCurrentStoryIndex(prevIndex =>
                    prevIndex < auth.Stories.length - 1 ? prevIndex + 1 : 0
                );
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [auth.Stories.length, typing]);

    useEffect(() => {
        const totalStories = auth.Stories.length;
        if (totalStories > 0) {
            const calculatedProgress = ((currentStoryIndex + 1) / totalStories) * 100;
            setProgress(calculatedProgress);
        }
    }, [currentStoryIndex, auth.Stories]);

    const handleSlideChange = event => {
        setCurrentStoryIndex(Number(event.target.value));
    };

    const sendMessageToServer = (msgg) => {
        if (stompClient && msgg) {
            stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(msgg));
        }
    };

    const handleTyping = () => {
        setTyping(true);
        setCurrentStoryIndex(0); // Pause the story when typing starts
    };

    const handleSendMessage = () => {
        if (currentChat) { // Check if a chat is selected
            dispatch(
                createMessage({
                    msg: msg,
                    image: selectedImage,
                    video: selectedVideo,
                    chatId: currentChat.id,
                    sendMessageToServer
                })
            );
            setMsg('');
            setTyping(false); // Reset typing state
            setSelectedImage('');
            setSelectedVideo('');
        } else {
            console.error('No chat selected.'); // Handle error if no chat is selected
        }
    };

    return (
        <div className="h-[100vh] flex flex-col items-center justify-center bg-black">
            <div className='h-[70vh] w-[40vh] bg-black flex flex-col justify-center items-center shadow-purple-600 shadow-xl relative'>
                <div className="w-full h-1 bg-gray-300 absolute top-0">
                    <div className="h-full bg-purple-700" style={{ width: `${progress}%` }}></div>
                </div>
                {auth.Stories[currentStoryIndex] && auth.Stories[currentStoryIndex].storyType === 'image' && (
                    <img src={auth.Stories[currentStoryIndex].url} alt="Story" className="w-full h-full object-cover" />
                )}
                {auth.Stories[currentStoryIndex] && auth.Stories[currentStoryIndex].storyType === 'video' && (
                    <video src={auth.Stories[currentStoryIndex].url} alt="Story" className="w-full h-full object-cover" />
                )}
            </div>
            <div className='my-2'>
                <input
                    type='text'
                    placeholder='type a comment...'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onFocus={handleTyping}
                    className='w-full text-purple-600 bottom-0 p-2 rounded-full'
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default StoryPage;
