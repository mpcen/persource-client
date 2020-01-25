import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Text } from 'react-native-elements';

// import { fetchNews, refetchNews } from './store/actions';
// import { NewsType } from './store/types';
// import PlayerNewsCard from './components/PlayerNewsCard';

const NewsScreen = () => {
    // const dispatch = useDispatch();
    // const newsReducer = useSelector(state => state.news);
    // const playersReducer = useSelector(state => state.players);
    // const ref = React.createRef();

    // const { playerMap } = playersReducer;
    // const { isLoading, playerNews } = newsReducer;

    // useScrollToTop(ref);

    // React.useEffect(() => {
    //     dispatch(refetchNews());
    // }, []);

    return (
        <SafeAreaView>
            <Text h2>News</Text>
            {/* <FlatList
                ref={ref}
                refreshing={isLoading}
                data={playerNews.docs}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
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
            /> */}
        </SafeAreaView>
    );
};

export default NewsScreen;
