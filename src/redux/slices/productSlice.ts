import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filter, find, first, isUndefined } from 'lodash';

interface Choice {
  choice_id: number | string;
  quantity: number | string;
}

interface Selection {
  choice_group_id: number | string;
  choices: Choice[];
  multi?: boolean;
  required: boolean;
  min: number;
  max: number;
}


type Props = {
  id: number | string | null;
  quantity: number;
  enabled: boolean;
  originalGroups: [];
  selections: Selection[] | undefined;
  confirm: boolean;
  session_id: string | null;
};
const initialState: Props = {
  id: null,
  quantity: 1,
  enabled: false,
  originalGroups: [],
  selections: undefined,
  confirm: false,
  session_id: null
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    showProductModal: (
      state: typeof initialState,
      action: PayloadAction<number | string>
    ) => {
      return {
        ...state,
        id: action.payload,
        enabled: true,
        selections: action.payload === state.id ? state.selections : initialState.selections,
      };
    },
    hideProductModal: (
      state: typeof initialState,
      action: PayloadAction<void | undefined>
    ) => {
      return {
        ...state,
        id: null,
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
    addProductChoice: (
      state: typeof initialState,
      action: PayloadAction<{ group_id: number | string, choice_id: number | string, qty: number, multi: boolean, required: boolean, min: number, max: number }>
    ) => {
      const { group_id, choice_id, qty, multi, required, min, max } = action.payload;
      console.log('qty-=------', qty)
      const currentGroup = find(state.selections, (g) => g.choice_group_id === group_id);
      const filteredCurrentGroup = {
        choice_group_id: group_id,
        multi,
        required,
        min,
        max,
        choices: currentGroup && multi ? (!find(currentGroup.choices, (c) => c.choice_id === choice_id) ? [...filter(currentGroup.choices, c => c.choice_id !== choice_id), {
          choice_id,
          quantity: qty > min && qty <= max ? qty : 0
        }] : [...filter(currentGroup.choices, c => c.choice_id !== choice_id)]) : [{
          choice_id,
          quantity: qty > min && qty <= max ? qty : 0
        }]
      }
      const checkChoices = filter(filteredCurrentGroup.choices, c => c.quantity !== 0);
      const filteredSelections = filter(state.selections, (g) => g.choice_group_id !== group_id);
      const currentSelections = isUndefined(state.selections) ? [{
        choice_group_id: group_id,
        choices: [{
          choice_id,
          quantity: qty
        }],
        multi,
        required,
        min,
        max
      }] : checkChoices.length > 0 ?
        [
          ...filteredSelections,
          filteredCurrentGroup
        ] : filteredSelections;
      return {
        ...state,
        selections: filter(currentSelections, (s) => s.choices.length !== 0)
      };
    },
    removeProductChoice: (
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
    increaseQty: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        quantity: state.quantity + 1
      }
    },
    decraseQty: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        quantity: state.quantity - 1 > 0 ? state.quantity - 1 : 0
      }
    }
  }
});

export const {
  showProductModal,
  hideProductModal,
  setProductOriginalGroups,
  addProductChoice,
  removeProductChoice,
  increaseQty,
  decraseQty,
  enableConfirm,
  disableConfirm,
  setSessionId
} = productSlice.actions;
