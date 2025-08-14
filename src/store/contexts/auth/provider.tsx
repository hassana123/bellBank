import React from 'react';

import {
  AuthContext,
  type AuthType,
  type LoginPayloadType,
  type LogoutPayloadType,
  type OTPContextType,
  type ReducerActionType,
} from './context';

function reducer(state: AuthType, action: ReducerActionType) {
  switch (action.type) {
    case 'change-csrf':
      return {
        ...state,
        csrfToken: action.payload,
      };
    case 'login':
      return {
        auth: true,
        csrfToken: action.payload.csrfToken,
        loading: false,
        data: action.payload.user,
        otp: null,
        token: action.payload.token,
      };
    case 'logout':
      return {
        auth: false,
        csrfToken: action.payload?.csrfToken || state.csrfToken,
        loading: false,
        data: state.data,
        token: null,
        otp: null,
      };
    case 'set-otp':
      return { ...state, otp: action.payload };
    default:
      return state;
  }
}

const initialState = {
  auth: false,
  csrfToken: null,
  data: null,
  loading: true,
  token: null,
  otp: null,
};

const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const changeCSRFToken = React.useCallback(
    (payload: string) => {
      dispatch({ type: 'change-csrf', payload });
    },
    [dispatch]
  );

  const login = React.useCallback(
    (payload: LoginPayloadType) => {
      dispatch({ type: 'login', payload });
    },
    [dispatch]
  );

  const logout = React.useCallback(
    (payload: LogoutPayloadType) => {
      dispatch({
        type: 'logout',
        payload,
      });
    },
    [dispatch]
  );

  const setOTP = React.useCallback(
    (payload: OTPContextType | null) => {
      dispatch({ type: 'set-otp', payload });
    },
    [dispatch]
  );

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
        csrfToken: state.csrfToken,
        changeCSRFToken,
        data: state.data,
        loading: state.loading,
        login,
        logout,
        otp: state.otp,
        setOTP,
        token: state.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
