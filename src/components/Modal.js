import React from 'react'
import './Modal.css';
import { AiOutlineClose } from 'react-icons/ai';
import { createPortal } from 'react-dom';

const Modal = ({isOpen,onClose,children}) => {
    //let{isOpen,onClose,children}=props;
  return createPortal(
    <>
    {isOpen &&(
    <>
    <div style={{minHeight:'200px',maxWidth:'80%' ,backgroundColor:'white', padding:'10px', margin:'auto',zIndex:'50',position:'relative'}}>
      <div className='d-flex justify-content-end'>
        <AiOutlineClose onClick={onClose} className='cross'/>
      </div>
      {children}
      </div>
      <div
      onClick={onClose} className='foot'
      />
    </>
    )}
    </>,
    document.getElementById("modal-root")
  )
}

export default Modal
