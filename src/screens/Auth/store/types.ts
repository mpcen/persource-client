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
    RESOLVE_AUTH_SUCCESS = 'auth/resolveAuth_success',
    RESOLVE_AUTH_FAIL = 'auth/resolveAuth_fail',
    SIGNIN = 'auth/signin',
    SIGNIN_SUCCESS = 'auth/signin_success',
    SIGNIN_FAIL = 'auth/signin_fail',
    SIGNUP = 'auth/signup',
    SIGNUP_SUCCESS = 'auth/signup_success',
    SIGNUP_FAIL = 'auth/signup_fail',
    SIGNOUT = 'auth/signout',
    PRELOAD_COMPLETE = 'auth/preload_complete',
    CLEAR_STATE = 'auth/clearState',
    RESET_PASSWORD = 'auth/resetPassword',
    RESET_PASSWORD_SUCCESS = 'auth/resetPassword_success',
    RESET_PASSWORD_FAIL = 'auth/resetPassword_fail'
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
    | ResolveAuthFail
