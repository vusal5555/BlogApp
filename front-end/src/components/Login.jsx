import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("User logged in");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mt-[-15rem]">
        <h1 className="mb-5 font-bold text-lg text-center">
          Log in your account
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <input
            type="email"
            className="border-2 border-black px-4 py-2 w-full md:w-[500px]"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border-2 border-black px-4 py-2 w-full md:w-[500px]"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded-md text-md"
          >
            Submit
          </button>
          <p className="text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
