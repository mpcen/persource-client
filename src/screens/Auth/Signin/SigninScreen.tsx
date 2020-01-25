import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, Input } from 'react-native-elements';

import { NavRoutes } from '../../../navigation/navRoutes';
import { signin } from '../store/actions';
import { RootState } from '../../../store/rootReducer';
import { AuthActionTypes } from '../store/types';

const SigninScreen = ({ navigation }) => {
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
            <Text h3>Sign In</Text>

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

            <Button title="Sign in" onPress={() => dispatch(signin({ email, password }))} />

            <Text style={styles.link} onPress={() => navigation.navigate(NavRoutes.SignupScreen)}>
                Dont have an account? Sign up instead
            </Text>

            <Text style={styles.link} onPress={() => navigation.navigate(NavRoutes.ResetPasswordScreen)}>
                Forgot password?
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

export default SigninScreen;
