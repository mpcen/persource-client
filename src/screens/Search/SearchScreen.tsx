import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Input } from 'react-native-elements';
import { FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import { NavRoutes } from '../../navigation/navRoutes';
import { RootState } from '../../store/rootReducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchStackParamList } from '../../../App';
import { Player } from '../Player/store/types';
import PlayerSearchCard from './components/PlayerSearchCard';

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList>;

type Props = {
    navigation: SearchScreenNavigationProp;
};

const SearchScreen = ({ navigation }: Props) => {
    const [text, setText] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const playerReducer = useSelector((state: RootState) => state.player);

    const insets = useSafeArea();
    const ref = React.createRef<any>();

    useScrollToTop(ref);

    useEffect(() => {
        const filteredPlayers = [];
        const { playerMap } = playerReducer;

        for (let playerId in playerMap) {
            if (playerMap[playerId].name.toLowerCase().includes(text.toLowerCase())) {
                filteredPlayers.push(playerMap[playerId]);
            }
        }

        setFilteredPlayers(filteredPlayers);
    }, [text]);

    return (
        <View style={{ paddingTop: insets.top }}>
            <Input
                placeholder="Search for a player"
                autoCapitalize="none"
                autoCorrect={false}
                value={text}
                onChangeText={setText}
            />

            <FlatList
                ref={ref}
                data={filteredPlayers}
                keyExtractor={(item: Player) => item.id}
                renderItem={({ item }: { item: Player }) => (
                    <PlayerSearchCard
                        player={item}
                        onPress={() =>
                            navigation.navigate(NavRoutes.PlayerScreenFromSearch, {
                                player: item,
                                stackNavRoute: NavRoutes.SearchScreen
                            })
                        }
                    />
                )}
            />
        </View>
    );
};

export default SearchScreen;
