import { Country, Product } from '@/types/queries';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { concat, filter, find, identity, isEmpty, isNil, isNull, isUndefined, map, omitBy, remove } from 'lodash';

interface Choice {
  choice_id: number | string;
  quantity: number | string;
}

interface Selection {
  choice_group_id: number | string;
  choices: Choice[];
}


type Props = {
  id: number | string | null;
  enabled: boolean;
  groups: [];
  selections: Selection[] | undefined;
};
const initialState: Props = {
  id: null,
  enabled: false,
  groups: [],
  selections: undefined
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
    setProductGroups: (
      state: typeof initialState,
      action: PayloadAction<[]>
    ) => {
      return {
        ...state,
        groups: action.payload
      };
    },
    addProductChoice: (
      state: typeof initialState,
      action: PayloadAction<{ group_id: number | string, choice_id: number | string, qty: number, multi: boolean }>
    ) => {
      // not undefined 
      // ...(orderType && { 'X-TYPE': orderType })
      const { group_id, choice_id, qty, multi } = action.payload;
      const currentGroup = find(state.selections, (g) => g.choice_group_id === group_id);
      const currentSelections = isUndefined(state.selections) ? [{
        choice_group_id: group_id,
        choices: [{
          choice_id,
          quantity: qty
        }],
        multi
      }] :
        [
          ...filter(state.selections, (g) => g.choice_group_id !== group_id),
          {
            choice_group_id: group_id,
            choices: currentGroup && multi ? [...currentGroup.choices, {
              choice_id,
              quantity: qty
            }] : [{
              choice_id,
              quantity: qty
            }],
            multi
          }
        ];
      return {
        ...state,
        selections: currentSelections
      };
    },
    removeProductChoice: (
      state: typeof initialState,
      action: PayloadAction<{ group_id: number | string, choice_id: number | string }>
    ) => {
      const cleanSelections: any = () => {
        if (!isUndefined(state.selections)) {
          const filteredSelections = omitBy(state.selections, isNil);
          const groupIdFounded = find(filteredSelections, ['choice_group_id', action.payload.group_id]);
          if (groupIdFounded) {
            const choiceIdfounded = find(filteredSelections, ['choices.choice_id', action.payload.choice_id]);
            if (choiceIdfounded) {
              // choice exists
              const filteredChoices = remove(groupIdFounded.choices, (c: any) => c.id === action.payload.choice_id);
              if (filteredChoices.length > 0) {
                return concat(filteredSelections, {
                  choice_group_id: action.payload.group_id,
                  choices: filteredChoices
                })
              } else {
                return map(filteredSelections, (g) => g.choice_group_id !== action.payload.group_id)
              }
            } else {
              return filteredSelections;
            }
          } else {
            return filteredSelections;
          }
        } else {
          return undefined;
        }
      }
      return {
        ...state,
        selections: cleanSelections()
      };
    }
  }
});

export const {
  showProductModal,
  hideProductModal,
  setProductGroups,
  addProductChoice,
  removeProductChoice
} = productSlice.actions;
