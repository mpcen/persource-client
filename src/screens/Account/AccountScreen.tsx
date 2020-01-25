import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import { signout } from '../Auth/store/actions';

const AccountScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <Button title="Sign out" onPress={() => dispatch(signout())} />
        </SafeAreaView>
    );
};

export default AccountScreen;
