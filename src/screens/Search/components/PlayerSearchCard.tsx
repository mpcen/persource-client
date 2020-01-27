import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import { Player } from '../../Player/store/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getTeamById } from '../../../util/teams';

type Props = {
    player: Player;
    onPress: () => void;
};

const PlayerSearchCard = ({ player, onPress }: Props) => {
    const { name, position, teamId, avatarUrl, id } = player;

    return (
        <TouchableOpacity onPress={onPress}>
            <ListItem
                title={name}
                subtitle={`${position} | ${getTeamById(teamId).abbrev}`}
                bottomDivider
                leftAvatar={
                    <Avatar
                        rounded
                        size="medium"
                        avatarStyle={styles.avatarStyle}
                        source={{ uri: avatarUrl }}
                    />
                }
                rightIcon={null}
                onPress={onPress}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    avatarStyle: {
        borderColor: 'white'
    }
});

export default React.memo(
    PlayerSearchCard,
    (prevProps: Props, nextProps: Props) => prevProps.player.id === nextProps.player.id
);
