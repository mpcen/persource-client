import React, { useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { useScrollToTop } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { NewsStackParamList, SearchStackParamList } from '../../../App';
import { NavRoutes } from '../../navigation/navRoutes';
import { fetchPlayerNews, refetchPlayerNews } from './store/actions';
import { RootState } from '../../store/rootReducer';
import { PlayerNewsItem } from '../News/store/types';
import PlayerNewsCard from '../News/components/PlayerNewsCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlayerActionTypes } from './store/types';

type PlayerStackParamList = NewsStackParamList | SearchStackParamList;
type PlayerScreenNavigationProp = StackNavigationProp<PlayerStackParamList>;
type PlayerScreenRouteProp = RouteProp<PlayerStackParamList, NavRoutes.PlayerScreen>;
type Props = {
    navigation: PlayerScreenNavigationProp;
    route: PlayerScreenRouteProp;
};

const PlayerScreen = ({ route, navigation }: Props) => {
    const dispatch = useDispatch();
    const { player } = route.params;
    const playerReducer = useSelector((state: RootState) => state.player);
    const ref = React.createRef<any>();

    const { isLoading, playerNews } = playerReducer;

    useScrollToTop(ref);

    useEffect(() => {
        dispatch(refetchPlayerNews({ playerId: player.id }));

        return () => {
            dispatch({ type: PlayerActionTypes.CLEAR_PLAYER_NEWS });
        };
    }, []);

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>BACK</Text>
            </TouchableOpacity>
            <FlatList
                ref={ref}
                refreshing={isLoading}
                data={playerNews.docs}
                keyExtractor={(item: PlayerNewsItem) => item._id}
                renderItem={({ item }: { item: PlayerNewsItem }) => (
                    <PlayerNewsCard player={player} playerNewsItem={item} />
                )}
                onEndReached={() => {
                    const { nextPage } = playerNews;

                    if (!isLoading && nextPage) {
                        dispatch(fetchPlayerNews({ page: nextPage, playerId: player.id }));
                    }
                }}
                onRefresh={() => {
                    if (!isLoading) {
                        dispatch(refetchPlayerNews({ playerId: player.id }));
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default PlayerScreen;
