import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EventCancelModalConfirmationModal } from "./modals/EventCancelModalConfirmationModal";
import { EventEdit, EventEditModal } from "./modals/EventEditModal";
import { EventExpandModal } from "./modals/EventExpandModal";
import { EventRSVPCancelModalConfirmationModal } from "./modals/EventRSVPCancelModalConfirmationModal";
import { RSVPCpntrolModal } from "./modals/RSVPCpntrolModal";
import Image from "next/image";
export const EventPreview = (props) => {
  return (
    // <Box
    //   _hover={{
    //     transform: "translateX(-25px)",
    //     transitionDuration: "0.2s",
    //     transitionTimingFunction: "ease-in-out",
    //   }}
    //   transition={{ exit: { delay: 1 }, enter: { duration: 0.5 } }}
    //   padding={"5"}
    //   rounded={"13"}
    //   width={"60%"}
    //   background={`
    // background-color: #FBAB7E;
    // background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);

    //       `}
    // >
    //   <div className="flex flex-row justify-evenly">
    //   {/* <Navbar    /> */}
    //   <div>
    //   <div className="flex flex-row flex-wrap justify-evenly   ">
    //     {" "}
    //     <Text fontWeight="700" color="black" fontSize="24px" fontStyle="normal">
    //       {props.data.openedDate.slice(0, 10)}
    //     </Text>
    //     <Text
    //       className="text-center"
    //       fontWeight="700"
    //       color="black"
    //       fontSize="24px"
    //       fontStyle="normal"
    //     >
    //       {props.data.name}
    //     </Text>
    //   </div>
    //   <Text
    //     className="text-center md:text-left"
    //     fontWeight="700"
    //     align={'center'}
    //     color="black"
    //     fontSize="24px"
    //     fontStyle="normal"
    //   >
    //     {props.data.name}
    //   </Text>
    //   <div className="flex flex-col   flex-wrap justify-center md:justify-between ">
    //     <div className="flex flex-row   flex-wrap justify-center md:justify-around ">
    //       <Text
    //         mr={"4"}
    //         alignContent={"center"}
    //         alignItems="center"
    //         fontWeight="700"
    //         color="black"
    //         fontSize="14px"
    //         fontStyle="normal"
    //         display={"flex"}
    //         flexDirection="column"
    //         justifyContent={"end"}
    //       >
    //         {props.data.mode}
    //       </Text>
    //       {!props.host && (
    //         <Text
    //           fontWeight="700"
    //           color="black"
    //           fontSize="14px"
    //           fontStyle="normal"
    //           display={"flex"}
    //           flexDirection="column"
    //           justifyContent={"end"}
    //         >
    //           {/* {props.data.status} */}
    //         </Text>
    //       )}
    //     </div>
    //     <div className=" flex flex-row  flex-wrap justify-between md:justify-around ">
    //       {props.host ? (
    //         <EventCancelModalConfirmationModal eventid={props.data.eventid} cancelled={props.data.cancelled} />
    //       ) : (
    //         <div display={"flex"} flexDirection="column" justifyContent={"end"}>
    //         <EventRSVPCancelModalConfirmationModal eventid={props.data.eventid} cancelled={props.data.cancelled} />
    //         </div>
    //       )}
    //       {props.host&& !props.data.cancelled && (
    //         <div display={"flex"} flexDirection="column" justifyContent={"end"}>
    //           <EventEditModal data={props.data} />{" "}
    //         </div>
    //       )}
    //       {props.host && !props.data.cancelled &&  (
    //         <div display={"flex"} flexDirection="column" justifyContent={"end"}>
    //           <RSVPCpntrolModal
    //             data={props.data.guests}
    //             eventemail={props.data.email}
    //           />
    //         </div>
    //       )}
    //       <div display={"flex"} flexDirection="column" justifyContent={"end"}>
    //         <EventExpandModal data={props.data} host={props.host} />
    //       </div>
    //     </div>
    //   </div>
    //   </div>
    //   <div>
    //
    //   </div>
    //   </div>
    // </Box>

    <Box className="w-[80%] isolate p-2 flex flex-col jus rounded-xl bg-neutral-700/20 shadow-lg ring-1 ring-black/5">
      <a
        href="#"
        class="flex flex-col items-center  rounded-lg shadow md:flex-row p-2 bg-transpsrent"
      >
        <Image
          src="https://illustoon.com/photo/7251.png"
          alt="event_id"
          width={110}
          height={110}
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.data.name}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.data.mode}
            far, in reverse chronological order.
          </p>
        </div>
      </a>
      <div className=" flex flex-row  flex-wrap justify-between md:justify-around ">
        {props.host ? (
          <EventCancelModalConfirmationModal
            eventid={props.data.eventid}
            cancelled={props.data.cancelled}
          />
        ) : (
          <div display={"flex"} flexDirection="column" justifyContent={"end"}>
            <EventRSVPCancelModalConfirmationModal
              eventid={props.data.eventid}
              cancelled={props.data.cancelled}
            />
          </div>
        )}
        {props.host && !props.data.cancelled && (
          <div display={"flex"} flexDirection="column" justifyContent={"end"}>
            <EventEditModal data={props.data} />{" "}
          </div>
        )}
        {props.host && !props.data.cancelled && (
          <div display={"flex"} flexDirection="column" justifyContent={"end"}>
            <RSVPCpntrolModal
              data={props.data.guests}
              eventemail={props.data.email}
            />
          </div>
        )}
        <div display={"flex"} flexDirection="column" justifyContent={"end"}>
          <EventExpandModal data={props.data} host={props.host} />
        </div>
      </div>
    </Box>
  );
};

// <Card
// width={'100%'}
// background={'transparent'}
// border={0}
// // direction={{ base: 'column', sm: 'row' }}
// // variant='outline'
// >
// <Box maxWidth="none" className="flex flex-row justify-evenly">

// <Box maxWidth="none" className="flex flex-row justify-evenly">

// </Box>
// {/* <Stack className="text-center"> */}
// <Box  className="flex flex-col justify-evenly">
// <CardBody>
// <Heading size='md'> {props.data.name}</Heading>

// <Text py='2'>
//   Caffè latte is a coffee beverage of Italian origin made with espresso
//   and steamed milk.
// </Text>
// </CardBody>

// <CardFooter>
// {/* <Button variant='solid' colorScheme='blue'>
//   Buy Latte
// </Button> */}
//   <div className=" flex flex-row  flex-wrap justify-between md:justify-around ">
//     {props.host ? (
//       <EventCancelModalConfirmationModal eventid={props.data.eventid} cancelled={props.data.cancelled} />
//     ) : (
//       <div display={"flex"} flexDirection="column" justifyContent={"end"}>
//       <EventRSVPCancelModalConfirmationModal eventid={props.data.eventid} cancelled={props.data.cancelled} />
//       </div>
//     )}
//     {props.host&& !props.data.cancelled && (
//       <div display={"flex"} flexDirection="column" justifyContent={"end"}>
//         <EventEditModal data={props.data} />{" "}
//       </div>
//     )}
//     {props.host && !props.data.cancelled &&  (
//       <div display={"flex"} flexDirection="column" justifyContent={"end"}>
//         <RSVPCpntrolModal
//           data={props.data.guests}
//           eventemail={props.data.email}
//         />
//       </div>
//     )}
//     <div display={"flex"} flexDirection="column" justifyContent={"end"}>
//       <EventExpandModal data={props.data} host={props.host} />
//     </div>
//   </div>
// </CardFooter>
// {/* </Stack> */}
// </Box>
// </Box>
// </Card>
