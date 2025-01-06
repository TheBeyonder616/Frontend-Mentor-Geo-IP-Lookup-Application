import {
  useCallback,
  useReducer,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import Method from "../methods/methods";
import { ACTION, reducer, initialState } from "../reducer/reducer";
import useDebouncedCallback from "./useDebouncedCallback";
import { DEBOUNCED_SEARCH_TIMER } from "../config/config";

const useAppLogic = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, error, isLoading } = state;

  //!====================================[Functions]
  const getAndSetData = useCallback(async (): Promise<void> => {
    dispatch({ type: ACTION.SET_ERROR, payload: null });
    dispatch({ type: ACTION.SET_LOADING, payload: true });
    const result = await Method.getJsonData();

    if ("error" in result) {
      dispatch({ type: ACTION.SET_ERROR, payload: result });
      dispatch({ type: ACTION.SET_LOADING, payload: false });
      return;
    }

    dispatch({ type: ACTION.SET_DATA, payload: result });
    dispatch({ type: ACTION.SET_LOADING, payload: false });
  }, []);

  const handleInputValidation = useCallback(
    (inputValue: string): void => {
      switch (true) {
        case Method.isValidIP(inputValue):
        case Method.isValidDomain(inputValue):
          dispatch({
            type: ACTION.SET_ERROR,
            payload: null,
          });
          break;

        default:
          dispatch({
            type: ACTION.SET_ERROR,
            payload: { error: "Invalid IP address or domain" },
          });
          break;
      }
    },
    [dispatch]
  );

  //!====================================[Event]
  const onSearchChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      handleInputValidation(e.target.value);
    },
    [handleInputValidation]
  );

  const onKeyDownSearch = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>): Promise<void> => {
      if (e.key !== "Enter") return;
      if (isLoading) return;
      if (error && error.error === "Invalid IP address or Domain") return;
      const inputElement = e.target as HTMLInputElement;
      const inputValue = inputElement.value.trim();

      if (!inputValue) return;

      dispatch({ type: ACTION.SET_LOADING, payload: true });
      const result = await Method.searchJsonData(inputValue);

      if ("error" in result) {
        dispatch({ type: ACTION.SET_ERROR, payload: result });
        dispatch({ type: ACTION.SET_LOADING, payload: false });
        return;
      }

      dispatch({ type: ACTION.SET_DATA, payload: result });
      dispatch({ type: ACTION.SET_LOADING, payload: false });
      inputElement.value = "";
    },
    [handleInputValidation, error]
  );

  //!====================================[Debounced]
  const debouncedOnSearchChange = useDebouncedCallback(
    onSearchChange,
    DEBOUNCED_SEARCH_TIMER
  );

  const debouncedOnKeyDownSearch = useDebouncedCallback(
    onKeyDownSearch,
    DEBOUNCED_SEARCH_TIMER
  );

  const debouncedReFetchData = useDebouncedCallback(
    getAndSetData,
    DEBOUNCED_SEARCH_TIMER
  );

  useEffect(() => {
    getAndSetData();
  }, []);

  return {
    data,
    error,
    isLoading,
    debouncedOnSearchChange,
    debouncedOnKeyDownSearch,
    getAndSetData,
    debouncedReFetchData,
  };
};

export default useAppLogic;
