import { Dispatch } from 'redux';

import persourceAPI from '../../../api/persource-api';
import { PlayerActionTypes, Player, PlayerMap } from './types';
import { NewsType } from '../../News/store/types';
import { NavRoutes } from '../../../navigation/navRoutes';

export const fetchPlayers = () => async (dispatch: Dispatch) => {
    dispatch({ type: PlayerActionTypes.FETCH_PLAYERS });

    try {
        const response = await persourceAPI.get('/players');
        const playerMap: PlayerMap = {};

        response.data.forEach((player: Player) => (playerMap[player.id] = player));
        dispatch({ type: PlayerActionTypes.FETCH_PLAYERS_SUCCESS, payload: playerMap });
    } catch (err) {
        dispatch({ type: PlayerActionTypes.FETCH_PLAYERS_FAIL });
    }
};

export const fetchPlayerNews = ({
    page,
    playerId,
    stackNavRoute
}: {
    page: number;
    playerId: string;
    stackNavRoute: NavRoutes;
}) => async (dispatch: Dispatch) => {
    switch (stackNavRoute) {
        case NavRoutes.NewsScreen:
            dispatch({ type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS });

        case NavRoutes.SearchScreen:
            dispatch({ type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH });
    }

    try {
        const response = await persourceAPI.get(
            `/playerNews?playerId=${playerId}&newsType=${NewsType.Individual}&page=${page}`
        );

        switch (stackNavRoute) {
            case NavRoutes.NewsScreen:
                return dispatch({
                    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS_SUCCESS,
                    payload: response.data
                });

            case NavRoutes.SearchScreen:
                return dispatch({
                    type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH_SUCCESS,
                    payload: response.data
                });
        }
    } catch (err) {
        switch (stackNavRoute) {
            case NavRoutes.NewsScreen:
                return dispatch({ type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_NEWS_FAIL });

            case NavRoutes.SearchScreen:
                return dispatch({ type: PlayerActionTypes.FETCH_PLAYER_NEWS_FROM_SEARCH_FAIL });
        }
    }
};

export const refetchPlayerNews = ({
    playerId,
    stackNavRoute
}: {
    playerId: string;
    stackNavRoute: NavRoutes;
}) => async (dispatch: Dispatch) => {
    switch (stackNavRoute) {
        case NavRoutes.NewsScreen:
            dispatch({ type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS });

        case NavRoutes.SearchScreen:
            dispatch({ type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH });
    }

    try {
        const response = await persourceAPI.get(
            `/playerNews?playerId=${playerId}&newsType=${NewsType.Individual}&page=1`
        );

        switch (stackNavRoute) {
            case NavRoutes.NewsScreen:
                return dispatch({
                    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS_SUCCESS,
                    payload: response.data
                });

            case NavRoutes.SearchScreen:
                return dispatch({
                    type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH_SUCCESS,
                    payload: response.data
                });
        }
    } catch (err) {
        switch (stackNavRoute) {
            case NavRoutes.NewsScreen:
                return dispatch({ type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_NEWS_FAIL });

            case NavRoutes.SearchScreen:
                return dispatch({ type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FROM_SEARCH_FAIL });
        }
    }
};
