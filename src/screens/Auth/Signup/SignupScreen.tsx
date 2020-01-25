import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, Input } from 'react-native-elements';

import { NavRoutes } from '../../../navigation/navRoutes';
import { signup } from '../store/actions';
import { AuthActionTypes } from '../store/types';
import { RootState } from '../../../store/rootReducer';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const authReducer = useSelector((state: RootState) => state.auth);
    const { isLoading, userToken, error } = authReducer;

    useFocusEffect(
        useCallback(() => {
            return () => dispatch({ type: AuthActionTypes.CLEAR_STATE });
        }, [])
    );

    return (
        <SafeAreaView>
            <Text h3>Sign Up</Text>

            <Input
                placeholder="Email Address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />

            <Input
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {isLoading && <Text>Loading...</Text>}
            {userToken && <Text>Signed in</Text>}
            {error && <Text style={styles.error}>ERROR</Text>}

            <Button title="Sign up" onPress={() => dispatch(signup({ email, password }))} />

            <Text
                testID="button-goto-signin"
                style={styles.link}
                onPress={() => navigation.navigate(NavRoutes.SigninScreen)}
            >
                Already have an account? Sign in instead
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    link: {
        color: 'blue'
    },
    error: {
        color: 'red'
    }
});

export default SignupScreen;
