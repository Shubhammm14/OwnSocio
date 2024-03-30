import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Input, Typography, Button } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Bookmark, MarkChatUnread, Favorite, Share, MoreVert } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createPostComment, createPostCommentAction, likePostAction, savePostAction } from '../../../Redux/Post/postAction';
import Comment from './Comment';
import { savePost } from '../../../Redux/Post/postAction';
import { getProfileAction } from '../../../Redux/Auth/authAction';

const PostCard = ({ item }) => {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('token');
  const userFirstName = item?.user?.firstName || 'Unknown';
  const userLastName = item?.user?.lastName || '';
  const userCreatedAt = item?.createdAt || '';
  const userProfileImage = item?.user?.profileImage || 'fallback_image_url';
  

  const [favpost, setFavPost] = useState(item && item.liked?.includes(item.user.id));
  const [sPost, setSPost] = useState(auth && auth.user.savedPost?.some(savedPost => savedPost.id === item.id));

  const [share, setShare] = useState(false);
  const [commentOpener, setCommentOpener] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const handleFavPost = async () => {
    try {
      await dispatch(likePostAction({ postId: item.id, jwt: jwt }));
      setFavPost(!favpost);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const createComment = async () => {
    console.log("create comment")
    try {
      await dispatch(createPostCommentAction({ postId: item.id, jwt: jwt, comment: commentText }));
      setCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const savePostHandle = async () => {
    try {
      await dispatch(savePostAction({ postId: item.id, jwt: jwt }));
      // Update the sPost state based on whether the post is saved or not
      setSPost(!sPost);

      
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const toggleCommentsView = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <Card className="my-10 border">
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: pink[500] }} src={userProfileImage} aria-label="recipe" />}
        action={<IconButton aria-label="settings"><MoreVert /></IconButton>}
        title={`${userFirstName} ${userLastName}`}
        subheader={userCreatedAt}
      />
      <CardMedia
        component="img"
        height="200"
        image={item?.image || ''}
        alt="img"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item?.caption || ''}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="flex justify-between">
        <div className="">
          <IconButton aria-label="add to favorites" onClick={handleFavPost} style={{ color: favpost ? 'red' : '' }}>
            <Favorite />
          </IconButton>
          <IconButton aria-label="share" onClick={() => setShare(!share)} style={{ color: share ? 'purple' : '' }}>
            <Share />
          </IconButton>
          <IconButton aria-label="mark as unread" onClick={() => setCommentOpener(!commentOpener)} style={{ color: commentOpener ? 'purple' : '' }}>
            <MarkChatUnread />
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="bookmark" onClick={savePostHandle} style={{ color: sPost ? 'purple' : '' }}>
            <Bookmark />
          </IconButton>
        </div>
      </CardActions >
      {commentOpener && (
        <div className='px-5'>
          <div className="flex my-5">
            <Avatar
              sx={{ bgcolor: pink[500] }}
              src={auth?.user?.profileImg || 'fallback_image_url'}
              aria-label="recipe"
            />
            <Input
              className="shadow mx-5 p-1 px-3 shadow-5xl border w-full rounded-xl"
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => {
                
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevents adding a new line in the input
                  createComment();
                }
              }}
            />
          </div>
          <Divider />
          <div>
            {item.comments.length > 1 && (
              <Button onClick={toggleCommentsView} className='text-xs' style={{ color: 'gray' }}>
                {showAllComments ? 'View less comments' : `View all ${item.comments.length} comments`}
              </Button>
            )}
            {item.comments.length > 0 && (
              <>
                {showAllComments ? (
                  item.comments.slice().reverse().map((item) => <Comment key={item.id} item={item} />)
                ) : (
                  <Comment key={item.comments[item.comments.length - 1].id} item={item.comments[item.comments.length - 1]} />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PostCard;
