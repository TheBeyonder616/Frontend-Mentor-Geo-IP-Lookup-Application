import { ErrorType, ExtractedDataType } from "../config/config";
export const ACTION = {
  SET_DATA: "SET_DATA",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",
} as const;

export type ActionType = keyof typeof ACTION;

export type State = {
  data: ExtractedDataType | null;
  error: ErrorType | null;
  isLoading: boolean;
};

export type Action =
  | { type: "SET_DATA"; payload: ExtractedDataType }
  | { type: "SET_ERROR"; payload: ErrorType | null }
  | { type: "SET_LOADING"; payload: boolean };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION.SET_DATA:
      return { ...state, data: action.payload, isLoading: false };
    case ACTION.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ACTION.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const initialState: State = {
  data: null,
  error: null,
  isLoading: false,
} as const;
