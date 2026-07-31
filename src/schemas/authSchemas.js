import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required("This field is required"),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .required("This field is required"),
});

export const registerSchema = yup.object({
  name: yup.string().min(2, 'Min 2 characters').required("This field is required"),
  email: yup.string().email('Please enter a valid email address').required("This field is required"),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .required("This field is required"),
});