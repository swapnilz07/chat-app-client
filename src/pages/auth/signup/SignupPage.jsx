/* eslint-disable react/prop-types */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validationSchemaForSignup } from "../../../config/formConfig.js";
import { signupUser } from "../../../api/authAPI.js";
import TextError from "../../../components/common/TextError.jsx";

function SignupPage() {
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
      toast.success("User registered successfully.");
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
      toast.error(error?.message || "Something went wrong.");
    },
  });

  return (
    <div className="h-screen w-full flex justify-center items-center px-3">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h2 className="md:text-3xl text-lg font-bold text-[#CCD0CF] py-6">
          Signup
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchemaForSignup}
          onSubmit={(values, actions) => {
            console.log("values", values);
            mutate(values);
            actions.resetForm({
              name: "",
              email: "",
              password: "",
            });
          }}
        >
          {({ touched, errors }) => (
            <Form className="space-y-6 w-full max-w-md">
              {/* Name Field */}
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="grow"
                  />
                </label>
                {touched?.name && errors?.name && (
                  <ErrorMessage name="name" component={TextError} />
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="grow"
                  />
                </label>
                {touched?.email && errors?.email && (
                  <ErrorMessage name="email" component={TextError} />
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="grow"
                  />
                </label>
                {touched?.password && errors?.password && (
                  <ErrorMessage name="password" component={TextError} />
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#4A5C6A] text-white rounded-md hover:bg-[#253745]"
                >
                  {isPending ? "Loading..." : "Signup"}
                </button>
              </div>
              {isError && (
                <p className="text-red-600 text-sm mt-2">{error?.message}</p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignupPage;
