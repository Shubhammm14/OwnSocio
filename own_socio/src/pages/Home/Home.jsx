import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import SideBar from './SideBar'
import HomeRight from '../Components/HomeRight/HomeRight'
import Profile from '../Components/Profile/Profile'
import CreateReels from '../Components/Reels/CreateReels'
import Reels from '../Components/Reels/Reels'
import MiddlePart from '../Components/MiddlePart/MiddlePart'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../Redux/Auth/authAction'
import StoryPsge from './StoryPsge'
const Home = () => {
  const location = useLocation();
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className='sticky  top-0'>
            <SideBar />
          </div>
        </Grid>
        <Grid item xs={12} lg={location.pathname === "/" ? 6 : 9} className=''>
          <div>
            
            <Routes>
              <Route path='/' element={<MiddlePart/>} />
              <Route path='/reels' element={<Reels />} />
              <Route path='/create-reels' element={<CreateReels />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='stories/:id' element={<StoryPsge/>}/>
            </Routes>
          </div>
        </Grid>
        {location.pathname==='/'&&<Grid item lg={location.pathname==='/'?3:0} className='border '>
          <div className='sticky top-0 border  relative'>
            <HomeRight />
          </div>
        </Grid>}
      </Grid>
    </div>
  )
}

export default Home;
