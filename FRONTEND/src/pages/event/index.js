import { EventPreview } from '@/components/EventPreview';
import { EventAddModal } from '@/components/modals/EventAddModal';
import { LoginModal } from '@/components/modals/LoginModal';
import { EventConfig } from '@/context/EventsConfig';
import { UserConfig } from '@/context/UserConfig';
import PageCard from '@/layouts/Pagecard';
import { Box, Spinner, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'

export const Page = () => {
  const [TabValue, setTabValue] = useState(1)
  const { user ,loginInfo} = useContext(UserConfig);
  const { eventsLoading, EventsGuestData, EventsHostingData } = useContext(EventConfig);

  useEffect(() => {
    console.log(EventsGuestData)
    console.log(EventsHostingData)

  // console.log(user,user[0],user.email)
   
  }, [EventsGuestData ,EventsHostingData,user])
  
  return (
    <PageCard>
      <div className='flex flex-row justify-center mb-4'>
        {(loginInfo.loggedIn) ? <EventAddModal /> : <LoginModal />}
      </div>
      {user ? (
        <>
          <Tabs variant="unstyled">
            <TabList borderRadius="md" top="9.5rem" width="100%" zIndex="1">
              <Box display="flex">
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
                  // isDisabled={collateralTransactionStarted == true}
                  onClick={() => {
                    setTabValue(1);
                  }}
                >
                  Participating
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
                  // isDisabled={transactionStarted == true}
                  onClick={() => {
                    setTabValue(2);
                  }}
                >
                  Hosting
                </Tab>
              </Box>
            </TabList>
          </Tabs>
          {eventsLoading ? (
            <Spinner />
          ) : (
            <React.Fragment>
              {TabValue == 1 ? (
                <React.Fragment>
                  {EventsGuestData &&
                    EventsHostingData &&
                    EventsGuestData.length > 0 ? (
                    EventsGuestData.map((item, k) => {
                      return (
                        <EventPreview
                          key={k}
                          data={item}
                          host={TabValue == 2}
                        />
                      );
                    })
                  ) : (
                    <Text>No events participating</Text>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {EventsHostingData.length > 0 ? (
                    EventsHostingData.map((item, k) => {
                      return (
                        <EventPreview
                          key={k}
                          data={item}
                          host={TabValue == 2}
                        />
                      );
                    })
                  ) : (
                    <Text>No events hosting</Text>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </>
      ) : (
        <></>
      )}
    </PageCard>
  );
};
export default Page;