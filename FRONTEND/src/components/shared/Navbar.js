// import Account from "@/assets/icons/Account";
// import { UserConfig } from "@/context/UserConfig";
// import { Box, Button } from "@chakra-ui/react";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import React, { useContext, useEffect, useMemo, useState } from "react";
// import { GeneralButton } from "./buttons/General";
// import { LoginModal } from "./modals/LoginModal";
// // import
// export const Navbar = () => {
//   const {session,user,logout,loginInfo,setLoggedIn} = useContext(UserConfig);
//   // const router = useRouter();
//   const loggedinn = useMemo(()=>{return loginInfo},[loginInfo.loggedIn,loginInfo.loginerror])
//   // useEffect(()=>{
//   //   if(session){
//   //     // setLoggedIn(true);
//   //     console.log("loggin status changd to ",loggedIn)
//   //   }
//   // },[loggedIn])

//   return (
//     <div
//       zIndex={100}
//       className=" w-screen h-20 rounded-6xl    border-b-gray-600 flex flex-row justify-between"
//     >
//
//       <div className="flex flex-col justify-center align-middle mr-2">
//         {!loggedinn.loggedIn? (
//           <LoginModal
//             // lfn={() => setLoggedIn(true)}
//             // sfn={() => setLoggedIn(true)}
//             // loggedIn={loggedIn}
//           />
//         ) : (
//          <Box cursor={'pointer'} onClick={logout}> <Account /></Box>
//         )}
//       </div>
//     </div>
//   );
// };
import Link from "next/link";
import React from "react";
import Toolbar from "./toolbar";
import NavItems from "./nav.items";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <header className="w-full sticky top-o left-0 z-[999]  px-10 flex items-center justify-between h-[80px] bg-transparent bg-blur-lg  text-black">
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div>
        <NavItems />
      </div>
      <div>
        <Toolbar />
      </div>
    </header>
  );
};

export default Navbar;
