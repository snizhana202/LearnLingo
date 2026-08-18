import * as yup from "yup";

export const bookingSchema = yup.object({
  fullName: yup
    .string()
    .required("This field is required")
    .min(2, "Minimum 2 characters")
    .matches(
      /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
      "Name must contain only English letters",
    ),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("This field is required"),
  phone: yup
    .string()
    .required("This field is required")
    .matches(/^[+()\d\s-]{7,}$/, "Please enter a valid phone number"),
  reason: yup.string().required("This field is required"),
});

export const REASON_OPTIONS = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];
