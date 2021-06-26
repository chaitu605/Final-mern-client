import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { registerUser } from "../../apis/registerUser";

export default function Register() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const roles = ["user", "user"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

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
    if (name === "email") {
      setEmail(target.value);
    }
  };

  const submitData = async () => {
    console.log(username, email, password, roles);
    try {
      const data = await registerUser(username, email, password, roles);
      console.log(data);
      if (data.status === 200) {
        addToast("Saved Successfully", {
          appearance: "success",
          autoDismiss: true,
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
    <section>
      <div class="flex flex-wrap">
        <div class="pt-20 lg:pt-20 pb-6 w-full ">
          <div class="max-w-md mx-auto">
            <div>
              <div class="mb-6 px-3">
                <span class="text-gray-500">Sign Up</span>
                <h3 class="text-2xl font-bold">Create an account</h3>
              </div>
              <form onSubmit={handleSubmit(submitData)}>
                <div class="mb-3 flex p-4 mx-2 bg-gray-50 rounded">
                  <input
                    name="username"
                    {...register("username", { required: true })}
                    onChangeCapture={handleInputChange}
                    class="w-full text-xs bg-gray-50 outline-none"
                    type="text"
                    placeholder="Enter Username"
                  />
                  <p class="text-red-400 p-2">
                    {errors.username && "Username is required"}
                  </p>
                </div>
                <div class="mb-3 flex p-4 mx-2 bg-gray-50 rounded">
                  <input
                    name="email"
                    {...register("email", { required: true })}
                    onChangeCapture={handleInputChange}
                    class="w-full text-xs bg-gray-50 outline-none"
                    type="email"
                    placeholder="name@email.com"
                  />
                  <p class="text-red-400 p-2">
                    {errors.email && "Email is required"}
                  </p>
                </div>
                <div class="mb-6 flex p-4 mx-2 bg-gray-50 rounded">
                  <input
                    name="password"
                    {...register("password", { required: true })}
                    onChangeCapture={handleInputChange}
                    class="w-full text-xs bg-gray-50 outline-none"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <p class="text-red-400 p-2">
                    {errors.password && "Password is required"}
                  </p>
                </div>
                <div class="px-3 text-center">
                  <button class="mb-2 w-full py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50 transition duration-200">
                    Sign Up
                  </button>
                  <span class="text-gray-400 text-xs">
                    <span>Already have an account?</span>
                    <Link class="text-green-600 hover:underline" to="/">
                      Sign In
                    </Link>
                  </span>
                  <p class="mt-16 text-xs text-gray-400">
                    <a class="underline hover:text-gray-500" href="/">
                      Policy privacy
                    </a>{" "}
                    and{" "}
                    <a class="underline hover:text-gray-500" href="/">
                      Terms of Use
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
