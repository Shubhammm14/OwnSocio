import { Avatar, Button, CardHeader, IconButton } from '@mui/material'
import { purple, red } from '@mui/material/colors'
import React from 'react'
import MoreVert from '@mui/icons-material/MoreVert'
const PopularUSerCard = () => {
  return (
    <div className='h-[5vh] cursor-pointer'>
        <CardHeader className=''
        avatar={
          <Avatar sx={{ bgcolor: purple[900] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Button className='text-purple-700'>Follow</Button>
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      
    </div>
  )
}

export default PopularUSerCard