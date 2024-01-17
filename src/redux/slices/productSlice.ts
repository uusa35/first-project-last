import { Product } from '@/src/types/queries';
import { createSlice, isAnyOf, PayloadAction, current } from '@reduxjs/toolkit';
import { filter, find, first, flatten, isEmpty, isUndefined, map, split, sum, sumBy } from 'lodash';

interface Choice {
  choice_id: number | string;
  quantity: number | string;
  price: number;
  total?: number;
}

interface Selection {
  choice_group_id: number | string;
  choices: Choice[];
  multi?: boolean;
  required: boolean;
  min: number;
  max: number;

}
// {
//   "user_id": 11,
//     "confirm": true,
//       "offer_id": 73,
//         "quantity": 1,
//           "vendor_id": 11,
//             "notes": "hello",
//               "groups": [
//                 {
//                   "choice_group_id": 53,
//                   "choices": [

//                     {
//                       "choice_id": 116,
//                       "quantity": 1
//                     }
//                   ]
//                 }
//               ]

// }

type Props = {
  id: number | string | null;
  user_id: null | string | number;
  quantity: number;
  price: number;
  currency: string;
  total: number;
  enabled: boolean;
  originalGroups: [];
  selections: Selection[] | undefined;
  confirm: boolean;
  session_id: string | null;
};
const initialState: Props = {
  id: null,
  user_id: null,
  quantity: 1,
  currency: '',
  enabled: false,
  originalGroups: [],
  selections: undefined,
  confirm: false,
  session_id: null,
  total: 0,
  price: 0,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    showProductModal: (
      state: typeof initialState,
      action: PayloadAction<Product>
    ) => {
      const { id, vendor_id, new_price } = action.payload;
      const currency = split(action.payload.price.toString(), ' ')[1];
      const price = new_price ? parseFloat(split(new_price.toString(), ' ')[0]) : parseFloat(split(action.payload.price.toString(), ' ')[0]);
      return {
        ...state,
        id,
        offer_id: id,
        currency,
        vendor_id,
        price,
        enabled: true,
        selections: action.payload.id === state.id ? state.selections : initialState.selections,
      };
    },
    hideProductModal: (
      state: typeof initialState,
      action: PayloadAction<void | undefined>
    ) => {
      return {
        ...state,
        enabled: false,
      };
    },
    enableConfirm: (
      state: typeof initialState,
      action: PayloadAction<void | undefined>
    ) => {
      return {
        ...state,
        confirm: true,
      };
    },
    disableConfirm: (
      state: typeof initialState,
      action: PayloadAction<void | undefined>
    ) => {
      return {
        ...state,
        confirm: false,
      };
    },
    setSessionId: (
      state: typeof initialState,
      action: PayloadAction<string | null>
    ) => {
      return {
        ...state,
        session_id: action.payload,
      };
    },
    setProductOriginalGroups: (
      state: typeof initialState,
      action: PayloadAction<[]>
    ) => {
      return {
        ...state,
        originalGroups: action.payload
      };
    },
    addRadioChoice: (
      state: typeof initialState,
      action: PayloadAction<{ group_id: number | string, choice_id: number | string, qty: number, multi: boolean, required: boolean, min: number, max: number, price: number }>
    ) => {
      const { group_id, choice_id, qty, multi, required, min, max, price } = action.payload;
      const currentGroup = find(state.selections, (g) => g.choice_group_id === group_id);
      const filteredSelections = filter(state.selections, (g) => g.choice_group_id !== group_id);
      const currentSelections = isUndefined(state.selections) ? [{
        choice_group_id: group_id,
        choices: [{
          choice_id,
          quantity: qty,
          price,
          total: price * qty
        }],
        multi,
        required,
        min,
        max
      }] :
        [
          ...filteredSelections,
          {
            choice_group_id: group_id,
            multi,
            required,
            min,
            max,
            choices: currentGroup && multi ? (!find(currentGroup.choices, (c) => c.choice_id === choice_id) ? [...filter(currentGroup.choices, c => c.choice_id !== choice_id), {
              choice_id,
              quantity: qty > min && qty <= max ? qty : 1,
              price,
              total: price * (qty > min && qty <= max ? qty : 1)
            }] : [...filter(currentGroup.choices, c => c.choice_id !== choice_id)]) : [{
              choice_id,
              quantity: qty >= min && qty <= max ? qty : 1,
              price,
              total: price * (qty >= min && qty <= max ? qty : 1)
            }]
          }
        ];
      return {
        ...state,
        selections: filter(currentSelections, (s) => s.choices.length !== 0)
      };
    },
    removeRadioChoice: (
      state: typeof initialState,
      action: PayloadAction<{ group_id: number | string, choice_id: number | string, multi: boolean, required: boolean, min: number, max: number }>
    ) => {
      const { group_id, choice_id, multi, required, min, max } = action.payload;
      const currentGroup = first(filter(state.selections, (g) => g.choice_group_id === group_id));
      const currentSelections = currentGroup && currentGroup.multi ?
        [
          ...filter(state.selections, (g) => g.choice_group_id !== group_id),
          currentGroup && currentGroup.multi && {
            choice_group_id: group_id,
            choices: filter(currentGroup.choices, (c) => c.choice_id !== choice_id),
            multi,
            required,
            min,
            max,
          }
        ] : filter(state.selections, (g) => g.choice_group_id !== group_id);
      return {
        ...state,
        selections: currentSelections
      };
    },
    addCheckoutChoice: (
      state: typeof initialState,
      action: PayloadAction<{ group_id: number | string, choice_id: number | string, qty: number, multi: boolean, required: boolean, min: number, max: number, price: number }>
    ) => {
      const { group_id, choice_id, qty, multi, required, min, max, price } = action.payload;
      const currentGroup = find(state.selections, (g) => g.choice_group_id === group_id);
      const filteredSelections = filter(state.selections, (g) => g.choice_group_id !== group_id);
      const currentSelections = isUndefined(state.selections) ? [{
        choice_group_id: group_id,
        choices: [{
          choice_id,
          quantity: qty,
          price,
          total: qty * price
        }],
        multi,
        required,
        min,
        max
      }] :
        [
          ...filteredSelections,
          {
            choice_group_id: group_id,
            multi,
            required,
            min,
            max,
            choices: currentGroup && multi ? (!find(currentGroup.choices, (c) => c.choice_id === choice_id) ? [...filter(currentGroup.choices, c => c.choice_id !== choice_id), {
              choice_id,
              quantity: qty > min && qty <= max ? qty : 1,
              price,
              total: price * (qty > min && qty <= max ? qty : 1)
            }] : [...filter(currentGroup.choices, c => c.choice_id !== choice_id)]) : [{
              choice_id,
              quantity: qty >= min && qty <= max ? qty : 1,
              price,
              total: price * (qty >= min && qty <= max ? qty : 1)
            }]
          }
        ];
      return {
        ...state,
        selections: filter(currentSelections, (s) => s.choices.length !== 0)
      };
    },
    removeCheckoutChoice: (
      state: typeof initialState,
      action: PayloadAction<{ group_id: number | string, choice_id: number | string, multi: boolean, required: boolean, min: number, max: number }>
    ) => {
      const { group_id, choice_id, multi, required, min, max } = action.payload;
      const currentGroup = first(filter(state.selections, (g) => g.choice_group_id === group_id));
      const currentSelections = currentGroup && currentGroup.multi ?
        [
          ...filter(state.selections, (g) => g.choice_group_id !== group_id),
          currentGroup && currentGroup.multi && {
            choice_group_id: group_id,
            choices: filter(currentGroup.choices, (c) => c.choice_id !== choice_id),
            multi,
            required,
            min,
            max,
          }
        ] : filter(state.selections, (g) => g.choice_group_id !== group_id);
      return {
        ...state,
        selections: currentSelections
      };
    },
    increaseMeterChoice: (
      state: typeof initialState,
      action: PayloadAction<{ choice_group_id: number | string, choices: Choice[], multi: boolean, required: boolean, min: number, max: number }>
    ) => {
      const { multi, required, min, max } = action.payload;
      const currentChoice: any = action.payload.choices;
      const filteredSelections = filter(state.selections, (g) => g.choice_group_id !== action.payload.choice_group_id);
      const oldCurrentChoices = filter(flatten(map(state.selections, 'choices')), c => c.choice_id !== currentChoice[0].choice_id);
      const currentSelections = isUndefined(state.selections) ? [action.payload] :
        [
          ...filteredSelections,
          {
            ...action.payload,
            choices: multi && sumBy(oldCurrentChoices, 'quantity') + 1 <= max ? [...oldCurrentChoices, {
              choice_id: currentChoice[0].choice_id,
              quantity: currentChoice[0].quantity + 1,
              price: currentChoice[0].price,
              total: currentChoice[0].price * (currentChoice[0].quantity + 1),

            }] : [{
              choice_id: currentChoice[0].choice_id,
              quantity: 1,
              price: currentChoice[0].price,
              total: currentChoice[0].price,
            }]
          }
        ];
      return {
        ...state,
        selections: filter(currentSelections, (s) => s.choices.length !== 0)
      };
    },
    decreaseMeterChoice: (
      state: typeof initialState,
      action: PayloadAction<{ choice_group_id: number | string, choices: Choice[], multi: boolean, required: boolean, min: number, max: number }>
    ) => {
      const { multi, required, min, max } = action.payload;
      const currentChoice: any = action.payload.choices;
      const filteredSelections = filter(state.selections, (g) => g.choice_group_id !== action.payload.choice_group_id);
      const oldCurrentChoices = flatten(filter(map(state.selections, 'choices')));
      const currentSelections = isUndefined(state.selections) ? [action.payload] :
        [
          ...filteredSelections,
          {
            ...action.payload,
            choices: multi && sumBy(oldCurrentChoices, 'quantity') - 1 <= max ? [...oldCurrentChoices, {
              choice_id: currentChoice[0].choice_id,
              quantity: currentChoice[0].quantity - 1,
              price: currentChoice[0].price,
              total: currentChoice[0].price * (currentChoice[0].quantity - 1),
            }] : currentChoice[0].quantity - 1 > 0 ? [{
              choice_id: currentChoice[0].choice_id,
              quantity: currentChoice[0].quantity - 1,
              price: currentChoice[0].price,
              total: currentChoice[0].price * (currentChoice[0].quantity - 1),
            }] : []
          }
        ];
      return {
        ...state,
        selections: filter(currentSelections, (s) => s.choices.length !== 0)
      };
    },
    increaseQty: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        quantity: state.quantity + 1
      }
    },
    decreaseQty: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        quantity: state.quantity - 1 > 0 ? state.quantity - 1 : 0
      }
    },
    resetSelections: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        selections: initialState.selections
      }
    },
    resetProductModal: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(showProductModal, increaseMeterChoice,
      decreaseMeterChoice, addRadioChoice, removeRadioChoice, increaseQty,
      decreaseQty, addCheckoutChoice, removeCheckoutChoice), (state, action) => {
        const { price, quantity } = current(state);
        const choices = flatten(map(current(state).selections, 'choices'));
        const total = (price * quantity) + (isEmpty(choices) ? 0 : (sumBy(choices, 'total') * quantity));
        return {
          ...current(state),
          quantity,
          total,
          selections: total > 0 ? current(state).selections : initialState.selections
        }
      })
  },
});

export const {
  showProductModal,
  hideProductModal,
  setProductOriginalGroups,
  addRadioChoice,
  removeRadioChoice,
  addCheckoutChoice,
  removeCheckoutChoice,
  increaseMeterChoice,
  decreaseMeterChoice,
  increaseQty,
  decreaseQty,
  enableConfirm,
  disableConfirm,
  setSessionId,
  resetSelections,
  resetProductModal
} = productSlice.actions;
