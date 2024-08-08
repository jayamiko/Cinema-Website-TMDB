import { createContext, useReducer } from "react";
import { STATE } from "../constants/State";
import { getLocalStorageValue } from "../utils/localStorage.";

export const initialSession = {
  isLogin: false,
  session_id: "",
};

export const AuthContext = createContext();

const Reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case STATE.LOGIN:
      localStorage.setItem("session_id", payload.session_id);
      return {
        ...state,
        isLogin: true,
        session_id: payload.session_id,
      };
    case STATE.LOGOUT:
      localStorage.removeItem("session_id");
      return initialSession;
    default:
      throw new Error("type doesn't match cases");
  }
};

export const AuthContextProvider = ({ children }) => {
  const [stateAuth, dispatch] = useReducer(Reducer, initialSession);

  return (
    <AuthContext.Provider value={{ stateAuth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
