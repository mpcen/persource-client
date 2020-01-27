import { Dispatch } from 'redux';

import persourceAPI from '../../../api/persource-api';
import { PlayerActionTypes, Player, PlayerMap } from './types';

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
