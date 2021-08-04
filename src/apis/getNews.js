import axios from "axios";
import { apis } from "../constant";
let data = null;
export const getNews = async () => {
  await axios
    .get(`${apis.get}`)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
