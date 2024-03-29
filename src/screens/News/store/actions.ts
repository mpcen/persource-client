import { Dispatch } from 'redux';

import persourceAPI from '../../../api/persource-api';
import { NewsActionTypes, NewsType } from './types';

export const fetchNews = ({ page }: { page: number }) => async (dispatch: Dispatch) => {
    dispatch({ type: NewsActionTypes.FETCH_NEWS });

    try {
        const response = await persourceAPI.get(`/playerNews?newsType=${NewsType.All}&page=${page}`);
        dispatch({ type: NewsActionTypes.FETCH_NEWS_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({ type: NewsActionTypes.FETCH_NEWS_FAIL });
    }
};

export const refetchNews = () => async (dispatch: Dispatch) => {
    dispatch({ type: NewsActionTypes.REFETCH_NEWS });

    try {
        const response = await persourceAPI.get(`/playerNews?newsType=${NewsType.All}&page=${1}`);
        dispatch({ type: NewsActionTypes.REFETCH_NEWS_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({ type: NewsActionTypes.REFETCH_NEWS_FAIL });
    }
};
