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
    Box,Input, Text, Tab, Tabs, TabList, Spinner
  } from '@chakra-ui/react'

import React, { useContext, useState } from 'react'
import { GeneralButton } from '../buttons/General'
import { ModalInput } from '../inputs/ModalInput'
// import lorem

export const EventCancelModalConfirmationModal = (props) => {
  const [tabValue, setTabValue] = useState(1);
  const [deleteLoading, setdeleteLoading] = useState(false)

const {cancelEvent}=useContext(EventConfig)
const {user,deleteEventFromUser}=useContext(UserConfig)
    const { isOpen, onOpen, onClose }  = useDisclosure()
  const [Deleted, setDeleted] = useState(false)

    const [cancelled, setCancelled] = useState(props.cancelled ? props.cancelled:false)
 const [cancelLoading, setCancelLoading] = useState(false)
    const [username, setUserName] = useState("")
   const handleAgreeCancel=async() =>{
    setCancelLoading(true)
               await cancelEvent({eventid:props.eventid,email:user.email})
               setCancelled(true)
               setCancelLoading(false);
               onClose()
   }
    const handleDecline = () =>{
        // props.lfn();
        onClose()
        

    }
    const handleDeleteEventFromUser = async() =>{
      setdeleteLoading(true);
      await deleteEventFromUser({ eventid: props.eventid, email: user.email });
  
      setdeleteLoading(false);
      setDeleted(true)
  
    }
   
  return (
    <div>
       {cancelled ?  
       !Deleted ?    <Box display={"flex"} justifyContent={"center"} flexDirection="row"> <Button
       className="mt-2 md:mt-1"
       colorScheme={"red"}
       mr="2"
       cursor={"not-allowed"}
     >
       EVENT CANCELLED
     </Button>
     <GeneralButton
     className="mt-2 md:mt-1"
     colorScheme={"red"}
     isLoading={deleteLoading}

     mr="2"
     name="Delete Event"
     fn={handleDeleteEventFromUser}
   /> </Box>  :<Button
   className="mt-2 md:mt-1"
   colorScheme={"red"}
   mr="2"
   cursor={"not-allowed"}
 >
   EVENT Deleted
 </Button> 
  :   
       <GeneralButton  className='mt-2 md:mt-1' colorScheme={"red"} mr="2" name="Cancel Event"  fn={onOpen} />}    
        <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay
      
       backdropFilter='blur(10px) '

    />

        <ModalContent>
          <ModalHeader> Cancel Event </ModalHeader>
          <ModalCloseButton />       
          
           <ModalBody>
            
<Text>Are you sure you want to cancel the Event ? </Text>
{cancelLoading ? <Spinner/>:<Box alignItems={"center"}>
            <Button onClick={handleAgreeCancel} colorScheme="green" variant='ghost'>{"Yes"}</Button>
            <Button onClick={handleDecline} colorScheme="red" variant='ghost'>{"No"}</Button>
            </Box>}

      

          </ModalBody>

          <ModalFooter>
         
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
2