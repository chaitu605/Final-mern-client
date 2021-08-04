import axios from "axios";
import { apis } from "../constant";

let data = null;
export const CreateNews = async (title, news, published, author) => {
  await axios
    .post(`${apis.add}`, {
      title,
      news,
      published,
      author,
    })
    .then((res) => {
      console.log(res);
      data = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
