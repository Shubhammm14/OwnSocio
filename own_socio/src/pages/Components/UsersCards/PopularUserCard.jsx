import { Avatar, Button, CardHeader, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { findSuggestions, followUser } from '../../../Redux/Auth/authAction';

const PopularUserCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser({ itemId: item.id }));
    window.location.reload()
  };

  return (
    <div className='h-[5vh] cursor-pointer'>
      <CardHeader
        avatar={
          <Avatar src={item.profileImg} aria-label="recipe" />
        }
        action={
          <IconButton aria-label="settings">
            <Button className='text-purple-700' onClick={handleFollow}>Follow</Button>
          </IconButton>
        }
        title={item.firstName + ' ' + item.lastName}
        subheader={`@${item.firstName.toLowerCase()}_${item.lastName.toLowerCase()}${item.id}`}
      />
    </div>
  );
};

export default PopularUserCard;
