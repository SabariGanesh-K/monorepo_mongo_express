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
    Box,Input, Text, Tab, Tabs, TabList, Select,InputAddon,InputLeftAddon,InputRightAddon,InputGroup, Textarea
  } from '@chakra-ui/react'

import React, { useContext, useState } from 'react'
import { GeneralButton } from '../buttons/General'
import { ModalInput } from '../inputs/ModalInput'
// import lorem

export const EventEditModal = (props) => {
  const [tabValue, setTabValue] = useState(1);
//   {"eventid":"sabb2","name":"ragging","urlAlias":"raggnigga2","organizer":"nigga","email":"k.sabarii.ganesh@gmail.com","openedDate":"2023-11-18","mode":"online","desc":"shit" }
    const { isOpen, onOpen, onClose } = useDisclosure()
const [eventid, setEventid] = useState("");
const [eventname, setEventname] = useState(props.data.name)
const {login,signup,session,user} = useContext(UserConfig);
const [eventDesc, setEventDesc] = useState(props.data.desc?props.data.desc:"");
const [contactemail, setContactemail] = useState(props.data.email);
const [eventdate, setEventdate] = useState(props.data.openedDate);
const [eventmode, setEventmode] = useState(props.data.mode);
const [eventOFvenue, setEventOFvenue] = useState(props.data.onlineVenue?props.data.onlineVenue :"");
const [eventONvenue, setEventONvenue] = useState(props.data.offlineVenue?props.data.offlineVenue :"");

const [desc, setDesc] = useState("");
    const {editEvent}=useContext(EventConfig)
    const [loading, setLoading] = useState(false)
    const [addLoader, setAddLoader] = useState(false)
    const [newName, setNewName] = useState(props.data.name);
    const [newDesc, setNewDesc] = useState(props.data.desc?props.data.desc:"");
    const [Neweventdate, setNewEventdate] = useState(props.data.openedDate);
    const [newMode, setNewMode] = useState(props.data.mode);
    const [newEventOFvenue, setNewEventOFvenue]  = useState(props.data.onlineVenue?props.data.onlineVenue :"");
    const [newEventONvenue, setNewEventONvenue]  = useState(props.data.offlineVenue?props.data.offlineVenue :"");
   const handleEditEvent = async() =>{
    setAddLoader(true);
    await editEvent({eventid:props.data.eventid,updateData:{name:newName,desc:newDesc,openedDate:Neweventdate,mode:newMode,desc:newDesc,onlineVenue:newEventONvenue,offlineVenue:newEventOFvenue}});
    setAddLoader(false);
    onClose();
   }

  
 
  return (
    <div>
            <Button onClick={onOpen} className="mt-2 md:mt-1" mr="2">
       Edit Event
      </Button>
        <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
         <ModalOverlay
    //   bg='firebrick.300'
      backdropFilter='blur(10px) '
    />

        <ModalContent>
          <ModalHeader> <Box position="relative" pl="5px">
         Edit Event
                 
            </Box></ModalHeader>
          <ModalCloseButton />
          { <ModalBody>
            
      <ModalInput text="Event Name" value={newName} onChange={(e)=>setNewName(e.target.value)} />
      {/* <ModalInput text="Contact Email" value={contactemail} onChange={(e)=>setContactemail(e.target.value)} /> */}
      <Select mt="2" mb="2"  value={newMode} onChange={(e)=>setNewMode(e.target.value)} placeholder='Select Venue'>
    <option>Online</option>
    <option>Offline</option>
  </Select>
     {newMode=="Online"? <InputGroup  size='sm'>
    <InputLeftAddon>
      https://
    </InputLeftAddon>
    <Input value={newEventONvenue} placeholder='meeting link' onChange={(e)=>setNewEventONvenue(e.target.value)} />
   
  </InputGroup>:<ModalInput text="Event Venue" value={newEventOFvenue} onChange={(e)=>setEventOFvenue(e.target.value)} />}
      <Input  mt="2" mb="2" value={Neweventdate} 
 placeholder="Select Date and Time"
 onChange={(e)=>setNewEventdate(e.target.value)}
 size="md"
 type="datetime-local"
/>
<Box display="flex">
      <Text color={props.error ? "#CF222E":" var(--neutral, #676D9A)"}
        font-family=" Inter"
        font-size=" 12px"
        font-style=" normal"
        font-weight=" 400"
        line-height=" 12px" /* 100% */
        letter-spacing=" -0.15px"  >
      Description
      </Text>
    </Box>
    <Box
      width="100%"
      borderRadius="6px"
      display="flex"
      justifyContent="space-between"
      border={props.error ? "1px solid #CF222E":"1px solid #676D9A"}
      background=" var(--surface-of-10, rgba(103, 109, 154, 0.10))"
      color={props.error ? "#CF222E":" var(--neutral, #676D9A)"}
      fontFamily=" Inter"
      fontSize=" 16px"
      fontStyle=" normal"
      fontWeight=" 500"
      lineHeight=" 20px" /* 142.857% */
      letterSpacing=" -0.15px"
    >
        <br/>
<Textarea
height={"xl"}
resize={"vertical"}
        value={newDesc}
        onChange={(e)=>setNewDesc(e.target.value)}
        size='3xl'
        placeholder="Description of your event"
        _placeholder={{
          color: "rgba(240, 240, 245, 0.50)",
          fontFamily: "Inter",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "20px",
          letterSpacing: "-0.15px"

        }}
      />
      </Box>

          </ModalBody>}

          <ModalFooter>
            <GeneralButton colorScheme='blue' mr={3} fn={onClose}>
              Close
            </GeneralButton>
            <Button isLoading={addLoader} onClick={handleEditEvent} variant='ghost'>SAVE CHANGES</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
