// GENERICS
export interface PlayerNews {
    docs: PlayerNewsItem[];
    page: number | null;
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
}
export type PlayerNewsItem = {
    _id: string;
    platform: string;
    username: string;
    contentId: string;
    player: { id: string; teamId: number };
    content: string;
    time: string;
    childNodes: ChildNode[];
};
export enum NewsType {
    Individual, // 0 - Individual Player
    AllTracked, // 1 - All Tracked Players
    All // 2 - All Players
}
export type ChildNode = {
    contentType: string;
    data: string | null;
    text: boolean;
    link: boolean;
    username: boolean;
};

// STATE
export type NewsState = {
    playerNews: PlayerNews;
    isLoading: boolean;
    error: boolean;
};

// ACTION TYPES
export enum NewsActionTypes {
    FETCH_PLAYER_NEWS = 'FETCH_PLAYER_NEWS',
    FETCH_PLAYER_NEWS_SUCCESS = 'FETCH_PLAYER_NEWS_SUCCESS',
    FETCH_PLAYER_NEWS_FAIL = 'FETCH_PLAYER_NEWS_FAIL',
    REFETCH_PLAYER_NEWS = 'REFETCH_PLAYER_NEWS',
    REFETCH_PLAYER_NEWS_SUCCESS = 'REFETCH_PLAYER_NEWS_SUCCESS',
    REFETCH_PLAYER_NEWS_FAIL = 'REFETCH_PLAYER_NEWS_FAIL'
}

// ACTIONS - FETCH_PLAYER_NEWS
export type FetchPlayerNews = {
    type: NewsActionTypes.FETCH_PLAYER_NEWS;
};
export type FetchPlayerNewsSuccess = {
    type: NewsActionTypes.FETCH_PLAYER_NEWS_SUCCESS;
    payload: PlayerNews;
};
export type FetchPlayerNewsFail = {
    type: NewsActionTypes.FETCH_PLAYER_NEWS_FAIL;
    payload: string;
};

// ACTIONS - REFETCH_PLAYER_NEWS
export type RefetchPlayerNews = {
    type: NewsActionTypes.REFETCH_PLAYER_NEWS;
};
export type RefetchPlayerNewsSuccess = {
    type: NewsActionTypes.REFETCH_PLAYER_NEWS_SUCCESS;
    payload: PlayerNews;
};
export type RefetchPlayerNewsFail = {
    type: NewsActionTypes.REFETCH_PLAYER_NEWS_FAIL;
    payload: string;
};

// prettier-ignore
export type NewsActions =
    | FetchPlayerNews
    | FetchPlayerNewsSuccess
    | FetchPlayerNewsFail
    | RefetchPlayerNews
    | RefetchPlayerNewsSuccess
    | RefetchPlayerNewsFail;
