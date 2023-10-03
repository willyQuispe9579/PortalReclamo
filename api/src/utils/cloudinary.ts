import { v2 as cloudinary } from "cloudinary";
import config from "./config";

const cloud = cloudinary.config({
  cloud_name: config.cloudinary_name || "dzfg8xnxn",
  api_key: config.cloudinary_api_key || "734242724172826",
  api_secret: config.cloudinary_secret || "1_K4cx2TRHcbd3URjmuHJ_oJU-Y",
});

export default cloud;
