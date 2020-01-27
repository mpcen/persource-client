import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthActionTypes } from '../store/types';
import { fetchPlayers } from '../../Player/store/actions';

const PreLoadScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(fetchPlayers());
            // await new Promise(resolve => setTimeout(resolve, 0));

            dispatch({ type: AuthActionTypes.PRELOAD_COMPLETE });
        })();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" />
        </SafeAreaView>
    );
};

export default PreLoadScreen;
