import { NewsActionTypes, NewsState, NewsActions } from './types';

const initialState: NewsState = {
    playerNews: {
        docs: [],
        nextPage: null,
        page: null,
        prevPage: null,
        totalPages: null
    },
    isLoading: true,
    error: false
};

const newsReducer = (state = initialState, action: NewsActions): NewsState => {
    switch (action.type) {
        // FETCH_NEWS
        case NewsActionTypes.FETCH_PLAYER_NEWS:
            return {
                ...state,
                isLoading: true
            };

        case NewsActionTypes.FETCH_PLAYER_NEWS_SUCCESS:
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

        case NewsActionTypes.FETCH_PLAYER_NEWS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true
            };

        // REFETCH_NEWS
        case NewsActionTypes.REFETCH_PLAYER_NEWS:
            return {
                ...state,
                isLoading: true
            };

        case NewsActionTypes.REFETCH_PLAYER_NEWS_SUCCESS:
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

        case NewsActionTypes.REFETCH_PLAYER_NEWS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true
            };

        // DEFAULT
        default:
            return state;
    }
};

export default newsReducer;
