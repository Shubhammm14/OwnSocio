import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Input, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { likePostAction } from '../../../Redux/Post/postAction';

const PostCard = ({ item }) => {
  const { auth } = useSelector(store => store);
  const [favpost, setFavPost] = useState(item&&item.liked.includes(auth.user.id));

    const [savePost, setSavePost] = useState(false);
    const [share, setShare] = useState(false);
    const [commentOpener, setCommentOpener] = useState(false);
    
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("token");

    const handleFavPost = async () => {
        try {
            await dispatch(likePostAction({ postId: item.id, jwt: jwt }));
            setFavPost(!favpost);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <Card className='my-10 border'>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }} src={item.user.profileImage} aria-label="recipe" />}
                action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                title={item.user.firstName + item.user.lastName}
                subheader={item.createdAt}
            />
            <CardMedia
                component="img"
                height='200'
                image={item.image}
                alt='img'
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.caption}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='flex justify-between'>
                <div className=''>
                    <IconButton aria-label="add to favorites" onClick={handleFavPost} style={{ color: favpost ? 'red' : 'inherit' }}>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" onClick={() => setShare(!share)} style={{ color: share ? 'purple' : 'inherit' }}>
                        <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="mark as unread" onClick={() => setCommentOpener(!commentOpener)} style={{ color: commentOpener ? 'purple' : 'inherit' }}>
                        <MarkChatUnreadIcon />
                    </IconButton>
                    
                </div>
               
                <div>
                    <IconButton aria-label="bookmark" onClick={() => setSavePost(!savePost)} style={{ color: savePost ? 'purple' : 'inherit' }}>
                        <BookmarkIcon />
                    </IconButton>
                </div>
                
            </CardActions>
            <div className='flex m-5'>
            <Avatar
  sx={{ bgcolor: red[500] }}
  src={item.user.profileImage || 'fallback_image_url'}
  aria-label="recipe"
/>
 <Avatar className='' src={auth.user.profileImg} sx={{}} />
            <Input
                className='shadow mx-5 p-1 px-3 shadow-5xl border  w-full rounded-xl'
                type='text'
                placeholder='Write a comment...'
            />
        </div>
        </Card>
    );
};

export default PostCard;
