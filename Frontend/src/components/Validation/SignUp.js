import * as Yup from 'yup';

const SignupvalidationSchema = Yup.object().shape({
    role: Yup.string().required('Role is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export default SignupvalidationSchema;
