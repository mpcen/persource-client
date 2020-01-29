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
    isLoadingFromNews: boolean;
    isLoadingFromSearch: boolean;
    playerNewsFromNews: PlayerNews;
    playerNewsFromSearch: PlayerNews;
    error: boolean;
    errorFromNews: boolean;
    errorFromSearch: boolean;
};

// ACTION TYPES
export enum PlayerActionTypes {
    FETCH_PLAYERS = 'player/fetchPlayer',
    FETCH_PLAYERS_SUCCESS = 'player/fetchPlayer_success',
    FETCH_PLAYERS_FAIL = 'player/fetchPlayer_fail',
    FETCH_PLAYER_NEWS_FROM_NEWS = 'player/fetchPlayerNewsFromNews',
    FETCH_PLAYER_NEWS_FROM_NEWS_SUCCESS = 'player/fetchPlayerNewsfromNews_success',
    FETCH_PLAYER_NEWS_FROM_NEWS_FAIL = 'player/fetchPlayerNewsfromNews_fail',
    FETCH_PLAYER_NEWS_FROM_SEARCH = 'player/fetchPlayerNewsFromSearch',
    FETCH_PLAYER_NEWS_FROM_SEARCH_SUCCESS = 'player/fetchPlayerNewsFromSearch_success',
    FETCH_PLAYER_NEWS_FROM_SEARCH_FAIL = 'player/fetchPlayerNewsFromSearch_fail',
    REFETCH_PLAYER_NEWS_FROM_NEWS = 'player/refetchPlayerNewsFromNews',
    REFETCH_PLAYER_NEWS_FROM_NEWS_SUCCESS = 'player/refetchPlayerNewsFromNews_success',
    REFETCH_PLAYER_NEWS_FROM_NEWS_FAIL = 'player/refetchPlayerNewsFromNews_fail',
    REFETCH_PLAYER_NEWS_FROM_SEARCH = 'player/refetchPlayerNewsFromSearch',
    REFETCH_PLAYER_NEWS_FROM_SEARCH_SUCCESS = 'player/refetchPlayerNewsFromSearch_success',
    REFETCH_PLAYER_NEWS_FROM_SEARCH_FAIL = 'player/refetchPlayerNewsFromSearch_fail',
    CLEAR_PLAYER_NEWS_FROM_NEWS = 'player/clearPlayerNewsFromNews',
    CLEAR_PLAYER_NEWS_FROM_SEARCH = 'player/clearPlayerNewsFromSearch'
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

// ACTIONS - FETCH_PLAYER_NEWS_FROM_NEWS
export type FetchPlayerNewsFromNews = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS;
};
export type FetchPlayerNewsFromNewsSuccess = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS_SUCCESS;
    payload: PlayerNews;
};
export type FetchPlayerNewsFromNewsFail = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS_FAIL;
};

// ACTIONS - FETCH_PLAYER_NEWS_FROM_SEARCH
export type FetchPlayerNewsFromSearch = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH;
};
export type FetchPlayerNewsFromSearchSuccess = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH_SUCCESS;
    payload: PlayerNews;
};
export type FetchPlayerNewsFromSearchFail = {
    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH_FAIL;
};

// ACTIONS - REFETCH_PLAYER_NEWS_FROM_NEWS
export type RefetchPlayerNewsFromNews = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS;
};
export type RefetchPlayerNewsFromNewsSuccess = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS_SUCCESS;
    payload: PlayerNews;
};
export type RefetchPlayerNewsFromNewsFail = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS_FAIL;
    payload: string;
};

// ACTIONS - REFETCH_PLAYER_NEWS_FROM_NEWS
export type RefetchPlayerNewsFromSearch = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH;
};
export type RefetchPlayerNewsFromSearchSuccess = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH_SUCCESS;
    payload: PlayerNews;
};
export type RefetchPlayerNewsFromSearchFail = {
    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH_FAIL;
    payload: string;
};

// ACTIONS - CLEAR_PLAYER_NEWS_FROM_NEWS
export type ClearPlayerNewsFromNews = {
    type: PlayerActionTypes.CLEAR_PLAYER_NEWS_FROM_NEWS;
};

// ACTIONS - CLEAR_PLAYER_NEWS_FROM_SEARCH
export type ClearPlayerNewsFromSearch = {
    type: PlayerActionTypes.CLEAR_PLAYER_NEWS_FROM_SEARCH;
};

// prettier-ignore
export type PlayerActions =
    | FetchPlayers
    | FetchPlayersSuccess
    | FetchPlayersFail
    | FetchPlayerNewsFromNews
    | FetchPlayerNewsFromNewsSuccess
    | FetchPlayerNewsFromNewsFail
    | FetchPlayerNewsFromSearch
    | FetchPlayerNewsFromSearchSuccess
    | FetchPlayerNewsFromSearchFail
    | RefetchPlayerNewsFromNews
    | RefetchPlayerNewsFromNewsSuccess
    | RefetchPlayerNewsFromNewsFail
    | RefetchPlayerNewsFromSearch
    | RefetchPlayerNewsFromSearchSuccess
    | RefetchPlayerNewsFromSearchFail
    | ClearPlayerNewsFromNews
    | ClearPlayerNewsFromSearch
