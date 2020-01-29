import React, { useEffect, useCallback } from 'react';
import { Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useScrollToTop } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/routers';

import { NewsStackParamList, SearchStackParamList } from '../../../App';
import { NavRoutes } from '../../navigation/navRoutes';
import { fetchPlayerNews, refetchPlayerNews } from './store/actions';
import { RootState } from '../../store/rootReducer';
import { NewsItem } from '../News/store/types';
import NewsCard from '../News/components/NewsCard';
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

    const { isLoadingFromNews, playerNewsFromNews } = playerReducer;

    useScrollToTop(ref);

    useEffect(() => {
        dispatch(refetchPlayerNews({ playerId: player.id, stackNavRoute: NavRoutes.NewsScreen }));

        return () => {
            dispatch({ type: PlayerActionTypes.CLEAR_PLAYER_NEWS_FROM_NEWS });
        };
    }, []);

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Text>BACK</Text>
            </TouchableOpacity>
            <FlatList
                ref={ref}
                refreshing={isLoadingFromNews}
                data={playerNewsFromNews.docs}
                keyExtractor={(item: NewsItem) => item._id}
                renderItem={({ item }: { item: NewsItem }) => <NewsCard player={player} newsItem={item} />}
                onEndReached={() => {
                    const { nextPage } = playerNewsFromNews;

                    if (!isLoadingFromNews && nextPage) {
                        dispatch(
                            fetchPlayerNews({
                                page: nextPage,
                                playerId: player.id,
                                stackNavRoute: NavRoutes.NewsScreen
                            })
                        );
                    }
                }}
                onRefresh={() => {
                    if (!isLoadingFromNews) {
                        dispatch(
                            refetchPlayerNews({ playerId: player.id, stackNavRoute: NavRoutes.NewsScreen })
                        );
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default PlayerScreen;
