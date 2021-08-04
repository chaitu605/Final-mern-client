import React from "react";
import { CreateNews } from "../../apis/addNews";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddNews() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

    setAddNews({ ...addNews, [name]: value });
    console.log(setAddNews);
  };

  const onSubmit = () => {
    setAddNews({ loading: true });
    const title = addNews.title;
    const news = addNews.news;
    const author = addNews.author;
    const published = addNews.published;

    const PublishNews = async () => {
      await CreateNews(title, news, published, author);
    };
    PublishNews();
    setTimeout(() => {
      history.push({
        pathname: "/dashboard",
      });
    }, 2000);
  };

  const button =
    addNews.loading === true ? (
      <button className="shadow bg-rose-900 focus:shadow-outline focus:outline-none text-white font-bold py-5 px-10 mx-40 my-5 rounded"></button>
    ) : (
      <button
        onClick={handleSubmit(onSubmit)}
        className="flex justify-center py-2 px-4 mx-40 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Publish
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
