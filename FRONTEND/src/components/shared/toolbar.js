


import { Box, Button } from "@chakra-ui/react";
import { LoginModal } from "../modals/LoginModal";
import Account from "@/assets/icons/Account";
import { useContext, useEffect, useMemo } from "react";
import { UserConfig } from "@/context/UserConfig";

const Toolbar = () => {
  const {session,user,logout,loginInfo,setLoggedIn} = useContext(UserConfig);
  const loggedinn = useMemo(()=>{return loginInfo},[loginInfo.loggedIn,loginInfo.loginerror])
//   useEffect(()=>{
//     if(session){
//       // setLoggedIn(true);
//       console.log("loggin status changd to ",loggedIn)
//     }
//   },[loggedIn])
  return (
    <>
      {/* <Button color="primary" className="text-lg">
        Start Trial
      </Button> */}
      {!loggedinn.loggedIn? (
          <LoginModal
            // lfn={() => setLoggedIn(true)}
            // sfn={() => setLoggedIn(true)}
            // loggedIn={loggedIn}
          />
        ) : (
         <Box cursor={'pointer'} onClick={logout}> <Account /></Box>
        )}
      
  
    </>
  );
};

export default Toolbar;
