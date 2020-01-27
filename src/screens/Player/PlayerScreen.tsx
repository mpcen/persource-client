import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlayerScreen = ({ route }) => {
    const { player } = route.params;

    return (
        <SafeAreaView>
            <Text>{player.name}</Text>
        </SafeAreaView>
    );
};

export default PlayerScreen;
