import { PlayerActions, PlayerActionTypes, PlayerState } from './types';

const initialState: PlayerState = {
    playerMap: {},
    isLoading: false,
    isLoadingFromNews: true,
    isLoadingFromSearch: true,
    playerNewsFromNews: {
        docs: [],
        nextPage: null,
        page: null,
        prevPage: null,
        totalPages: null
    },
    playerNewsFromSearch: {
        docs: [],
        nextPage: null,
        page: null,
        prevPage: null,
        totalPages: null
    },
    error: false,
    errorFromNews: false,
    errorFromSearch: false
};

export const playerReducer = (state = initialState, action: PlayerActions): PlayerState => {
    switch (action.type) {
        // FETCH_PLAYERS
        case PlayerActionTypes.FETCH_PLAYERS:
            return {
                ...state,
                isLoading: true
            };

        case PlayerActionTypes.FETCH_PLAYERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                playerMap: action.payload
            };

        case PlayerActionTypes.FETCH_PLAYERS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true
            };

        // FETCH_PLAYER_NEWS_FROM_NEWS
        case PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS:
            return {
                ...state,
                isLoadingFromNews: true
            };

        case PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS_SUCCESS:
            return {
                ...state,
                isLoadingFromNews: false,
                errorFromNews: false,
                playerNewsFromNews: {
                    docs: [...state.playerNewsFromNews.docs, ...action.payload.docs],
                    page: action.payload.page,
                    nextPage: action.payload.nextPage,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                }
            };

        case PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS_FAIL:
            return {
                ...state,
                isLoadingFromNews: false,
                errorFromNews: true
            };

        // FETCH_PLAYER_NEWS_FROM_SEARCH
        case PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH:
            return {
                ...state,
                isLoadingFromSearch: true
            };

        case PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH_SUCCESS:
            return {
                ...state,
                isLoadingFromSearch: false,
                errorFromSearch: false,
                playerNewsFromSearch: {
                    docs: [...state.playerNewsFromNews.docs, ...action.payload.docs],
                    page: action.payload.page,
                    nextPage: action.payload.nextPage,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                }
            };

        case PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH_FAIL:
            return {
                ...state,
                isLoadingFromSearch: false,
                errorFromSearch: true
            };

        // REFETCH_NEWS_FROM_NEWS
        case PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS:
            return {
                ...state,
                isLoadingFromNews: true
            };

        case PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS_SUCCESS:
            return {
                ...state,
                isLoadingFromNews: false,
                errorFromNews: false,
                playerNewsFromNews: {
                    docs: action.payload.docs,
                    page: action.payload.page,
                    nextPage: action.payload.nextPage,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                }
            };

        case PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS_FAIL:
            return {
                ...state,
                isLoadingFromNews: false,
                errorFromNews: true
            };

        // REFETCH_NEWS_FROM_SEARCH
        case PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH:
            return {
                ...state,
                isLoadingFromSearch: true
            };

        case PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH_SUCCESS:
            return {
                ...state,
                isLoadingFromSearch: false,
                errorFromSearch: false,
                playerNewsFromSearch: {
                    docs: action.payload.docs,
                    page: action.payload.page,
                    nextPage: action.payload.nextPage,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                }
            };

        case PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH_FAIL:
            return {
                ...state,
                isLoadingFromSearch: false,
                errorFromSearch: true
            };

        // CLEAR_PLAYER_NEWS_FROM_NEWS
        case PlayerActionTypes.CLEAR_PLAYER_NEWS_FROM_NEWS:
            return {
                ...state,
                playerNewsFromNews: {
                    docs: [],
                    nextPage: null,
                    page: null,
                    prevPage: null,
                    totalPages: null
                }
            };

        // CLEAR_PLAYER_NEWS_FROM_SEARCJ
        case PlayerActionTypes.CLEAR_PLAYER_NEWS_FROM_SEARCH:
            return {
                ...state,
                playerNewsFromSearch: {
                    docs: [],
                    nextPage: null,
                    page: null,
                    prevPage: null,
                    totalPages: null
                }
            };

        // DEFAULT
        default:
            return state;
    }
};
