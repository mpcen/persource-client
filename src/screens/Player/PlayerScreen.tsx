import React from 'react';
import { Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { useScrollToTop } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { NewsStackParamList, SearchStackParamList } from '../../../App';
import { NavRoutes } from '../../navigation/navRoutes';
import { fetchPlayerNews, refetchPlayerNews } from './store/actions';
import { NewsItem } from '../News/store/types';
import NewsCard from '../News/components/NewsCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { usePlayerNews } from './hooks/usePlayerNews';

type PlayerStackParamList = NewsStackParamList | SearchStackParamList;
type PlayerScreenNavigationProp = StackNavigationProp<PlayerStackParamList>;
type PlayerScreenFromNewsRouteProp = RouteProp<NewsStackParamList, NavRoutes.PlayerScreenFromNews>;
type PlayerScreenFromSearchRouteProp = RouteProp<SearchStackParamList, NavRoutes.PlayerScreenFromSearch>;
type Props = {
    navigation: PlayerScreenNavigationProp;
    route: PlayerScreenFromNewsRouteProp | PlayerScreenFromSearchRouteProp;
};

const PlayerScreen = ({ route, navigation }: Props) => {
    const { player, stackNavRoute } = route.params;
    const [isLoading, playerNews, dispatch] = usePlayerNews(player, stackNavRoute);
    const ref = React.createRef<any>();

    useScrollToTop(ref);

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Text>BACK</Text>
            </TouchableOpacity>
            <FlatList
                ref={ref}
                refreshing={isLoading}
                data={playerNews.docs}
                keyExtractor={(item: NewsItem) => item._id}
                renderItem={({ item }: { item: NewsItem }) => <NewsCard player={player} newsItem={item} />}
                onEndReached={() => {
                    const { nextPage } = playerNews;

                    if (!isLoading && nextPage) {
                        dispatch(fetchPlayerNews({ page: nextPage, playerId: player.id, stackNavRoute }));
                    }
                }}
                onRefresh={() => {
                    if (!isLoading) {
                        dispatch(refetchPlayerNews({ playerId: player.id, stackNavRoute }));
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default PlayerScreen;
