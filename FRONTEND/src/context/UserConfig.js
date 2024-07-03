import { useState, useEffect, useContext, createContext } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { AxiosGet, AxiosPost } from "../lib/axios";

export const UserConfig = createContext();

export const UserProvider = ({ children }) => {
  const [currentusermail, setcurrentusermail] = useState("");
  const [user, setuserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageloading, setPageloading] = useState(true);
  const [session, setSessionDetails] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [Signuperror, setSignuperror] = useState(false);
  const [cookieExpired, setCookieExpired] = useState(false);
  // const [loggedIn, setLoggedIn] = useState();

  // const [loginerror, setLoginerror] = useState(false);
  const [loginInfo,setloginInfo] = useState({
    loginerror:false,
    loggedIn:false
  })
  const [signupsuccess, setSignupsuccess] = useState(false);
  // useEffect(()=>{

  // },[])

  useEffect(() => {
    setTimeout(() => setIsPageLoading(false), 2000);
    const getAndSetData = async () => {
      const session = localStorage.getItem("login-session");
      setSessionDetails(session ? JSON.parse(session) : "");

      if (session) {
        setuserdata(JSON.parse(session).data);
        setcurrentusermail(JSON.parse(session).data.email);
        console.log(JSON.parse(session));
        try {
          const data = await AxiosGet(
            `user/get/${JSON.parse(session).data.username}?id=${
              JSON.parse(session).id
            }&token=${JSON.parse(session).token}`
          );
          // setLoggedIn(true)
          setloginInfo({loggedIn:true,loginerror:false})
          console.log(data);
          setuserdata(data);
          console.log(JSON.parse(session).data.email, "Session");
        } catch (err) {
          console.log(err.response.data.code === 1209);
          setuserdata([]);
          if (err.response.data.code === 1209) {
            setCookieExpired(true);
          setloginInfo({loggedIn:false,loginerror:false})
            
            localStorage.setItem("login-session", "");
            setSessionDetails("");
          }
        }
      }
    };
    getAndSetData();
  }, []);
  const logout = async () => {
    setuserdata();
    // setLoggedIn(false)
    setloginInfo({loggedIn:false,loginerror:false})

    localStorage.removeItem("login-session");
  };

  const login = async (values) => {
    console.log(values, "recievd in context");
    console.log(values, "recievd in context");

    try {
      console.log(values, "recievd in context");

      const data = await AxiosPost("user/login", values);
      // k.sabarii.ganesh@gmail.com
      console.log(
        data.data.code,
        data.data.code == 201,
        data.data.code == 400,
        "tt"
      );
      if (data && data.data.code == 201) {
        console.log("jhh", data);
        const user = {
          id: data.data.data._id,
          data: data.data.data,
          token: data.data.token,
        };
        const userdatafeteched = await AxiosGet(
          `user/get/${data.data.data.username}?id=${user.id}&token=${user.token}`
        );

        setuserdata(userdatafeteched);

        const userData = JSON.stringify(user);
        localStorage.setItem("login-session", userData);
        setSessionDetails(userdatafeteched);

        console.log("recieved user", userdatafeteched);
        // setuserdata(user)
        // setLoginerror(false);
        // setLoggedIn(true)
        setloginInfo({loggedIn:true,loginerror:false})

        return true;
      } else {

        console.log("wait");
      }
    } catch (err) {
      setuserdata([]);
unstable_batchedUpdates(()=>{
// setLoginerror(true);

//   setLoggedIn(false)
setloginInfo({loggedIn:false,loginerror:true})

console.log(err)
})
      console.log("error in login", loggedIn,err);
      return false;
    }
  };

  const signup = async (values) => {
    try {
      const signupdata = await AxiosPost("user/signup/", values);
      // sab@g.co
      //   {
      //     "user_id": 1,
      //     "username": "sabarik2333",
      //     "email": "k.sabarii.ganesh2.0@gmail.com",
      //     "password_hash": "$2b$10$jT3Mo1zzoa2.xjdWL0t8BO81r4.DnGmtCOaFpMwTA559d0gzemtfe",
      //     "name": "Sabari Ganesh K",
      //     "apikey": "$2b$10$f6bGmcLtxGa1Wupa.D7HqOczF5VSC0RIh8qC0rw3A6Dnupin8ffOO",
      //     "updatedAt": "2023-11-09T17:35:36.335Z",
      //     "createdAt": "2023-11-09T17:35:36.335Z"
      // }
      if (signupdata.status == 201) {
        const user = {
          id: signupdata.data._id,
          data: signupdata.data,
          token: signupdata.token,
        };
        const userdatafeteched = await AxiosGet(
          `user/get/${values.username}?id=${user.id}&token=${user.token}`
        );

        setuserdata(userdatafeteched);

        const userData = JSON.stringify(user);
        localStorage.setItem("login-session", userData);

        setSignupsuccess(true);

        setLoading(false);
        return true;
      }
    } catch (err) {
      console.log(err);
      // alert(err.message);
      setSignuperror(true);
      console.log("yess");
      return false;
    }
  };

  const deleteEventFromUser = async (values) => {
    try {
      const { data } = await AxiosPost(
        `user/deletehostedevent?id=${session.id}&token=${session.token}`,
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
      console.error(err);
      alert(err.message);
      setSignuperror(true);
      console.log("yess");
    }
  };
  useEffect(() => {
    //check cookies

    const session = localStorage.getItem("login-session");
    // console.log("cookie data",JSON.parse(session));

    if (session) {
      async () => {
        console.log("cookie data", JSON.parse(session));

        const userdatafeteched = await AxiosGet(
          `user/get/${JSON.parse(session).data.username}?id=${
            session.id
          }&token=${session.token}`
        );
        console.log(userdatafeteched.data);
        setuserdata(userdatafeteched.data);
      };
    } else {
      setuserdata();
    }
    // setuserdata(session ? JSON.parse(session) : "");

    setPageloading(false);
    //setuser
    //setloading
  }, []);

  return (
    <UserConfig.Provider
      value={{
        currentusermail,
        logout,
        signupsuccess,
        Signuperror,
        login,
        signup,
        user,
        session,
        loginInfo,
        // setLoggedIn,
        deleteEventFromUser,
      }}
    >
      {children}
    </UserConfig.Provider>
  );
};
