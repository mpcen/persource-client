import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Player } from '../../Player/store/types';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    player: Player;
    onPress: () => void;
};

const PlayerSearchCard = ({ player, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{player.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default React.memo(
    PlayerSearchCard,
    (prevProps: Props, nextProps: Props) => prevProps.player.id === nextProps.player.id
);
