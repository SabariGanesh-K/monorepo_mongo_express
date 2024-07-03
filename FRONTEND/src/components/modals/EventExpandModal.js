import { UserConfig } from "@/context/UserConfig";
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
  Box,
  Input,
  Text,
  Tab,
  Tabs,
  TabList,
} from "@chakra-ui/react";
import Image from "next/image";

import React, { useContext, useState } from "react";
import { GeneralButton } from "../buttons/General";
import { ModalInput } from "../inputs/ModalInput";
// import lorem

export const EventExpandModal = (props) => {
  const [tabValue, setTabValue] = useState(1);
  const { user } = useContext(UserConfig);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setcPwd] = useState("");
  //props:- regfn,
  const handleLogin = () => {
    props.lfn();
    onClose();
  };
  const handleSignup = () => {
    props.sfn();
    onClose();
  };
  const inpp = `hello <b>hello</b>`;

  return (
    <div>
      <GeneralButton className="mt-2 md:mt-1" mr="2" name="More" fn={onOpen} />
      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px) " />

        <ModalContent>
          <ModalHeader
            background={` background-color: #FBAB7E;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);`}
          >
            {" "}
            <Box position="relative" pl="5px">
              Event Details
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-row flex-wrap justify-begin   ">
              {" "}
              <Text
                mr="5"
                fontWeight="700"
                color="black"
                fontSize="24px"
                fontStyle="normal"
              >
                21/04/24
              </Text>
              <Text
                className="text-center"
                fontWeight="700"
                color="black"
                fontSize="24px"
                fontStyle="normal"
              >
                {props.data.name}
              </Text>
            </div>
            <Text
              className="text-center md:text-left"
              fontWeight="700"
              color="black"
              fontSize="24px"
              fontStyle="normal"
            >
              {props.data.name}
            </Text>
            {/* <div
        style={{
          width: "50%",
          height: "100%",
          background: "blue",
          position: "relative",
        }}
      > */}
      <Box display={'flex'} flexDirection="row" justifyContent={'center'} >
            <Image
            
              src="https://cdn.dollsofindia.com/images/p/landscape-posters/village-landscape-LJ-51_l.jpg"
              width="1024"
              height={"768"}
            />
            </Box>
            {/* </div> */}
            {/* { !props.host && <div className='flex w-full flex-row justify-center'>
  <div className='w-[100%]'>
                      <ModalInput text="Name" value={username} onChange={(e)=>setUserName(e.target.value)} />
                      <ModalInput text="Email" value={username} onChange={(e)=>setUserName(e.target.value)} />
                      <ModalInput text="Social Media / Linktree " value={username} onChange={(e)=>setUserName(e.target.value)} />
                      
                      <div className='flex flex-row justify-center'>
                     <GeneralButton name="Apply to Join" />
                     </div>
                      </div>
                      </div>} */}

            <Box
              border={"1px solid #676D9A"}
              background="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
              padding={"3"}
              color="black"
              fontFamily={"Inter"}
            >
              {props.data.desc}
            </Box>
            <div className="mt-4 flex flex-row justify-evenly">
              {props.data.hosts &&
                props.data.hosts.map((item) => {
                  <Box
                    rounded="3xl"
                    cursor="pointer"
                    _hover={{
                      transform: "translateX(-25px)",
                      transitionDuration: "0.2s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                    border={"1px solid #676D9A"}
                    background="var(--surface-of-10, rgba(103, 109, 154, 0.10))"
                    padding={"3"}
                    color="black"
                    fontFamily={"Inter"}
                  >
                    {" "}
                    {item.name}{" "}
                  </Box>;
                })}
            </div>
          </ModalBody>

          <ModalFooter>
            {/* <GeneralButton name="Edit Host" colorScheme='blue' mr={3} fn={onClose}/> */}
            {user && user.email == props.data.email && (
              <GeneralButton
                name="Add Host"
                colorScheme="blue"
                cursor={props.data.cancelled ? "not-allowed" : "solid"}
                mr={3}
                fn={onClose}
              />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
