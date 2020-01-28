import { PlayerActions, PlayerActionTypes, PlayerState } from './types';

const initialState: PlayerState = {
    playerMap: {},
    isLoading: false,
    playerNews: {
        docs: [],
        nextPage: null,
        page: null,
        prevPage: null,
        totalPages: null
    },
    error: false
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

        // FETCH_PLAYER_NEWS
        case PlayerActionTypes.FETCH_PLAYER_NEWS:
            return {
                ...state,
                isLoading: true
            };

        case PlayerActionTypes.FETCH_PLAYER_NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                playerNews: {
                    docs: [...state.playerNews.docs, ...action.payload.docs],
                    page: action.payload.page,
                    nextPage: action.payload.nextPage,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                }
            };

        case PlayerActionTypes.FETCH_PLAYER_NEWS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true
            };

        // REFETCH_NEWS
        case PlayerActionTypes.REFETCH_PLAYER_NEWS:
            return {
                ...state,
                isLoading: true
            };

        case PlayerActionTypes.REFETCH_PLAYER_NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                playerNews: {
                    docs: action.payload.docs,
                    page: action.payload.page,
                    nextPage: action.payload.nextPage,
                    prevPage: action.payload.prevPage,
                    totalPages: action.payload.totalPages
                }
            };

        case PlayerActionTypes.REFETCH_PLAYER_NEWS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true
            };

        case PlayerActionTypes.CLEAR_PLAYER_NEWS:
            return {
                ...state,
                playerNews: {
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
