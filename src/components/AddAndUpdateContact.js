import React from 'react'
import Modal from './Modal'
import { Field, Form, Formik } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from 'react-toastify';


const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {

  const addContact= async (contact)=>{
     try {
      const contactRef=collection(db,"contacts");
      await addDoc(contactRef,contact);
      onClose()
      toast.success("Contact Added Successfully")
     } catch (error) {
      console.log(error)
     }
  };

  const updateContact= async (contact,id)=>{
    try {
     const contactRef=doc(db,"contacts",id);
     await updateDoc(contactRef,contact);
     onClose()
     toast.success("Contact Updated Successfully")
    } catch (error) {
     console.log(error)
    }
 };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={isUpdate ? {
          name:contact.name,
          email:contact.email
        } :{
          name:"",
          email:""
        }}
        onSubmit={(values)=>{
          console.log(values)
         isUpdate ? updateContact(values,contact.id) : addContact(values)
        }}
      >
        <Form className='d-flex flex-column gap-3'>
          <div className='d-flex flex-column gap-1'>
            <label htmlFor='name'>Name</label>
            <Field name="name" className='border border-dark' required/>
          </div>
          <div className='d-flex flex-column gap-1'>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="border border-dark" required/>
          </div>
          <button className='d-flex align-self-end border border-dark bg-warning'>{isUpdate ? "Update" : "Add"} Contact</button>
        </Form>
      </Formik>
    </Modal>
    </div>
  )
}

export default AddAndUpdateContact
