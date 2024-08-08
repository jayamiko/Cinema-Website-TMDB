import { createContext, useReducer } from "react";
import { Action } from "../constants/State";
import { StorageKey } from "../constants/StorageKey";

export const initialState = {
  isLogin: false,
  session_id: "",
};

const Reducer = (state, action) => {
  const { type, payload } = action;
  const sessionKey = StorageKey.SESSION_ID;

  switch (type) {
    case Action.LOGIN:
      localStorage.setItem(sessionKey, payload.session_id);
      return {
        isLogin: true,
        session_id: payload.session_id,
      };

    case Action.LOGOUT:
      localStorage.removeItem(sessionKey);
      return initialState;

    default:
      throw new Error("type doesn't match cases");
  }
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [stateAuth, dispatch] = useReducer(Reducer, initialState);

  return (
    <AuthContext.Provider value={{ stateAuth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
