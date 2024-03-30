import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from '@mui/material';

const ChatMessage = ({ item }) => {
  const { auth } = useSelector((store) => store);
  const [openModal, setOpenModal] = useState(false);

  // Check if item and item.user are defined and not null
  const isCurrentUserMessage = item && item.user && auth.user.id === item.user.id;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={`flex ${isCurrentUserMessage ? 'justify-end' : 'justify-start'}`}>
      <div className="rounded-full px-5 bg-purple-100 cursor-pointer" >
        <div onClick={handleOpenModal}>
        {item.image && <img className="w-[6rem] h-[8rem] object-cover rounded-md" src={item.image} alt="Message Image" />}
        {item.video && <video className="w-[6rem] h-[8rem] object-cover rounded-md" src={item.video} alt="Message Video"/>}
        </div>
        <p className="py-2">{item.content}</p>
      </div>

      {/* Modal for displaying larger image or video */}
      <Modal open={openModal} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="modal-content" style={{ width: '100%', height: '100%' }}>
          {item.image && <img className="w-full h-full object-cover" src={item.image} alt="Message Image" />}
          {item.video && <video className="w-full h-full object-cover" src={item.video} controls />}
          <Button onClick={handleCloseModal} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', color: 'purple', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)' }}>Close</Button>

        </div>
      </Modal>
    </div>
  );
};

export default ChatMessage;
