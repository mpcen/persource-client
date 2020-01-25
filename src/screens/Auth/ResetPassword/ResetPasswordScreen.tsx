import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import { NavRoutes } from '../../../navigation/navRoutes';
import { AuthActionTypes } from '../store/types';
import { resetPassword } from '../store/actions';
import { RootState } from '../../../store/rootReducer';

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const authReducer = useSelector((state: RootState) => state.auth);
    const { isLoading, error, successMessage } = authReducer;

    useFocusEffect(
        useCallback(() => {
            return () => dispatch({ type: AuthActionTypes.CLEAR_STATE });
        }, [])
    );

    return (
        <SafeAreaView>
            <Text onPress={() => navigation.navigate(NavRoutes.SigninScreen)}>GO BACK</Text>

            <Text h3>Reset Password</Text>

            <Input placeholder="Email Address" onChangeText={setEmail} />

            {error && <Text style={styles.error}>ERROR</Text>}

            {isLoading && <Text>Loading...</Text>}
            {successMessage ? <Text>{successMessage}</Text> : null}

            <Button title="Reset Password" onPress={() => dispatch(resetPassword({ email }))} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    error: {
        color: 'red'
    }
});

export default ResetPasswordScreen;
