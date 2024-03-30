import React from 'react';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ExploreSharpIcon from '@mui/icons-material/ExploreSharp';
import ControlPointSharpIcon from '@mui/icons-material/ControlPointSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

const NavigationMenu = () => {
  const { auth } = useSelector(store => store);

  const navigationMenu = [
    {
      title: 'Home',
      icon: <HomeSharpIcon />,
      path: "/"
    },
    {
      title: 'Reels',
      icon: <ExploreSharpIcon />,
      path: "/reels"
    },
    {
      title: 'Create Reels',
      icon: <ControlPointSharpIcon />,
      path: "/create-reels"
    },
    {
      title: 'Notification',
      icon: <NotificationsIcon />,
      path: "/"
    },
    {
      title: 'Message',
      icon: <ChatIcon />,
      path: "/message"
    },
    {
      title: 'Lists',
      icon: <ListAltIcon />,
      path: "/"
    },
    {
      title: 'Communities',
      icon: <GroupsIcon />,
      path: "/"
    },
    {
      title: 'Profile',
      icon: <AccountCircleIcon />,
      path: `/profile/${auth.user.id}`
    }
  ];

  return navigationMenu;
};

export default NavigationMenu;
