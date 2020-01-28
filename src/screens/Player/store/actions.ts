import { Dispatch } from 'redux';

import persourceAPI from '../../../api/persource-api';
import { PlayerActionTypes, Player, PlayerMap } from './types';
import { NewsType } from '../../News/store/types';

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

export const fetchPlayerNews = ({ page, playerId }: { page: number; playerId: string }) => async (
    dispatch: Dispatch
) => {
    dispatch({ type: PlayerActionTypes.FETCH_PLAYER_NEWS });

    try {
        const response = await persourceAPI.get(
            `/playerNews?playerId=${playerId}&newsType=${NewsType.Individual}&page=${page}`
        );
        dispatch({ type: PlayerActionTypes.FETCH_PLAYER_NEWS_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({
            type: PlayerActionTypes.FETCH_PLAYER_NEWS_FAIL
        });
    }
};

export const refetchPlayerNews = ({ playerId }: { playerId: string }) => async (dispatch: Dispatch) => {
    dispatch({ type: PlayerActionTypes.REFETCH_PLAYER_NEWS });

    try {
        const response = await persourceAPI.get(
            `/playerNews?playerId=${playerId}&newsType=${NewsType.Individual}&page=1`
        );
        dispatch({ type: PlayerActionTypes.REFETCH_PLAYER_NEWS_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({
            type: PlayerActionTypes.REFETCH_PLAYER_NEWS_FAIL
        });
    }
};
