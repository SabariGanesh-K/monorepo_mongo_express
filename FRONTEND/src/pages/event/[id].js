import { GeneralButton } from "@/components/buttons/General";
import { EventPreview } from "@/components/EventPreview";
import { AddHostModal } from "@/components/modals/AddHost";
import { EventApply } from "@/components/modals/EventApply";
import { UserConfig } from "@/context/UserConfig";
import PageCard from "@/layouts/Pagecard";
import { AxiosGet } from "@/lib/axios";
import { Box, Button, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { data } from "autoprefixer";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export const Page = () => {
  const [TabValue, setTabValue] = useState(1);
  const route = useRouter();
  const { currentusermail ,user} = useContext(UserConfig);
  const [host, setHost] = useState(true);
  const [EventData, setEventData] = useState();
  const [loading, setLoading] = useState(true);
  const [appliedStatus, setAppliedStatus] = useState("na");

  useEffect(() => {
    const getData = async () => {
      console.log("Searching for", route.query.id);
      if (route.query.id) {
        const data = await AxiosGet(`event/${route.query.id}`);
        setEventData(data);
        setHost(user.email==data.organizer);
        console.log("event is", data);
        setLoading(false);
      }
    };
    getData();
  }, [route.query.id]);
  useEffect(() => {
   EventData && EventData.guests &&
    EventData.guests.map((guest) => {
      console.log(guest.email,currentusermail);
        if (guest.email == currentusermail) {
          setAppliedStatus(guest.status);
        }
      });
  }, [EventData, currentusermail]);

  return (
    <PageCard>
      <div className="m-3">
        {loading ? (
          <div>Loading</div>
        ) : (
          <div className="w-[90vw]">
            {" "}
            <Box
              roundedTop={"xl"}
              p="3"
              background={"white"}
              // background={ `background-color: #FFFFFF;background-image: radial-gradient( circle 588px at 31.7% 40.2%,  rgba(225,200,239,1) 21.4%, rgba(163,225,233,1) 57.1% );` }
              className="flex flex-row flex-wrap justify-between   "
            >
              {" "}
              <Box
                roundedTop={"xl"}
                p="3"
                background={"white"}
                // background={ `background-color: #FFFFFF;background-image: radial-gradient( circle 588px at 31.7% 40.2%,  rgba(225,200,239,1) 21.4%, rgba(163,225,233,1) 57.1% );` }
                className="flex flex-row flex-wrap justify-begin   "
              >
                <Text
                  mr="5"
                  fontWeight="700"
                  color="black"
                  fontSize="24px"
                  fontStyle="normal"
                >
                  {EventData.d}
                </Text>
                <Text
                  className="text-center"
                  fontWeight="700"
                  color="black"
                  fontSize="24px"
                  fontStyle="normal"
                >
                  {EventData.name}
                </Text>
              </Box>
              <Box
                roundedTop={"xl"}
                p="3"
                background={"white"}
                // background={ `background-color: #FFFFFF;background-image: radial-gradient( circle 588px at 31.7% 40.2%,  rgba(225,200,239,1) 21.4%, rgba(163,225,233,1) 57.1% );` }
                className="flex flex-row flex-wrap justify-begin   "
              >
               {appliedStatus=="na"? <EventApply
               setAppliedStatus={setAppliedStatus}
                  eventid={route.query.id}
                  name={EventData.name}
                  organizer={EventData.organizer}
                />: <Button cursor={"not-allowed"} colorScheme={appliedStatus=="pending"? "orange":appliedStatus=="declined"? "red":appliedStatus=="blocked"? "red":appliedStatus=="accepted"? "green":"orange" } >{appliedStatus=="pending"? "Awaiting Approval":appliedStatus=="declined"? "Application Declined":appliedStatus=="accepted"? "Approved":"Unable to Apply" }</Button> }
              </Box>
            </Box>
            <Text
              p="3"
              className="text-center md:text-left"
              fontWeight="700"
              background={"white"}
              color="black"
              fontSize="24px"
              fontStyle="normal"
            >
              {EventData.name}
            </Text>
            <Box background={'white'}  display={'flex'} flexDirection="row" justifyContent={'center'} >
            <Image
            className="mb-10"
              src="https://cdn.dollsofindia.com/images/p/landscape-posters/village-landscape-LJ-51_l.jpg"
              width="1024"
              height={"768"}
            />
            
            </Box>
            <Box
              // rounded="xl"
              p={"3"}
              // mt="4"
              pt="4"
              background={`background-color: #FBAB7E;
      background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
      `}
              fontSize={"18px"}
              padding={"3"}
              color="black"
              fontWeight={"400"}
              fontFamily={"Inter"}
            >
              {EventData.desc}
            </Box>
            <div className="mt-4 flex flex-row justify-begin ">
              <Box
                rounded="3xl"
                cursor="pointer"
                _hover={{
                  transform: "translateY(-5px)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                ml={"4"}
                mr={"4  "}
                border={"1px solid #676D9A"}
                background="white"
                padding={"3"}
                color="black"
                fontWeight={"400"}
                fontFamily={"Inter"}
              >
                Sabari Ganesh{" "}
              </Box>

              <Box
                rounded="3xl"
                cursor="pointer"
                _hover={{
                  transform: "translateY(-5px)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                ml={"4"}
                mr={"4  "}
                border={"1px solid #676D9A"}
                background="white"
                padding={"3"}
                color="black"
                fontWeight={"400"}
                fontFamily={"Inter"}
              >
                Sabari Ganesh{" "}
              </Box>
              {host && <AddHostModal />}
            </div>
          </div>
        )}
      </div>
    </PageCard>
  );
};
export default Page;
