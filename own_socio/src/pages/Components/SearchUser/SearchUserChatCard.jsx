import { MoreHoriz } from '@mui/icons-material'
import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const SearchUserChatCard = ({setCurrentChat,item}) => {
  const {auth}=useSelector(store=>store)
  return (
    <div>
        <div onClick={()=>setCurrentChat(item)} className=' shadow-xl shadow-purple-300 cursor-pointer m-2 '>
            <Card>
              <CardHeader onClick={()=>{
                
              }}
              avatar={<Avatar src='https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_640.jpg'/>}
              title={auth.user.id===item.users[1].id?item.users[0].firstName+' '+item.users[0].lastName:item.users[1].firstName+' '+item.users[1].lastName}
              subheader={'shubham'}
              action={<IconButton><MoreHoriz/></IconButton>}
              
              />
               
            </Card>
        </div>
    </div>
  )
}

export default SearchUserChatCard