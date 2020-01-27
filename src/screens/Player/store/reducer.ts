import { PlayerActions, PlayerActionTypes, PlayerState } from './types';

const initialState: PlayerState = {
    playerMap: {},
    isLoading: false,
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

        // DEFAULT
        default:
            return state;
    }
};
