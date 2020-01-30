import { AuthActions, AuthActionTypes } from './types';

const initialState = {
    isLoading: true,
    isResolvingAuth: true,
    isPreLoadComplete: false,
    userToken: null,
    successMessage: '',
    error: false
};

export const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        // SIGNIN
        case AuthActionTypes.SIGNIN:
            return {
                ...state,
                isLoading: true
            };

        case AuthActionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userToken: action.payload,
                error: false
            };

        case AuthActionTypes.SIGNIN_FAIL:
            return {
                ...state,
                isLoading: false,
                userToken: null,
                error: true
            };

        // SIGNUP
        case AuthActionTypes.SIGNUP:
            return {
                ...state,
                isLoading: true
            };

        case AuthActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userToken: action.payload,
                error: false
            };

        case AuthActionTypes.SIGNUP_FAIL:
            return {
                ...state,
                isLoading: false,
                userToken: null,
                error: true
            };

        // RESOLVE_AUTH
        case AuthActionTypes.RESOLVE_AUTH_SUCCESS:
            return {
                ...state,
                isResolvingAuth: false,
                userToken: action.payload,
                error: false
            };

        case AuthActionTypes.RESOLVE_AUTH_FAIL:
            return {
                ...state,
                isResolvingAuth: false,
                error: false,
                userToken: null
            };

        // RESET_PASSWORD
        case AuthActionTypes.RESET_PASSWORD:
            return {
                ...state,
                isLoading: true
            };

        case AuthActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                successMessage: action.payload,
                error: false
            };

        case AuthActionTypes.RESET_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                successMessage: '',
                error: true
            };

        // PRELOAD
        case AuthActionTypes.PRELOAD_COMPLETE:
            return {
                ...state,
                isPreLoadComplete: true
            };

        // CLEAR_STATE
        case AuthActionTypes.CLEAR_STATE:
            return {
                ...state,
                error: false,
                successMessage: ''
            };

        // SIGNOUT
        case AuthActionTypes.SIGNOUT:
            return { ...initialState };

        default:
            return state;
    }
};
