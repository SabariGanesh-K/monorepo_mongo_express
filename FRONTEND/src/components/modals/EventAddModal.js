import { EventConfig } from '@/context/EventsConfig'
import { UserConfig } from '@/context/UserConfig'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,Input, Text, Tab, Tabs, TabList, Select
  } from '@chakra-ui/react'

import React, { useContext, useState } from 'react'
import { GeneralButton } from '../buttons/General'
import { ModalInput } from '../inputs/ModalInput'
// import lorem

export const EventAddModal = (props) => {
  const [tabValue, setTabValue] = useState(1);
//   {"eventid":"sabb2","name":"ragging","urlAlias":"raggnigga2","organizer":"nigga","email":"k.sabarii.ganesh@gmail.com","openedDate":"2023-11-18","mode":"online","desc":"shit" }
    const { isOpen, onOpen, onClose } = useDisclosure()
const [eventid, setEventid] = useState("");
const [eventname, setEventname] = useState("")
const {login,signup,session,user} = useContext(UserConfig);

const [contactemail, setContactemail] = useState(user?user.email:"");
const [eventdate, setEventdate] = useState("");
const [eventmode, setEventmode] = useState("");
const [eventvenue, setEventvenue] = useState("");
const [desc, setDesc] = useState("k ");
    const {postEvent}=useContext(EventConfig)
    const [loading, setLoading] = useState(false)
    const [addLoader, setAddLoader] = useState(false)
   const handleAddEvent = async() =>{
    setAddLoader(true);
    await postEvent({owneremail:user.email,eventid:eventid,name:eventname,urlAlias:eventid,organizer:contactemail,email:contactemail,eventdate:eventdate,mode:eventmode,openedDate:new Date(),deadLine:eventdate, desc:"shit",guests:[]});
    
    setAddLoader(false);
    onClose();
   }     

  
 
  return (
    <div>
             <GeneralButton name={user?"Host Your Event":"Signup to Host your event !"} fn={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay
      
       backdropFilter='blur(10px) '

    />

        <ModalContent>
          <ModalHeader> <Box position="relative" pl="5px">
         Add Event
                 
            </Box></ModalHeader>
          <ModalCloseButton />
          { <ModalBody>
            
      <ModalInput text="Event Name" value={eventname} onChange={(e)=>setEventname(e.target.value)} />
      <ModalInput text="Event Alias (will be used everywhere)" value={eventid} onChange={(e)=>setEventid(e.target.value)} />
      <ModalInput text="Contact Email" value={contactemail} onChange={(e)=>setContactemail(e.target.value)} />
      <Select mt="2" mb="2"  value={eventmode} onChange={(e)=>setEventmode(e.target.value)} placeholder='Select Venue'>
    <option>Online</option>
    <option>Offline</option>
  </Select>
      <ModalInput text="Event Venue" value={eventvenue} onChange={(e)=>setEventvenue(e.target.value)} />
      <Input  mt="2" mb="2" value={eventdate} 
 placeholder="Select Date and Time"
 onChange={(e)=>setEventdate(e.target.value)}
 size="md"
 type="datetime-local"
/>
     
      

          </ModalBody>}

          <ModalFooter>
            <GeneralButton colorScheme='blue' mr={3} fn={onClose}>
              Close
            </GeneralButton>
            <Button onClick={handleAddEvent} variant='ghost'>{"ADD EVENT"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
