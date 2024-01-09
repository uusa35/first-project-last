import { filter, find, first, flatten, isEmpty, isEqual, map } from "lodash";
import * as yup from "yup";

export const loginSchema = yup.object({
  phone: yup.string().min(6).max(20).required("validation.required"),
  phone_country_code: yup.string().required("validation.required"),
  password: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required"),
});

export const verificySchema = yup.object({
  // phone: yup.string().min(6).max(20).required(),
  // phone_country_code: yup.string().required("validation.required"),
  code: yup.string().min(6).max(12).required("validation.required"),
  // type: yup.string().required("validation.required"),
});

export const searchSchema = yup.object({
  search: yup.string().min(3).required(),
});

export const registerSchema = yup.object({
  phone: yup
    .string()
    .min(6, "validation.max")
    .max(20, "validation.max")
    .required("validation.required"),
  phone_country_code: yup
    .string()
    .min(2, "validation.max")
    .required("validation.required"),
  email: yup.string().email(),
  password: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required"),
  password_confirmation: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required")
    .oneOf([yup.ref("password")], "validation.password_confirmation"),
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
  website: yup.string().url().nullable(),
  twitter: yup.string().url().nullable(),
  facebook: yup.string().url().nullable(),
  instagram: yup.string().url().nullable(),
  snap: yup.string().url().nullable(),
  tiktok: yup.string().url().nullable(),
  linked: yup.string().url().nullable(),
  iphone: yup.string().url().nullable(),
  android: yup.string().url().nullable(),
});

export const contactusSchema = yup.object().shape({
  first_name: yup.string().min(2).max(99).required(),
  last_name: yup.string().min(2).max(99).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(6).max(460).required(),
  message: yup.string().required().max(9999),
});

export const addToCartSchema = (originalGroups: any, trans: any) => {
  const originalAllChoices = map(
    flatten(
      map(filter(originalGroups, "choices"), "choices")
    ),
    "id"
  );
  const originalRequiredChoices = map(
    flatten(
      map(filter(filter(originalGroups, g => g.selection_type !== 'optional'), "choices"), "choices")
    ),
    "id"
  )
  const originalRequiredGroups = map(
    flatten(
      filter(originalGroups, g => g.selection_type !== 'optional')
    ),
    "id"
  );
  const allOrginalGroups = map(
    flatten(originalGroups),
    "id"
  );
  // console.log('all original groups', allOrginalGroups);
  // console.log('originalAllChoices', originalAllChoices);
  // console.log('required gorups', originalRequiredGroups)
  return yup.lazy((values) => {
    // console.log('values', values);
    const currentRequiredChoices = map(
      flatten(
        map(filter(filter(values.groups, g => g.selection_type !== 'optional'), "choices"), "choices")
      ),
      "id"
    )
    const currentRequiredGroups = map(
      flatten(
        map(filter(values.groups, g => g.selection_type !== 'optional'))
      ),
      "id"
    )
    // console.log('currentRequiredGroups', currentRequiredGroups);
    // console.log('currentRequiredChoices', currentRequiredChoices)
    // console.log('isEqual=====>', isEqual(originalRequiredChoices, currentRequiredChoices))
    return yup.object().shape({
      vendor_id: yup.number().required(trans['required']),
      offer_id: yup.number().required(trans['required']),
      quantity: yup.number().required(trans['required']),
      groups: yup.array().of(yup.object().shape({
        choice_group_id: yup.number().oneOf(allOrginalGroups),
        choices: yup.array().of(yup.object().shape({
          quantity: yup.number(),
          choice_id: yup.number(),
        })).when('choice_group_id', (choice_group_id, schema) => {
          const currentGroupId = first(filter(allOrginalGroups, g => g === choice_group_id[0]));
          const currentGroup = first(filter(originalGroups, g => g.id === currentGroupId));
          return currentGroupId ? schema.min(currentGroup.min_number, trans['min']).max(currentGroup.max_number, trans['max']) : schema;
        }).when('choice_group_id', (choice_group_id, schema) => {
          return find(originalRequiredGroups, choice_group_id[0]) ? schema.required(trans['required']) : schema;
        })
      })).when([], (_, schema) => {
        return originalRequiredGroups.length > 0 ? schema.required(trans['required']) : schema;
      })
    });
  }
  )
};

export const ChangePasswordSchema = yup.object({
  phone: yup
    .string()
    .min(6, "validation.max")
    .max(20, "validation.max")
    .required("validation.required"),
  phone_country_code: yup
    .string()
    .min(2, "validation.max")
    .required("validation.required"),
  new_password: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required"),
  new_password_confirmation: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required")
    .oneOf([yup.ref("new_password")], "validation.password_confirmation")
});
