import React from "react";
import axios from "axios";

import { useState, useHistory } from "react";

export default function AddNews() {
  const history = useHistory();
  const [addNews, setAddNews] = useState({
    title: "",
    news: "",
    author: "",
    published: "",
    loading: false,
  });

  const onHandleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddNews({
      [name]: value,
    });
    console.log(setAddNews);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAddNews({ loading: true });
    const title = addNews.title;
    const news = addNews.news;
    const author = addNews.author;
    const published = addNews.published;

    const CreateNews = async () => {
      await axios
        .post(`http://localhost:5000/api/news`, {
          title,
          news,
          published,
          author,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CreateNews();
    setTimeout(() => {
      history.push({
        pathname: "/dashboard",
      });
    }, 2000);
  };

  const button =
    addNews.loading === true ? (
      <button class="spinner p-4"></button>
    ) : (
      <button
        onClick={onSubmit}
        class="shadow bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-5 px-10 mx-40 my-5 rounded"
      >
        Publish
      </button>
    );

  return (
    <React.Fragment>
      <div class="container mx-auto m-4 p-4 bg-white">
        <form class="w-full max-w-lg mx-auto">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-2">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Enter News Title
              </label>
              <input
                name="title"
                onChange={onHandleInputChange}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="Enter News Title"
              />
            </div>
            <div class="w-full px-2">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Enter News
              </label>
              <textarea
                name="news"
                onChange={onHandleInputChange}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="Enter News Title"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Author
              </label>
              <input
                name="author"
                onChange={onHandleInputChange}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Enter Author Name"
              />
            </div>
            <div class="w-full md:w-1/2 px-2 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Published on
              </label>
              <input
                name="published"
                onChange={onHandleInputChange}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder="Enter Date"
              />
            </div>
          </div>
          {button}
        </form>
      </div>
    </React.Fragment>
  );
}
