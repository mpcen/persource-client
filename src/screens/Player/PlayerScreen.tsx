import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlayerScreen = ({ navigation, route }) => {
    const { player } = route.params;

    return (
        <SafeAreaView>
            <Text>{player.name}</Text>
        </SafeAreaView>
    );
};

export default PlayerScreen;
