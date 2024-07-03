import { EventProvider } from '@/context/EventsConfig';
import { UserProvider } from '@/context/UserConfig';
import PageCard from '@/layouts/Pagecard';
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../app/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider>
      <UserProvider>
<EventProvider>
     
      {/* <PageCard> */}
      <Component {...pageProps}/>
      </EventProvider>
      {/* </PageCard> */}
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp;