import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMore from '@mui/icons-material/ExpandMore';
const PostCard = () => {
    const [favpost,setfavpost]=useState(false)
    const [savePost,setSavePost]=useState(false)
    const [share,setShare]=useState(false)
    const [commentOpener,setCommentOpener]=useState(false)
  return (
    <Card className='my-10  border ' >
          <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
     <CardMedia
     component="img"
     height='200'
     image='https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_640.jpg'
     alt='img'
     
     />
     <CardContent>
     <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
     </CardContent>
     <CardActions disableSpacing className='flex justify-between'>
    <div className=''>
      <IconButton aria-label="add to favorites" onClick={() => setfavpost(!favpost)}>
        <FavoriteIcon style={favpost ? { color: 'red' } : {}} />
      </IconButton>
      <IconButton aria-label="share" onClick={()=>setShare(!share)}>
        <ShareIcon style={share? { color: 'purple' } : {}}/>
      </IconButton>
      <IconButton aria-label="mark as unread" onClick={()=>setCommentOpener(!commentOpener)}>
        <MarkChatUnreadIcon style={commentOpener? { color: 'purple' } : {}}/>
      </IconButton>
      
    </div>
    <div>
    <IconButton aria-label="bookmark" onClick={()=>setSavePost(!savePost)}>
        <BookmarkIcon style={savePost? { color: 'purple' } : {}}/>
      </IconButton>
    </div>

</CardActions>


    </Card>
  )
}

export default PostCard