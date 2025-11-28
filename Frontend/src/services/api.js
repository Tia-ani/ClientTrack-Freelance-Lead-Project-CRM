import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.143.143:3000",   //your LAN IP
});

export default API;
