import * as Yup from "yup";

export const validationSchemaForSignup = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters.") // Updated this to match the correct minimum length
    .max(50, "Name cannot be more than 50 characters.")
    .required("Name is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

export const validationSchemaForLogin = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});
