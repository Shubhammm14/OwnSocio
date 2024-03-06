import React from 'react'
import { navigationMenu } from './SideBarNavigation'
import { Avatar, Button, ClickAwayListener, Divider, Grow, MenuItem, MenuList, Paper, Popper, Stack } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className='bg-pink-700 flex flex-col text-white justify-content h-[100vh]' style={{ fontFamily: "cursive" }}>
      <div className='space-y-8 pl-5'>
        <div className='my-8'>
          <span className='logo font-bold text-2xl m-4 ' style={{ fontFamily: 'cursive' }}>Own Socio</span>
        </div>
        <div className='space-y-5 text-white'>
          {navigationMenu.map((item) => (
            <div className='flex space-x-3' key={item.title}>
              {item.icon}
              <p className='text-xl'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-auto m-2'>
      <Divider className='' sx={{  backgroundColor: 'white' }} />
        <div>
          <div className='m-2 flex space-x-5 justify-between '>
            <div className='flex'>
            <Avatar className='m-2' src='https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_640.png' />
            <div className='mx-2'>
              <p className='font-bold text-xl'>shubham</p>
              <p className='opacity-70'>@shubhamCdd</p>
            </div>
            </div>

            <Stack direction="row" className='m-2' spacing={2}>

              <div>
                <MoreVertIcon
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                />


                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList

                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
