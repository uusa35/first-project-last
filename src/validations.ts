import { filter, find, first, flatten, isEqual, map } from "lodash";
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

export const addToCartSchema = (groups: any, trans: any) => {
  const groupShape: any = map(groups, g =>
    g.selection_type === 'mandatory' || g.selection_type === 'required' ?
      yup.object().shape({
        choice_group_id: yup.number().oneOf([g.id]).required(trans['required']),
        choices: yup.array().of(yup.object().shape({
          choice_id: yup.number().oneOf(map(g.choices, 'id')).required(),
          quantity: yup.number().min(g.min_value).max(g.max_value)
        }))
      })
      :
      yup.object().shape({
        choice_group_id: yup.number().oneOf([g.id]),
        choices: yup.array().of(yup.object().shape({
          choice_id: yup.number().oneOf(map(g.choices, 'id')).required(),
          quantity: yup.number().min(g.min_value).max(g.max_value)
        }))
      })

    // yup.object().shape({
    //   choice_group_id: yup.lazy((values) => {
    //     if (g.selection_type === 'mandatory' || g.selection_type === 'required') {
    //       console.log('case 1111111111', g.id)
    //       return yup.number().oneOf([g.id]).required(trans['required'])
    //     } else {
    //       console.log('case 222222222', g.id)
    //       return yup.number().oneOf([g.id]).optional()
    //     }
    //   }),
    //   choices: yup.array().of(yup.object().shape({
    //     choice_id: yup.number().oneOf(map(g.choices, 'id')).required(),
    //     quantity: yup.number().min(g.min_value).max(g.max_value)
    //   }))
    // })
  );
  const originalAllChoices = map(
    flatten(
      map(filter(groups, "choices"), "choices")
    ),
    "id"
  );
  const originalRequiredChoices = map(
    flatten(
      map(filter(filter(groups, g => g.selection_type !== 'optional'), "choices"), "choices")
    ),
    "id"
  )
  const originalRequiredGroups = map(
    flatten(
      filter(groups, g => g.selection_type !== 'optional')
    ),
    "id"
  );

  console.log('originalAllChoices', originalAllChoices);
  console.log('required gorups', originalRequiredGroups)
  return yup.lazy((values) => {
    console.log('values', values);
    const currentRequiredChoices = map(
      flatten(
        map(filter(filter(values.groups, g => g.selection_type !== 'optional'), "choices"), "choices")
      ),
      "id"
    )
    return yup.object().shape({
      vendor_id: yup.number().required(trans['required']),
      offer_id: yup.number().required(trans['required']),
      quantity: yup.number().required(trans['required']),
      groups: yup.array().of(yup.object().shape({
        choice_group_id: yup.number(),
        choices: yup.array().of(yup.object().shape({
          // choice_id: yup.string().when('choice_group_id', {}),
          quantity: yup.number(),
          choice_id: yup.number().when('choice_group_id', {
            is: isEqual(originalRequiredChoices, currentRequiredChoices),
            then: (schema: any) => schema.required(trans['required']),
            otherwise: (schema: any) => schema.optional(),
          }),
        })),

      }))
    });
  }
  )
};
// add to cart
// "groups": [
//   {
//     "choice_group_id": 54,
//     "choices": [
//       {
//         "choice_id": 117,
//         "quantity": 1
//       },
//       {
//         "choice_id": 116,
//         "quantity": 1
//       }
//     ]
//   }
// ]

// "groups": [
//   {
//     "id": 33,
//     "name": "Jensen Reichel DVM",
//     "min_number": 1,
//     "max_number": 2,
//     "selection_type": "mandatory",
//     "input_type": "meter",
//     "choices": [
//       {
//         "id": 69,
//         "name": "Rowland Cassin",
//         "price": 5,
//         "currency": "EGP",
//         "status": 1
//       },

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
