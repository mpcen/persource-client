import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootState } from '../../store/rootReducer';
import { fetchNews, refetchNews } from './store/actions';
import { NewsType, NewsItem } from './store/types';
import NewsCard from './components/NewsCard';
import { NewsStackParamList } from '../../../App';

export type NewsScreenNavigationProp = StackNavigationProp<NewsStackParamList>;
type Props = {
    navigation: NewsScreenNavigationProp;
};

const NewsScreen = ({ navigation }: Props) => {
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
            <FlatList
                ref={ref}
                refreshing={isLoading}
                data={playerNews.docs}
                keyExtractor={(item: NewsItem) => item._id}
                renderItem={({ item }: { item: NewsItem }) => (
                    <NewsCard navigation={navigation} player={playerMap[item.player.id]} newsItem={item} />
                )}
                onEndReached={() => {
                    const { nextPage } = playerNews;

                    if (!isLoading && nextPage) {
                        dispatch(fetchNews({ page: nextPage }));
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
