import React from 'react'
import PopularUserCard from '../UsersCards/PopularUserCard'
import { Input } from '@mui/material'

const HomeRight = () => {
  const popularUsers=[1,1,1,,1,1,1,1,1,1,1]
  return (
    <div className=''>
           <div className='m-5 my-10'>
           <Input className='outline-none w-[90%] rounded-full px-5 bg-transparent border shadow-xl shadow-purple-300 ml-3' placeholder="Type something..." />
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