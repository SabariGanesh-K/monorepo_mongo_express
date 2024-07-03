import { useState, useEffect, useContext, createContext } from "react";
import { AxiosGet, AxiosPost } from "../lib/axios";
import { UserConfig } from "./UserConfig";

export const EventConfig = createContext();

export const EventProvider = ({ children }) => {
  const { session, user } = useContext(UserConfig);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [EventsHostingData, setEventsHostingData] = useState([]);
  const [EventsGuestData, setEventsGuestData] = useState([]);

  const getEvents = async () => {
    let eventsH = [];
    let eventsP = [];
    setEventsLoading(true);
    console.log(user);
    if (user.events_ids_p) {
      await user.events_ids_p.map(async (item) => {
        const data = await AxiosGet(`event/${item}`);
        console.log(data);
        eventsP.push(data);
      });
    }
    if (user.events_ids_h) {
      await user.events_ids_h.map(async (item) => {
        const data = await AxiosGet(`event/${item}`);
        console.log(data);
        eventsH.push(data);
      });
    }
    setEventsHostingData(eventsH);
    setEventsGuestData(eventsP);
    setEventsLoading(false);
  };

  useEffect(() => {
    let eventsH = [];
    let eventsP = [];

    const getEvents = async () => {
      setEventsLoading(true);
      console.log(user);
      if (user.events_ids_p) {
        await user.events_ids_p.map(async (item) => {
          const data = await AxiosGet(`event/${item}`);
          console.log(data);
          eventsP.push(data);
        });
      }
      if (user.events_ids_h) {
        await user.events_ids_h.map(async (item) => {
          const data = await AxiosGet(`event/${item}`);
          console.log(data);
          eventsH.push(data);
        });
      }
      setEventsHostingData(eventsH);
      setEventsGuestData(eventsP);
      setEventsLoading(false);
    };
    if (user) {
      getEvents();
    }
  }, [user, session]);

  const postEvent = async (values) => {
    setEventsLoading(true);

    const { data } = await AxiosPost(
      `event/add?id=${session.id}&token=${session.token}`,
      values
    );
    console.log(data);
    if (data.code === 400) {
      //   showErrorAlert({ title: data.msg });
      console.log("error log in");
    } else {
      // await getEvents();
      console.log([...EventsHostingData, values]);
      setEventsHostingData([...EventsHostingData, values]);
      console.log(EventsHostingData);
      console.log("added user");
      // setuserdata(user)
    }

    setEventsLoading(false);
  };

  const cancelEvent = async (values) => {
    try {
      const { data } = await AxiosPost(
        `event/cancel?id=${session.id}&token=${session.token}`,
        values
      );
      console.log(data);
      if (data.code != 201) {
        //   showErrorAlert({ title: data.msg });
        console.log("error log in");
      } else {
        // await getEvents();
        console.log("added user");
        // setuserdata(user)
      }
    } catch (err) {
      console.log("cancelk eevnt failed", err);
    }
  };
  const cancelRSVPEvent = async (values) => {
    try {
      const { data } = await AxiosPost(
        `event/cancelrsvp?id=${session.id}&token=${session.token}`,
        values
      );
      console.log(data);
      if (data.code != 201) {
        //   showErrorAlert({ title: data.msg });
        console.log("error log in");
      } else {
        // await getEvents();
        console.log("added user");
        // setuserdata(user)
      }
    } catch (err) {
      console.log("cancelk eevnt failed", err);
    }
  };
  const approveRequest = async (values) => {
    const { data } = await AxiosPost(
      `event/approve?id=${session.id}&token=${session.token}`,
      values
    );
    console.log(data);
    if (data.code != 201) {
      //   showErrorAlert({ title: data.msg });
      console.log("error log in");
    } else {
      await getEvents();
      console.log("added user");
      // setuserdata(user)
    }
  };
  const declineRequest = async (values) => {
    console.log(values);
    const { data } = await AxiosPost(
      `event/decline?id=${session.id}&token=${session.token}`,
      values
    );
    console.log(data);
    if (data.code === 400) {
      //   showErrorAlert({ title: data.msg });
      console.log("error log in");
    } else {
      await getEvents();
      console.log("added user");
      // setuserdata(user)
    }
  };

  const editEvent = async (values) => {
    console.log(values);
    const { data } = await AxiosPost(
      `event/update?id=${session.id}&token=${session.token}`,
      values
    );
    console.log(data);
    if (data.code === 400) {
      //   showErrorAlert({ title: data.msg });
      console.log("error log in");
    } else {
      await getEvents();
      console.log("added user");
      // setuserdata(user)
    }
  };

  return (
    <EventConfig.Provider
      value={{
        postEvent,
        eventsLoading,
        EventsGuestData,
        EventsHostingData,
        declineRequest,
        approveRequest,
        editEvent,
        cancelEvent,
        cancelRSVPEvent
      }}
    >
      {children}
    </EventConfig.Provider>
  );
};
