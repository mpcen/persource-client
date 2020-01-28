import { PlayerNews } from '../../News/store/types';

// GENERICS
export type Player = {
    id: string;
    name: string;
    college: string;
    suffix?: string;
    teamId: number;
    number: string;
    position: string;
    avatarUrl: string;
};
export type PlayerMap = {
    [id: string]: Player;
};

// STATE
export type PlayerState = {
    playerMap: PlayerMap;
    isLoading: boolean;
    playerNews: PlayerNews;
    error: boolean;
};

// ACTION TYPES
export enum PlayerActionTypes {
    FETCH_PLAYERS = 'player/fetchPlayer',
    FETCH_PLAYERS_SUCCESS = 'player/fetchPlayer_success',
    FETCH_PLAYERS_FAIL = 'player/fetchPlayer_fail',
    FETCH_PLAYER_NEWS = 'player/fetchPlayerNews',
    FETCH_PLAYER_NEWS_SUCCESS = 'player/fetchPlayerNews_success',
    FETCH_PLAYER_NEWS_FAIL = 'player/fetchPlayerNews_fail',
    REFETCH_PLAYER_NEWS = 'player/refetchPlayerNews',
    REFETCH_PLAYER_NEWS_SUCCESS = 'player/refetchPlayerNews_success',
    REFETCH_PLAYER_NEWS_FAIL = 'player/refetchPlayerNews_fail',
    CLEAR_PLAYER_NEWS = 'player/clearPlayerNews'
}

// ACTIONS - FETCH_PLAYERS
export type FetchPlayers = {
    type: PlayerActionTypes.FETCH_PLAYERS;
};
export type FetchPlayersSuccess = {
    type: PlayerActionTypes.FETCH_PLAYERS_SUCCESS;
    payload: PlayerMap;
};
export type FetchPlayersFail = {
    type: PlayerActionTypes.FETCH_PLAYERS_FAIL;
};

// ACTIONS - FETCH_PLAYER_NEWS
export type FetchPlayerNews = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS;
};
export type FetchPlayerNewsSuccess = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS_SUCCESS;
    payload: PlayerNews;
};
export type FetchPlayerNewsFail = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FAIL;
};

// ACTIONS - REFETCH_PLAYER_NEWS
export type RefetchPlayerNews = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS;
};
export type RefetchPlayerNewsSuccess = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_SUCCESS;
    payload: PlayerNews;
};
export type RefetchPlayerNewsFail = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FAIL;
    payload: string;
};

// ACTIONS - CLEAR_PLAYER_NEWS
export type ClearPlayerNews = {
    type: PlayerActionTypes.CLEAR_PLAYER_NEWS;
};

// prettier-ignore
export type PlayerActions =
    | FetchPlayers
    | FetchPlayersSuccess
    | FetchPlayersFail
    | FetchPlayerNews
    | FetchPlayerNewsSuccess
    | FetchPlayerNewsFail
    | RefetchPlayerNews
    | RefetchPlayerNewsSuccess
    | RefetchPlayerNewsFail
    | ClearPlayerNews
