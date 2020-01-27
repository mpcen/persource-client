import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import { RootState } from '../../store/rootReducer';

import { fetchNews, refetchNews } from './store/actions';
import { NewsType, PlayerNewsItem } from './store/types';
import PlayerNewsCard from './components/PlayerNewsCard';
// import PlayerNewsCard from './components/PlayerNewsCard';

const NewsScreen = () => {
    const dispatch = useDispatch();
    const newsReducer = useSelector((state: RootState) => state.news);
    const playerReducer = useSelector((state: RootState) => state.player);
    const ref = React.createRef<any>();

    const { playerMap } = playerReducer;
    const { isLoading, playerNews } = newsReducer;

    useScrollToTop(ref);

    useEffect(() => {
        dispatch(refetchNews());
    }, []);

    return (
        <SafeAreaView>
            <Text h2>News</Text>
            <FlatList
                ref={ref}
                refreshing={isLoading}
                data={playerNews.docs}
                keyExtractor={(item: PlayerNewsItem) => item._id}
                renderItem={({ item }: { item: PlayerNewsItem }) => (
                    <PlayerNewsCard player={playerMap[item.player.id]} playerNewsItem={item} />
                )}
                onEndReached={() => {
                    const { nextPage } = playerNews;

                    if (!isLoading && nextPage) {
                        dispatch(fetchNews({ page: nextPage, newsType: NewsType.All }));
                    }
                }}
                onRefresh={() => {
                    if (!isLoading) {
                        dispatch(refetchNews());
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default NewsScreen;
