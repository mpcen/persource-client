import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { AuthActionTypes } from '../store/types';

const ResolveAuthScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initialize = async () => {
            let userToken = await AsyncStorage.getItem('persource-token');

            if (userToken) {
                dispatch({ type: AuthActionTypes.RESOLVE_AUTH_SUCCESS, payload: userToken });
            } else {
                dispatch({ type: AuthActionTypes.RESOLVE_AUTH_FAIL });
            }
        };

        initialize();
    }, []);

    return null;
};

export default ResolveAuthScreen;
