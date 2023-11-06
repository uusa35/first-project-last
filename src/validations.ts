import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

export const searchSchema = yup.object({
  search: yup.string().min(3).required(),
});

export const registerSchema = yup.object({
  name: yup.string().min(2).max(99).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  password_confirmation: yup
    .string()
    .min(8)
    .max(20)
    .required()
    .oneOf([yup.ref("password")]),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email().required(),
});

export const updateUserSchema = yup.object({
  email: yup.string().email().required(),
  country_id: yup.string().required(),
  username: yup.string().required(),
  phone: yup.string().min(10).max(12).required(),
  role: yup.string().required().oneOf(["company", "visitor"]),
  name: yup
    .object({
      ar: yup.string().required(),
      en: yup.string().required(),
      ru: yup.string().required(),
    })
    .required(),
  caption: yup.object({
    ar: yup.string().required(),
    en: yup.string().required(),
    ru: yup.string().required(),
  }),
  categories: yup.array(),
  address: yup.string().required(),
  keywords: yup.string().nullable(),
});

export const contactusSchema = yup.object().shape({
  name: yup.string().min(2).max(99).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(2).max(460).required(),
  content: yup.string().required().max(9999),
});
