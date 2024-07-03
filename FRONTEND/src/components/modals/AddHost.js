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
    Box,Input, Text, Tab, Tabs, TabList
  } from '@chakra-ui/react'

import React, { useState } from 'react'
import { GeneralButton } from '../buttons/General'
import { ModalInput } from '../inputs/ModalInput'
// import lorem

export const AddHostModal = (props) => {
  const [tabValue, setTabValue] = useState(1);

    const { isOpen, onOpen, onClose } = useDisclosure()
 
    const [username, setUserName] = useState("")
   
    const handleInvite = () =>{
        // props.lfn();
        onClose()
        

    }
   
  return (
    <div>
             <GeneralButton   ml={'4'}
            mr={'4  '}   _hover={{
              transform: "translateY(-5px)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }} name="Add Host" fn={onOpen} colorScheme='blue' />
        <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay
      
       backdropFilter='blur(10px) '

    />

        <ModalContent>
          <ModalHeader> Add Host </ModalHeader>
          <ModalCloseButton />
          
           <ModalBody>
            

      <ModalInput text="Email" value={username} onChange={(e)=>setUserName(e.target.value)} />

      

          </ModalBody>

          <ModalFooter>
            <GeneralButton colorScheme='blue' mr={3} fn={onClose}>
              Close
            </GeneralButton>
            <Button onClick={handleInvite} variant='ghost'>{"Invite"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
