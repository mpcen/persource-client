import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { useScrollToTop } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonGroup, Avatar, Card, Text } from 'react-native-elements';

import { NewsStackParamList, SearchStackParamList } from '../../../App';
import { NavRoutes } from '../../navigation/navRoutes';
import { fetchPlayerNews, refetchPlayerNews } from './store/actions';
import { NewsItem } from '../News/store/types';
import NewsCard from '../News/components/NewsCard';
import { usePlayerNews } from './hooks/usePlayerNews';
import { getTeamById } from '../../util/teams';

type PlayerStackParamList = NewsStackParamList | SearchStackParamList;
type PlayerScreenNavigationProp = StackNavigationProp<PlayerStackParamList>;
type PlayerScreenFromNewsRouteProp = RouteProp<NewsStackParamList, NavRoutes.PlayerScreenFromNews>;
type PlayerScreenFromSearchRouteProp = RouteProp<SearchStackParamList, NavRoutes.PlayerScreenFromSearch>;
type Props = {
    navigation: PlayerScreenNavigationProp;
    route: PlayerScreenFromNewsRouteProp | PlayerScreenFromSearchRouteProp;
};
enum PlayerScreenTab {
    News,
    Analytics
}

const PlayerScreen = ({ route, navigation }: Props) => {
    const { player, stackNavRoute } = route.params;
    const [selectedTabIndex, setSelectedTabIndex] = useState(PlayerScreenTab.News);
    const [isLoading, playerNews, dispatch] = usePlayerNews(player, stackNavRoute);
    const ref = React.createRef<any>();
    const { name, position, teamId, avatarUrl } = player;

    useScrollToTop(ref);

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Text>BACK</Text>
            </TouchableOpacity>

            <Card>
                <View style={styles.cardContainer}>
                    <Avatar size="large" rounded source={{ uri: avatarUrl }} />

                    <View style={styles.playerInfoContainer}>
                        <Text style={styles.playerName}>{name}</Text>
                        <View style={styles.playerSubInfoContainer}>
                            <Text style={styles.playerInfoText}>{position}</Text>
                            <Text style={styles.playerInfoText}> | </Text>
                            <Text style={styles.playerInfoText}>{getTeamById(teamId).abbrev}</Text>
                        </View>
                    </View>
                </View>
            </Card>

            <ButtonGroup
                onPress={setSelectedTabIndex}
                selectedIndex={selectedTabIndex}
                buttons={['News', 'Analytics']}
            />

            <FlatList
                style={selectedTabIndex === PlayerScreenTab.News ? null : styles.hideList}
                ref={ref}
                refreshing={isLoading}
                data={playerNews.docs}
                ListEmptyComponent={!isLoading && <Text>No player news for {player.name}</Text>}
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

            {selectedTabIndex === PlayerScreenTab.Analytics && (
                <View style={selectedTabIndex === PlayerScreenTab.Analytics ? null : styles.hideList}>
                    <Text>Analytics articles, charts, etc go in here</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    cardContainer: { flexDirection: 'row' },
    playerInfoContainer: { flex: 1, marginLeft: 8 },
    playerName: { fontSize: 20 },
    playerSubInfoContainer: { flexDirection: 'row' },
    playerInfoText: { fontSize: 14 },
    hideList: { height: 0 }
});

export default PlayerScreen;
