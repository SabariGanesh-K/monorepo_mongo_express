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

import React, { useContext, useState } from "react";
import { GeneralButton } from "../buttons/General";
import { ModalInput } from "../inputs/ModalInput";
// import lorem

export const LoginModal = (props) => {
  const [tabValue, setTabValue] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setcPwd] = useState("");
  const { login, signup, session,loginInfo, signupsuccess, Signuperror } =
    useContext(UserConfig);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("dorrrne");

    setLoading(true);
    try {
      console.log("hehe");
      await login({ email: email, password: pwd });
        console.log("done")
        // if(session) {
          setLoading(false);
          if(!loginInfo.loginerror){
            onClose();

          }
          else{
            onOpen()
          }
    } catch (err) {
      console.log("error in handlkelogin", err);
    }
  };
  const handleSignup = async () => {
    console.log("dorrrne");

    setLoading(true);
    await signup({
      username: username,
      userName: username,
      email: email,
      password: pwd,
      name: name,
    });
    console.log("done");
    // if(session) {
    setLoading(false);
    if (!loginInfo.loginerror && signupsuccess) {
      onClose();
    }
    // }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <GeneralButton name="Login" fn={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px) " />

        <ModalContent>
          <ModalHeader>
            {" "}
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
                      Login
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
                      SignUp
                    </Tab>
                  </Box>
                </TabList>
              </Tabs>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          {tabValue == 1 ? (
            <ModalBody>
              <ModalInput
                text="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <ModalInput
                type="password"
                text="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />

              {loginInfo.loginerror && (
                <Box
                  // display="flex"
                  // justifyContent="left"
                  // w="80%"
                  // pb="4"
                  // height="64px"
                  display="flex"
                  alignItems="center"
                  mt="1rem"
                  mb="1rem"
                >
                  <Box
                    display="flex"
                    bg="#480C10"
                    color="#F0F0F5"
                    fontSize="14px"
                    p="4"
                    border="1px solid #9B1A23"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="18px"
                    borderRadius="6px"
                    // textAlign="center"
                  >
                    <Box pr="3" mt="0.5" cursor="pointer">
                      {/* <RedinfoIcon/> */}
                    </Box>
                    There was an error in logging in to your account. Kindly
                    check your password.
                    {/* <Box
                                py="1"
                                pl="4"
                                cursor="pointer"
                                // onClick={handleClick}
                              >
                                <TableClose />
                              </Box> */}
                  </Box>
                </Box>
              )}
            </ModalBody>
          ) : (
            <ModalBody>
              <ModalInput
                text="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <ModalInput
                text="Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <ModalInput
                text="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <ModalInput
                type="password"
                text="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <ModalInput
                type="password"
                text="Confirm Password"
                error={pwd && cpwd && pwd != cpwd}
                value={cpwd}
                onChange={(e) => setcPwd(e.target.value)}
              />
              {signupsuccess && (
                <Box color={"black"} background="green" padding="2" m="2">
                  Checkout your email for verification
                </Box>
              )}

              {Signuperror && (
                <Box
                  // display="flex"
                  // justifyContent="left"
                  // w="80%"
                  // pb="4"
                  // height="64px"
                  display="flex"
                  alignItems="center"
                  mt="1rem"
                  mb="1rem"
                >
                  <Box
                    display="flex"
                    bg="#480C10"
                    color="#F0F0F5"
                    fontSize="14px"
                    p="4"
                    border="1px solid #9B1A23"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="18px"
                    borderRadius="6px"
                    // textAlign="center"
                  >
                    <Box pr="3" mt="0.5" cursor="pointer">
                      {/* <RedinfoIcon/> */}
                    </Box>
                    Email Already in use . Kindly login using the password.
                    {/* <Box
                                py="1"
                                pl="4"
                                cursor="pointer"
                                // onClick={handleClick}
                              >
                                <TableClose />
                              </Box> */}
                  </Box>
                </Box>
              )}
            </ModalBody>
          )}

          <ModalFooter>
            {!signupsuccess && (
              <Button
                onClick={tabValue == 1 ? handleLogin : handleSignup}
                variant="ghost"
              >
                {tabValue == 1 ? "Log In" : "Sign Up"}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
