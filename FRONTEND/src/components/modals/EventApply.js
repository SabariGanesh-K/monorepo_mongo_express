import { UserConfig } from '@/context/UserConfig'
import { AxiosPost } from '@/lib/axios'
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

import React, { useContext, useEffect, useState } from 'react'
import { GeneralButton } from '../buttons/General'
import { ModalInput } from '../inputs/ModalInput'
// import lorem

export const EventApply = (props) => { 
  const [tabValue, setTabValue] = useState(1);
  const {user}=useContext(UserConfig);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState("")
    const [social, setsocial] = useState("")
    const [email, setEmail] = useState(user.email ? user.email:"" )
    const [pwd, setPwd] = useState("")
    const [cpwd, setcPwd] = useState("")
    const [applyLoading, setApplyLoading] = useState(false)
//props:- regfn,
 const handleApply =async()=>{
  setApplyLoading(true);
  console.log("geusting",props.eventid,{name:name,social:social,email:email,status:'pending'})
  const data=await AxiosPost('event/join',{eventid:props.eventid,adddata:{name:name,social:social,email:email,status:'pending'}});
  if(data.status==201){
    onClose();
  }
  props.setAppliedStatus('pending')
  setApplyLoading(false);

 }

  return (
    <div>
             <Button background={'black'} color='white' className='mt-2 md:mt-1 '  mr="2"  onClick={onOpen} >Apply Here</Button>
        <Modal size={'6xl'} isOpen={isOpen} onClose={onClose}>
         <ModalOverlay
      
       backdropFilter='blur(10px) '

    />

        <ModalContent>
          <ModalHeader  background={` background-color: #FBAB7E;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);`}  > <Box position="relative" pl="5px">
            Event Details
            </Box></ModalHeader>
          <ModalCloseButton />
       <ModalBody>
       <div className = "flex flex-row flex-wrap justify-begin   ">  <Text
       mr="5"
                        fontWeight="700"
                        color="black"
                        fontSize="24px"
                        fontStyle="normal"
                      >
                       21/04/24
                      </Text>
                      <Text
                      className='text-center'
                        fontWeight="700"
                        color="black"
                        fontSize="24px"
                        fontStyle="normal"
                      >
                   {props.organizer}
                      </Text></div>
       <Text
                      className='text-center md:text-left'

                        fontWeight="700"
                        color="black"
                        fontSize="24px"
                        fontStyle="normal"
                      >
                  {props.name}
                      </Text>
 <div className='flex w-full flex-row justify-center'>
  <div className='w-[100%]'>
                      <ModalInput text="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                      <ModalInput text="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                      <ModalInput text="Social Media / Linktree " value={social} onChange={(e)=>setsocial(e.target.value)} />
                      <div className='flex flex-row justify-center'>
                     <Button onClick={handleApply}>Apply to Join</Button> 
                     </div>
                      </div>
                      </div>

 
          </ModalBody>

          <ModalFooter>
            {/* <GeneralButton name="Edit Host" colorScheme='blue' mr={3} fn={onClose}/> */}
         
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
