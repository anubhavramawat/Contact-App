import React from 'react'
import {HiOutlineUserCircle} from "react-icons/hi";
import {RiEditCircleLine} from"react-icons/ri";
import {IoMdTrash} from "react-icons/io";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import AddAndUpdateContact from './AddAndUpdateContact';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ContactCard = ({contact}) => {

  const[isOpen,setOpen]=useState(false);

  const onOpen=()=>{
    setOpen(true)
  }

  const onClose=()=>{
    setOpen(false)
  }
    //let {key,contact}=props;

    const deleteContact= async (id)=>{
      try {
       await deleteDoc(doc(db,"contacts",id));
       toast.success("Contact Deleted Successfully")
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <>
    <div key={contact.id} className="contact_id">
          <div className="d-flex gap-1">
          <HiOutlineUserCircle className="face" />
          <div className="">
            <h2 className='fs-3'>{contact.name}</h2>
            <p>{contact.email}</p>
          </div>
          </div>
          <div className="d-flex fs-1">
            <RiEditCircleLine onClick={onOpen} style={{cursor:"pointer"}} />
            <IoMdTrash onClick={()=>deleteContact(contact.id)} style={{cursor:"pointer"}} />
          </div>
        </div>
        <AddAndUpdateContact isUpdate contact={contact} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ContactCard
