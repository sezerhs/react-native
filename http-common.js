import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "http://192.168.90.103:8080/api", 
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Referrer-Policy': '*'
  }
});
