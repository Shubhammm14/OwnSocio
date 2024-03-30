import React, { useState } from 'react'
import PopularUserCard from '../UsersCards/PopularUserCard'
import { Avatar, Card, CardHeader, Input } from '@mui/material'
import { store } from '../../../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {searchUserAction } from '../../../Redux/Auth/authAction'
import { Navigate, useNavigate } from 'react-router-dom'

const HomeRight = () => {
  const {auth}=useSelector(store=>store)
  const [searchUser,setSearchUser]=useState()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSearchuser=(e)=>{
    setSearchUser(e.target.value)
    console.log("srh",searchUser)
    dispatch(searchUserAction(searchUser))
    console.log("users",auth.searchedUser)
}
  const handleClick=({id})=>{
       navigate(`/profile/${id}`)
  }
  const popularUsers=[1,1,1,1,1,1,1,1,1,1]
  return (
    <div className=''>
           <div className='m-5 my-10 relative'>
           <Input onChange={handleSearchuser} className='outline-none w-[90%] rounded-full px-5 bg-transparent border shadow-xl shadow-purple-300 ml-3' placeholder="Type something..." />
           {searchUser&& auth.SearchedUser&&(
                auth.SearchedUser.map((item)=><Card className =" absolute top-[3rem] w-full z-10  cursor-pointer">
                  <CardHeader
                  onClick={()=>{
                    setSearchUser('');
                    handleClick({id:item.id})}
                  }
                  avatar={
                     <Avatar src={item.profileImg}/>
                  }
                  title={item.firstName+' '+item.lastName}
                  subheader={`@${item.firstName.toLowerCase()}_${item.lastName.toLowerCase()}${item.id}`}
                  />
                  </Card>
              ))}
           </div>
           <div className='flex justify-between  items-center mx-10'>
                <p className='font-semibold opacity-70 text-purple-900'style={{fontFamily:'cursive'}}>Suggestions for you</p>
                <p className='text-xs font-semibold opacity-95 cursor-pointer text-purple-900' >View All</p>
           </div>
           <div className='space-y-4'>
               {popularUsers.map(()=>
                <PopularUserCard className='my-4 '/>
               )}
           </div>
    </div>
  )
}

export default HomeRight