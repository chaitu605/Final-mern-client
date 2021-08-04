import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { loginUser } from "../../apis/loginUser";
import { setUserData } from "../../actions/setUserData";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    console.log(target.value);
    if (name === "username") {
      setUsername(target.value);
    }
    if (name === "password") {
      setPassword(target.value);
    }
  };

  const submitData = async () => {
    setLoading(true);
    console.log(username, password);
    try {
      const data = await loginUser(username, password);
      console.log(data);
      if (data.status === 200) {
        addToast("Login Successfull", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
        setUserData(dispatch, data);
        sessionStorage.setItem("user_info", data.data.username);
        console.log(data.data);
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
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  const button = loading ? (
    <button
      type="submit"
      className="animate-wiggle mb-4 w-full py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50"
    >
      Processing...
    </button>
  ) : (
    <button
      type="submit"
      className="mb-4 w-full py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50"
    >
      Sign In
    </button>
  );

  return (
    <div className="lg:py-20 bg-gray-300">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="mb-6 lg:mb-10 p-6 lg:p-12 bg-white shadow rounded">
            <h1 className="px-4 py-4 font-bold text-2xl text-center">
              {" "}
              Welcome{" "}
            </h1>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-center">Sign In</h3>
              <h3 className="text-2xl text-center font-bold">
                Join our community
              </h3>
            </div>
            <form onSubmit={handleSubmit(submitData)}>
              <div className="mb-3 flex p-4 bg-gray-50 rounded">
                <input
                  name="username"
                  {...register("username", { required: true })}
                  onChangeCapture={handleInputChange}
                  className="w-full text-xs bg-gray-50 outline-none"
                  type="text"
                  placeholder="Enter Username"
                  autocomplete="off"
                />
                <p className="text-red-400 p-2">
                  {errors.username && "Username is required"}
                </p>
              </div>
              <div className="mb-6 flex p-4 bg-gray-50 rounded">
                <input
                  name="password"
                  {...register("password", { required: true })}
                  onChangeCapture={handleInputChange}
                  className="w-full text-xs bg-gray-50 outline-none"
                  type="password"
                  placeholder="Enter your password"
                  autocomplete="off"
                />
                <p className="text-red-400 p-2">
                  {errors.password && "Password is required"}
                </p>
              </div>
              <div className="text-center">
                {button}
                <a className="text-xs text-green-600 hover:underline" href="/">
                  Forgot password?
                </a>
                <Link
                  className="mt-8 mb-4 p-4 flex justify-center items-center border rounded bg-green-600 hover:bg-green-700"
                  to="/register"
                >
                  <span className="text-sm font-bold text-gray-50">
                    Click here to Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
