import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms of service"),
});
export const signinValidationSchema=Yup.object().shape({
    email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})