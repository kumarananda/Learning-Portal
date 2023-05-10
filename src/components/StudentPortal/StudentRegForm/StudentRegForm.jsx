/** @format */

import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import Error, { Loading } from "../../ui/InfoMsg/Error";

const StudentRegForm = () => {
  const navigate = useNavigate();

  //register req
  const [register, { isLoading, isError, isSuccess, error, data }] = useRegisterMutation();

  // Password alert
  const [passAlert, setPassAlert] = useState(false);
  // Form data state // Registration
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // Handle form data //Registration
  const handleFormData = e => {
    setPassAlert(false);
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //Handle form submit / Registration
  const HandleRegSubmit = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setPassAlert(true);
    } else {
      setPassAlert(false);
      register({ name, email, password, role: "student" });
      // .then(res => {
      //   console.log(res?.data);
      //   if (res?.data) {
      //     navigate("/course-player");
      //   }
      // });
    }
  };
  // try navigate 2
  useEffect(() => {
    if (data) {
      navigate("/course-player");
    }
  }, [data]);

  return (
    <>
      <form onSubmit={HandleRegSubmit} className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              onChange={handleFormData}
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              className="login-input rounded-t-md"
              placeholder="Student Name"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              onChange={handleFormData}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="login-input "
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              onChange={handleFormData}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="login-input"
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <input
              onChange={handleFormData}
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="confirm-password"
              required
              className="login-input rounded-b-md"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link to="/" className="font-medium text-violet-600 hover:text-violet-500">
              Have an account? Login
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Create Account
          </button>
        </div>
        <div className="formInfoMsg">
          {isError && <Error message={error?.error ? "Server Error!" : error.data} />}
          {passAlert && <Error message={"Password not match!"} />}
          {isLoading && <Loading message={"Updation..."} />}
        </div>
      </form>
    </>
  );
};

export default StudentRegForm;
