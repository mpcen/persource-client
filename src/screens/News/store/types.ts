// GENERICS
export interface News {
    docs: NewsItem[];
    page: number | null;
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
}
export type NewsItem = {
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
    playerNews: News;
    isLoading: boolean;
    error: boolean;
};

// ACTION TYPES
export enum NewsActionTypes {
    FETCH_NEWS = 'news/fetchNews',
    FETCH_NEWS_SUCCESS = 'news/fetchNews_success',
    FETCH_NEWS_FAIL = 'news/fetchNews_fail',
    REFETCH_NEWS = 'news/refetchNews',
    REFETCH_NEWS_SUCCESS = 'news/refetchNews_success',
    REFETCH_NEWS_FAIL = 'news/refetchNews_fail'
}

// ACTIONS - FETCH_NEWS
export type FetchNews = {
    type: NewsActionTypes.FETCH_NEWS;
};
export type FetchNewsSuccess = {
    type: NewsActionTypes.FETCH_NEWS_SUCCESS;
    payload: News;
};
export type FetchNewsFail = {
    type: NewsActionTypes.FETCH_NEWS_FAIL;
    payload: string;
};

// ACTIONS - REFETCH_NEWS
export type RefetchNews = {
    type: NewsActionTypes.REFETCH_NEWS;
};
export type RefetchNewsSuccess = {
    type: NewsActionTypes.REFETCH_NEWS_SUCCESS;
    payload: News;
};
export type RefetchNewsFail = {
    type: NewsActionTypes.REFETCH_NEWS_FAIL;
    payload: string;
};

// prettier-ignore
export type NewsActions =
    | FetchNews
    | FetchNewsSuccess
    | FetchNewsFail
    | RefetchNews
    | RefetchNewsSuccess
    | RefetchNewsFail;
