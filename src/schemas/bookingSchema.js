import * as yup from 'yup';

export const bookingSchema = yup.object({
  fullName: yup.string().min(2, 'Minimum 2 characters').required('This field is required'),
  email: yup.string().email('Please enter a valid email address').required('This field is required'),
  phone: yup
    .string()
    .matches(/^[+()\d\s-]{7,}$/, 'Please enter a valid phone number')
    .required('This field is required'),
  reason: yup.string().required('This field is required'),
});

export const REASON_OPTIONS = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];