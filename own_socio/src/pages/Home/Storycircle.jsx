import { Avatar } from '@mui/material'
import React from 'react'

const Storycircle = () => {
  return (
    <div className='px-1'>
        <Avatar src='https://cdn.pixabay.com/photo/2021/01/06/10/10/woman-5893922_640.jpg'
        sx={{width:'5rem',height:'5rem'}}
         >

        </Avatar>
        <p className='mx-5 overflow-x-hidden'> name</p>
    </div>
  )
}

export default Storycircle