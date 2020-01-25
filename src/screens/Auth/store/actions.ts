import { AsyncStorage } from 'react-native';

import persourceAPI from '../../../api/persource-api';
import { AuthActionTypes } from './types';
import { NavRoutes } from '../../../navigation/navRoutes';
import * as NavigationService from '../../../navigation/navigationRef';

export const signin = ({ email, password }) => async dispatch => {
    dispatch({ type: AuthActionTypes.SIGNIN });

    try {
        const response = await persourceAPI.post('/signin', { email, password });

        await AsyncStorage.setItem('persource-token', response.data.token);

        dispatch({ type: AuthActionTypes.SIGNIN_SUCCESS, payload: response.data.token });

        NavigationService.navigate(NavRoutes.PreLoadScreen);
    } catch (err) {
        dispatch({ type: AuthActionTypes.SIGNIN_FAIL });
    }
};

export const signup = ({ email, password }) => async dispatch => {
    dispatch({ type: AuthActionTypes.SIGNUP });

    try {
        const response = await persourceAPI.post('/signup', { email, password });

        await AsyncStorage.setItem('persource-token', response.data.token);

        dispatch({ type: AuthActionTypes.SIGNUP_SUCCESS, payload: response.data.token });

        NavigationService.navigate(NavRoutes.PreLoadScreen);
    } catch (err) {
        dispatch({ type: AuthActionTypes.SIGNUP_FAIL });
    }
};

export const signout = () => async dispatch => {
    await AsyncStorage.removeItem('persource-token');

    dispatch({ type: AuthActionTypes.SIGNOUT });
};

export const resetPassword = ({ email }) => async dispatch => {
    if (!email) {
        return dispatch({ type: AuthActionTypes.RESET_PASSWORD_FAIL });
    }

    dispatch({ type: AuthActionTypes.RESET_PASSWORD });

    try {
        await persourceAPI.post('/resetpassword', { email });

        dispatch({
            type: AuthActionTypes.RESET_PASSWORD_SUCCESS,
            payload: 'Password has been reset. Check your email'
        });
    } catch (err) {
        dispatch({ type: AuthActionTypes.RESET_PASSWORD_FAIL });
    }
};
