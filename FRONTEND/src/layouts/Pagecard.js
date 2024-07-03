import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Navbar from "@/components/shared/Navbar";
const PageCard= ({ children, className, ...rest }) => {
    return( <main>
        <Box className="w-screen" background={'black'}position={'fixed'} zIndex={3} >
    <Navbar    />
    </Box>
    <Stack
    zIndex={1}

    alignItems="center"
    minHeight={"100vh"}

    pt="8rem"
    background={` 
    background-color: #000000;
    
`}

   
  
  >
   

   {children} 

  
  </Stack>
  </main>)

}
export default PageCard