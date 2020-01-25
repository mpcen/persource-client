import * as actions from './actions';

// GENERICS
type AuthToken = string;

// STATE
export type AuthState = {
    userToken: string | null;
    error: boolean;
    successMessage: string;
    isLoading: boolean;
    isPreLoadComplete: boolean;
    isResolvingAuth: boolean;
};

// ACTION TYPES
export enum AuthActionTypes {
    RESOLVE_AUTH_SUCCESS = 'RESOLVE_AUTH_SUCCESS',
    RESOLVE_AUTH_FAIL = 'RESOLVE_AUTH_FAIL',
    SIGNIN = 'SIGNIN',
    SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
    SIGNIN_FAIL = 'SIGNIN_FAIL',
    SIGNUP = 'SIGNUP',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNUP_FAIL = 'SIGNUP_FAIL',
    SIGNOUT = 'SIGNOUT',
    PRELOAD_COMPLETE = 'PRELOAD_COMPLETE',
    CLEAR_STATE = 'CLEAR_STATE',
    RESET_PASSWORD = 'RESET_PASSWORD',
    RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL'
}

// ACTIONS - SIGNUP
export type Signup = {
    type: AuthActionTypes.SIGNUP;
};
export type SignupSuccess = {
    type: AuthActionTypes.SIGNUP_SUCCESS;
    payload: AuthToken;
};
export type SignupFail = {
    type: AuthActionTypes.SIGNUP_FAIL;
    payload: string;
};

// ACTIONS - SIGNIN
export type Signin = {
    type: AuthActionTypes.SIGNIN;
};
export type SigninSuccess = {
    type: AuthActionTypes.SIGNIN_SUCCESS;
    payload: AuthToken;
};
export type SigninFail = {
    type: AuthActionTypes.SIGNIN_FAIL;
    payload: string;
};

// ACTIONS - RESOLVE_AUTH
export type ResolveAuthSuccess = {
    type: AuthActionTypes.RESOLVE_AUTH_SUCCESS;
    payload: string;
};
export type ResolveAuthFail = {
    type: AuthActionTypes.RESOLVE_AUTH_FAIL;
};

// ACTIONS - SIGNOUT
export type Signout = {
    type: AuthActionTypes.SIGNOUT;
};

// ACTIONS - RESET_PASSWORD
export type ResetPassword = {
    type: AuthActionTypes.RESET_PASSWORD;
};
export type ResetPasswordSuccess = {
    type: AuthActionTypes.RESET_PASSWORD_SUCCESS;
    payload: string;
};
export type ResetPasswordFail = {
    type: AuthActionTypes.RESET_PASSWORD_FAIL;
    payload: string;
};

// ACTIONS - CLEAR_STATE
export type ClearError = {
    type: AuthActionTypes.CLEAR_STATE;
};

// ACTIONS - PRELOAD
export type PreLoadComplete = {
    type: AuthActionTypes.PRELOAD_COMPLETE;
};

// prettier-ignore
export type AuthActions =
    | Signup
    | SignupSuccess
    | SignupFail
    | Signin
    | SigninSuccess
    | SigninFail
    | Signout
    | ResetPassword
    | ResetPasswordSuccess
    | ResetPasswordFail
    | ClearError
    | PreLoadComplete
    | ResolveAuthSuccess
    | ResolveAuthFail;
