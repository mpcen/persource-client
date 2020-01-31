import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar, Divider, Icon } from 'react-native-elements';
import formatDistance from 'date-fns/formatDistance';
import * as WebBrowser from 'expo-web-browser';

import { getTeamById } from '../../../util/teams';
import { Player } from '../../Player/store/types';
import { NewsItem } from '../store/types';
import { NewsScreenNavigationProp } from '../NewsScreen';
import { NavRoutes } from '../../../navigation/navRoutes';

type Props = {
    player: Player;
    newsItem: NewsItem;
    hidePlayerInfo?: boolean;
    navigation?: NewsScreenNavigationProp;
};

const NewsCard = ({ navigation, player, newsItem, hidePlayerInfo }: Props) => {
    const { avatarUrl, name, position, teamId, id } = player;
    const { content, username, time, platform, childNodes, contentId } = newsItem;
    const key = `${platform}-${username}-${contentId}`;

    const renderChildNodes = () => {
        if (!childNodes.length) {
            return <Text key={`${key}-${content}`}>{content}</Text>;
        }

        return childNodes.map((childNode, index) => {
            const subKey = `${key}-${index}`;
            const data = childNode.data.trim();

            if (childNode.contentType === 'text') {
                return <Text key={`${subKey}-${data}`}>{data} </Text>;
            }

            if (childNode.username) {
                const username = childNode.data.replace('/', '@').trim();
                return (
                    <Text
                        key={`${subKey}-${username}`}
                        style={styles.contentLink}
                        onPress={() => WebBrowser.openBrowserAsync(`https://twitter.com/${username}`)}
                    >
                        {username}{' '}
                    </Text>
                );
            }

            if (childNode.data.includes('hashtag')) {
                const data = childNode.data.replace('/hashtag/', '#').replace('?src=hash', ' ');

                return (
                    <Text
                        key={`${subKey}-${data}}`}
                        style={styles.contentLink}
                        onPress={() =>
                            WebBrowser.openBrowserAsync(`https://twitter.com/hashtag/${data.slice(1)}`)
                        }
                    >
                        {data}
                    </Text>
                );
            }

            return (
                <Text
                    key={`${subKey}-${childNode.data}`}
                    style={styles.contentLink}
                    onPress={() => WebBrowser.openBrowserAsync(childNode.data)}
                >
                    {childNode.data + ' '}
                </Text>
            );
        });
    };

    return (
        <Card containerStyle={styles.cardContainer}>
            <View testID="card-player-news-item">
                {!hidePlayerInfo && (
                    <>
                        <TouchableOpacity
                            disabled={navigation ? false : true}
                            style={styles.cardHeaderContainer}
                            onPress={() =>
                                navigation.navigate(NavRoutes.PlayerScreenFromNews, {
                                    player,
                                    stackNavRoute: NavRoutes.NewsScreen
                                })
                            }
                        >
                            <View>
                                <Avatar rounded source={{ uri: avatarUrl }} />
                            </View>
                            <View>
                                <Text style={styles.playerText}>{name}</Text>
                                <View style={styles.playerInfoTextContainer}>
                                    <Text style={styles.playerInfoText}>{position}</Text>
                                    <Text style={styles.playerInfoText}> | </Text>
                                    <Text style={styles.playerInfoText}>{getTeamById(teamId).abbrev}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <Divider style={styles.dividerContainer} />
                    </>
                )}

                <View style={styles.cardSourceContainer}>
                    <Icon iconStyle={styles.socialIcon} size={12} type="material-community" name="twitter" />
                    <Text style={styles.sourceText}>{username}</Text>
                    <Text style={styles.timeText}>{`${formatDistance(Date.now(), new Date(time))} ago`}</Text>
                </View>

                <Text style={styles.cardContentContainer}>{renderChildNodes()}</Text>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        borderWidth: 0
    },
    cardHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    playerText: {
        marginLeft: 4,
        color: '#444'
    },
    playerInfoTextContainer: {
        flexDirection: 'row',
        marginLeft: 4
    },
    playerInfoText: {
        fontSize: 10,
        color: 'grey'
    },
    dividerContainer: {
        marginTop: 12,
        marginBottom: 4
    },
    cardSourceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    socialIcon: {
        color: '#1DA1F2'
    },
    sourceText: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic'
    },
    timeText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic'
    },
    cardContentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 10
    },
    contentLink: {
        flexDirection: 'row',
        color: '#1DA1F2'
    }
});

export default React.memo(NewsCard);
