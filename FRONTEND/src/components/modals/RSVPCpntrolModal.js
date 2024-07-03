import { EventConfig } from "@/context/EventsConfig";
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

import React, { useContext, useState } from "react";
import { GeneralButton } from "../buttons/General";
import { ModalInput } from "../inputs/ModalInput";
// import lorem

export const RSVPCpntrolModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(props.data);
  const { approveRequest, declineRequest } = useContext(EventConfig);
  const [TabValue, setTabValue] = useState(1);

  const handleInvite = () => {
    // props.lfn();
    onClose();
  };

  return (
    <div>
      <Button onClick={onOpen} className="mt-2 md:mt-1" mr="2">
        RSVP Control
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay
      
       backdropFilter='blur(10px) '

    />

        <ModalContent>
          <ModalHeader
            background={` background-color: #FBAB7E;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);`}
          >
            {" "}
            Control Particiapnts{" "}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box position="relative" pl="5px">
              <Tabs variant="unstyled">
                <TabList borderRadius="md" top="9.5rem" width="100%" zIndex="1">
                  <Box display="flex" width="300px">
                    <Tab
                      py="1"
                      px="3"
                      color="#676D9A"
                      fontSize="sm"
                      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                      borderLeftRadius="md"
                      fontWeight="normal"
                      opacity="100%"
                      _selected={{
                        color: "white",
                        bg: "#4D59E8",
                        border: "none",
                      }}
                      //   isDisabled={collateralTransactionStarted == true}
                      onClick={() => {
                        setTabValue(1);
                      }}
                    >
                      Pending
                    </Tab>
                    <Tab
                      py="1"
                      px="3"
                      color="#676D9A"
                      fontSize="sm"
                      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                      borderRightRadius="md"
                      fontWeight="normal"
                      opacity="100%"
                      _selected={{
                        color: "white",
                        bg: "#4D59E8",
                        border: "none",
                      }}
                      //   isDisabled={transactionStarted == true}
                      onClick={() => {
                        setTabValue(2);
                      }}
                    >
                      Attended
                    </Tab>
                  </Box>
                </TabList>
              </Tabs>
            </Box>
            {TabValue == 1
              ? props.data.map((item, k) => {
                  if (item.status == "pending") {
                    return (
                      <div key={k}>
                        <Box
                          background={`background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
    `}
                          p="3"
                          mt="3"
                        >
                          <div className="flex flex-row justify-between">
                            {" "}
                            <Text fontFamily={"Inter"} fontSize="16px">
                              {item.name}
                            </Text>
                            <Button>Visit Social</Button>
                          </div>
                          <div className="flex flex-row justify-begin">
                            <Button
                              onClick={() =>
                                approveRequest({
                                  eventmail: props.eventemail,
                                  guestemail: item.email,
                                })
                              }
                              colorScheme={"green"}
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() =>
                                declineRequest({
                                  eventmail: props.eventemail,
                                  guestemail: item.email,
                                })
                              }
                              ml="2"
                              colorScheme={"red"}
                            >
                              Decline
                            </Button>
                          </div>
                        </Box>
                      </div>
                    );
                  }
                })
              : props.data.map((item, k) => {
                  if (item.status != "pending") {
                    return (
                      <div key={k}>
                        <Box
                          background={`background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
`}
                          p="3"
                          mt="3"
                        >
                          <div className="flex flex-row justify-between">
                            {" "}
                            <Text fontFamily={"Inter"} fontSize="16px">
                              {props.name}
                            </Text>
                            <Button>Visit Social</Button>
                          </div>
                          <div className="flex flex-row justify-begin mt-3">
                            <Box
                              cursor={"not-allowed"}
                              background="black"
                              fontFamily={"Inter"}
                              fontWeight="400"
                              padding={"2"}
                              rounded="lg"
                              color={"white"}
                            >
                              {props.status}
                            </Box>
                            {/* <Box cursor={'not-allowed'} background="black" fontFamily={'Inter'} fontWeight="400" padding={"2"} rounded="lg" color={"white"} >Rejected</Box> */}

                            <Button ml="2" colorScheme={"red"}>
                              Revert and Decline
                            </Button>
                            {/* <Button ml="2" colorScheme={"green"}>Revert and Accept</Button> */}
                          </div>
                        </Box>
                      </div>
                    );
                  }
                })}
          </ModalBody>

          <ModalFooter>
            <GeneralButton colorScheme="blue" mr={3} fn={onClose}>
              Close
            </GeneralButton>
            <Button onClick={handleInvite} variant="ghost">
              {"Invite"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
