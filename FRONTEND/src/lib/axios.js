import axios from "axios";
// import { Url } from "../constants/Url";

const Axios = axios.create({
  baseURL:"http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosGet = async (url) => {
  console.log( process.env.NEXT_PUBLIC_MONGO_URI+"/"+url )

  const { data } = await Axios.get(url);
  return data;
};

export const AxiosPost = async (url, objects) => {
  console.log("entering")
  console.log( process.env.NEXT_PUBLIC_MONGO_URI+"/"+url , "with",objects)
  const response = await Axios.post(url, objects);
  console.log("Recieved",response);
  return response;
};
