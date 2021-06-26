import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNews } from "../../apis/getNews";
import { deleteNews } from "../../apis/deleteNews";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";

export default function DisplayNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getNews();
      console.log(data);
      setNews(data);
    };
    getData();
  }, []);

  const { addToast } = useToasts();
  const history = useHistory();
  const Delete = async (e) => {
    try {
      const data = await deleteNews(e);
      console.log(data);
      if (data.status === 200) {
        addToast("Deleted Successfully", {
          appearance: "success",
          autoDismiss: true,
        });

        history.push({
          pathname: "/dashboard",
        });
      }
    } catch (e) {
      console.log(e);
      addToast("Something went wrong", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div class=" pt-6 pb-12 mx-auto p-16 bg-gray-800 ">
      <h2 class="text-center text-gray-100 font-serif  uppercase text-4xl xl:text-5xl">
        Recent Articles
      </h2>
      {news != null && news.length ? (
        news.map((item, index) => (
          <div class="max-w-5xl px-10 my-10 mx-40 py-6 bg-white rounded-lg shadow-md">
            <div class="flex justify-between items-center">
              <span class="font-light text-gray-600">{item.published}</span>
              <div class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
                <Link to={`/dashboard/edit/${item.id}`}>Edit</Link>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-2xl text-gray-700 font-bold hover:text-gray-600">
                {item.title}
              </p>
              <p class="mt-2 text-gray-600">{item.news}</p>
            </div>
            <div class="flex justify-between items-center mt-4">
              <button
                id={item.id}
                onClick={Delete}
                class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
              >
                Delete
              </button>
              <div class="flex items-center">
                <img
                  class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                  src="https://cdn2.vectorstock.com/i/1000x1000/38/21/male-face-avatar-logo-template-pictograph-vector-11333821.jpg"
                  alt="avatar"
                />
                <h1 class="text-gray-700 font-bold">{item.author}</h1>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 class="text-left text-gray-100 font-serif  uppercase text-4xl xl:text-5xl">
          Loading...{" "}
        </h2>
      )}
    </div>
  );
}
