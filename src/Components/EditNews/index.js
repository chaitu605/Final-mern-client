import React from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditNews() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const [editNews, setEditNews] = useState({
    title: "",
    news: "",
    author: "",
    published: "",
    loading: false,
  });

  useEffect(() => {
    const getNewsById = async () => {
      await axios
        .get(`https://final-server-mern.herokuapp.com/api/news/${id}`)
        .then((res) => {
          console.log(res.data);
          setEditNews({
            title: res.data.title,
            news: res.data.news,
            published: res.data.published,
            author: res.data.author,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getNewsById();
  }, [id]);

  const onHandleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEditNews({ ...editNews, [name]: value });
    console.log(setEditNews);
  };

  const onSubmit = () => {
    setEditNews({ loading: true });
    const title = editNews.title;
    const news = editNews.news;
    const author = editNews.author;
    const published = editNews.published;

    const updateNews = async () => {
      await axios
        .put(`https://final-server-mern.herokuapp.com/api/news/${id}`, {
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
    updateNews();
    setTimeout(() => {
      history.push({
        pathname: "/dashboard",
      });
    }, 2000);
  };

  const button =
    editNews.loading === true ? (
      <button className="py-2 px-4 mx-40 border border-transparent text-sm font-medium rounded-md text-white bg-green-800">
        Updating
      </button>
    ) : (
      <button
        onClick={handleSubmit(onSubmit)}
        className="py-2 px-4 mx-40 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Update
      </button>
    );

  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center bg-gray-300 justify-center py-12 px-6 sm:px-6 lg:px-8">
        <form className="bg-green-200 shadow-md rounded px-10 pt-8 pb-10 mb-5">
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              name="title"
              {...register("title", { required: true })}
              onChangeCapture={onHandleInputChange}
              className="shadow appearance-none border text-xs rounded w-full py-2 px-3 mr-12  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={editNews.title}
              placeholder="Add Title"
            />
            <p className="text-red-400 p-2">
              {errors.title && "Title is required"}
            </p>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="news"
            >
              News
            </label>
            <textarea
              name="news"
              {...register("news", { required: true })}
              onChangeCapture={onHandleInputChange}
              className="shadow appearance-none border rounded text-xs w-full py-2 px-3 mr-12 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="news"
              type="text"
              value={editNews.news}
              placeholder="Add News"
            />
            <p className="text-red-400 p-2">
              {errors.news && "News is required"}
            </p>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="news"
            >
              Published
            </label>
            <input
              name="published"
              {...register("published", { required: true })}
              onChangeCapture={onHandleInputChange}
              className="shadow appearance-none border rounded text-xs w-full py-2 px-3 mr-12 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="published"
              type="text"
              value={editNews.published}
              placeholder="Add date"
            />
            <p className="text-red-400 p-2">
              {errors.published && "Date is required"}
            </p>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="news"
            >
              Author
            </label>
            <input
              name="author"
              {...register("author", { required: true })}
              onChangeCapture={onHandleInputChange}
              className="shadow appearance-none border rounded w-full text-xs py-2 px-3 mr-12 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="author"
              type="text"
              value={editNews.author}
              placeholder="Add author name"
            />
            <p className="text-red-400 p-2">
              {errors.author && "Authorname is required"}
            </p>
          </div>
          <div className="flex items-center justify-center">{button}</div>
        </form>
      </div>
    </React.Fragment>
  );
}
