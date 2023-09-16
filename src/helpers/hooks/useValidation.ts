import * as yup from 'yup';

export const signinValidation = yup.object({
  email: yup.string().email('Invalid email').required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

export const signupValidation = yup.object({
  name: yup.string().required('Name is required.'),
  email: yup.string().email('Invalid email').required('Email is required.'),
  password: yup.string().required('Password is required.'),
  repassword: yup.string().required('Re-enter password is required.').oneOf([yup.ref('password')], 'Password not matched.')
});
