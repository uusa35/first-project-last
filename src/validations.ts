import * as yup from 'yup';


export const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
});

export const contactusSchema = yup.object().shape({
    name: yup.string().min(2).max(99).required(),
    email: yup.string().email().required(),
    phone: yup.string().min(2).max(460).required(),
    message: yup.string().min(10).max(999),
});