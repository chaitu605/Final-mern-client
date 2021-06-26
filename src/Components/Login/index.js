import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { loginUser } from "../../apis/loginUser";
import { setUserData } from "../../actions/setUserData";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Login() {
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
    console.log(username, password);
    try {
      const data = await loginUser(username, password);
      console.log(data);
      if (data.status === 200) {
        addToast("Login Successfull", {
          appearance: "success",
          autoDismiss: true,
        });
        setUserData(dispatch, data);
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
    <section class="py-10 lg:py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-xl mx-auto">
          <div class="mb-6 lg:mb-10 p-6 lg:p-12 bg-white shadow rounded">
            <h1 class="px-4 py-4 text-2xl"> Welcome </h1>
            <div class="mb-6">
              <span class="text-gray-500">Sign In</span>
              <h3 class="text-2xl font-bold">Join our community</h3>
            </div>
            <form onSubmit={handleSubmit(submitData)}>
              <div class="mb-3 flex p-4 bg-gray-50 rounded">
                <input
                  name="username"
                  {...register("username", { required: true })}
                  onChangeCapture={handleInputChange}
                  class="w-full text-xs bg-gray-50 outline-none"
                  type="text"
                  placeholder="Enter Username"
                  autocomplete="off"
                />
                <p class="text-red-400 p-2">
                  {errors.username && "Username is required"}
                </p>
              </div>
              <div class="mb-6 flex p-4 bg-gray-50 rounded">
                <input
                  name="password"
                  {...register("password", { required: true })}
                  onChangeCapture={handleInputChange}
                  class="w-full text-xs bg-gray-50 outline-none"
                  type="password"
                  placeholder="Enter your password"
                  autocomplete="off"
                />
                <p class="text-red-400 p-2">
                  {errors.password && "Password is required"}
                </p>
              </div>
              <div class="text-center">
                <button class="mb-4 w-full py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50">
                  Sign In
                </button>
                <a class="text-xs text-green-600 hover:underline" href="/">
                  Forgot password?
                </a>
                <Link
                  class="mt-8 mb-4 p-4 flex justify-center items-center border rounded hover:bg-gray-50"
                  to="/register"
                >
                  <span class="text-xs text-gray-500 font-bold">
                    Click here to Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
