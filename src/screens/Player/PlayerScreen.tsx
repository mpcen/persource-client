import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { useScrollToTop } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonGroup, Avatar, Card, Text } from 'react-native-elements';
import { EvilIcons, Ionicons, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';

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
    GameLogs,
    Rankings,
    Projections
}

const NewsButton = () => <Ionicons name="md-paper" size={28} />;
const GameLogsButton = () => <MaterialIcons name="history" size={28} />;
const RankingsButton = () => <Entypo name="medal" size={28} />;
const ProjectionsButton = () => <AntDesign name="barschart" size={28} />;

const PlayerScreen = ({ route, navigation }: Props) => {
    const { player, stackNavRoute } = route.params;
    const [selectedTabIndex, setSelectedTabIndex] = useState(PlayerScreenTab.News);
    const [isLoading, playerNews, dispatch] = usePlayerNews(player, stackNavRoute);
    const ref = React.createRef<any>();
    const { name, position, teamId, avatarUrl } = player;

    useScrollToTop(ref);

    return (
        <SafeAreaView>
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.topCardContainer}>
                    <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.pop()}>
                        <EvilIcons name="chevron-left" size={44} />
                    </TouchableOpacity>

                    <View style={styles.cardContentContainer}>
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
                </View>

                <View style={styles.buttonGroupContainer}>
                    <ButtonGroup
                        containerStyle={styles.buttonGroup}
                        onPress={setSelectedTabIndex}
                        selectedIndex={selectedTabIndex}
                        buttons={[
                            { element: NewsButton },
                            { element: GameLogsButton },
                            { element: RankingsButton },
                            { element: ProjectionsButton }
                        ]}
                    />
                </View>
            </Card>

            <FlatList
                style={selectedTabIndex === PlayerScreenTab.News ? null : styles.hideList}
                ref={ref}
                refreshing={isLoading}
                data={playerNews.docs}
                ListEmptyComponent={!isLoading && <Text>No player news for {player.name}</Text>}
                keyExtractor={(item: NewsItem) => item._id}
                renderItem={({ item }: { item: NewsItem }) => (
                    <NewsCard hidePlayerInfo player={player} newsItem={item} />
                )}
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

            {selectedTabIndex === PlayerScreenTab.GameLogs && (
                <View style={selectedTabIndex === PlayerScreenTab.GameLogs ? null : styles.hideList}>
                    <Text>Game Logs</Text>
                </View>
            )}

            {selectedTabIndex === PlayerScreenTab.Rankings && (
                <View style={selectedTabIndex === PlayerScreenTab.Rankings ? null : styles.hideList}>
                    <Text>Rankings</Text>
                </View>
            )}

            {selectedTabIndex === PlayerScreenTab.Projections && (
                <View style={selectedTabIndex === PlayerScreenTab.Projections ? null : styles.hideList}>
                    <Text>Projections</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        margin: 0,
        padding: 0,
        borderBottomWidth: 0
    },
    topCardContainer: { padding: 14 },
    goBackButton: {
        backgroundColor: 'white',
        marginLeft: -16,
        alignSelf: 'flex-start'
    },
    cardContentContainer: { flexDirection: 'row' },
    buttonGroupContainer: {},
    buttonGroup: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0
    },
    playerInfoContainer: { flex: 1, marginLeft: 8 },
    playerName: { fontSize: 20 },
    playerSubInfoContainer: { flexDirection: 'row' },
    playerInfoText: { fontSize: 14 },
    hideList: { height: 0 }
});

export default PlayerScreen;
