import Navbar from "./components/Navbar";
import './App.css';
import { FaSearch } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoContact from "./components/NoContact";

function App() {
  const[contacts,setContacts]=useState([]);

  const[isOpen,setOpen]=useState(false);

  const onOpen=()=>{
    setOpen(true)
  }

  const onClose=()=>{
    setOpen(false)
  }

  useEffect(() => {
    const getContacts=async ()=>{
      try {
        const contactsRef=collection(db,"contacts")
        //const contactsSnapshot=await getDocs(contactsRef)

        onSnapshot(contactsRef,(snapshot)=>{
          const contactList=snapshot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data(),
            }
          })
          setContacts(contactList)
          return contactList
        })

        
        
      } catch (error) {
        console.log(error)
      }

    }
     getContacts()
 
  }, [])
  
  const filterContact=(e)=>{
    const value=e.target.value

    const contactsRef=collection(db,"contacts") 
    onSnapshot(contactsRef,(snapshot)=>{
      const contactList=snapshot.docs.map((doc)=>{
        return{
          id:doc.id,
          ...doc.data(),
        }
      })

      const filteredContacts=contactList.filter((contact)=>
       contact.name.toUpperCase().includes(value.toUpperCase())
      )
      setContacts(filteredContacts)
      return filteredContacts
    })
  }


  return (
    <>
    <div className="main">
    <Navbar/>
    <div className="d-flex gap-2">
    <div className='d-flex position-relative flex-grow-1'>
    <FaSearch className="search text-white fs-5 position-absolute start-20" />
    <input onChange={filterContact} className='input_field flex-fill bg-transparent border-white rounded-pill h-auto text-white ps-5' type="text"/>
    </div>
    <AiFillPlusCircle onClick={onOpen} className="text-white fs-1"/>
    </div>
    <div className="mt-4 d-flex flex-column gap-3">
      {contacts.length<=0 ? (<NoContact />) : (contacts.map((contact)=>(
        <ContactCard key={contact.id} contact={contact} />
      )))}
    </div>
    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
