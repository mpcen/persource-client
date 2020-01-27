// GENERICS
export type Player = {
    id: string;
    name: string;
    college: string;
    suffix?: string;
    teamId: number;
    number: string;
    position: string;
    avatarUrl: string;
};
export type PlayerMap = {
    [id: string]: Player;
};

// STATE
export type PlayerState = {
    playerMap: PlayerMap;
    isLoading: boolean;
    error: boolean;
};

// ACTION TYPES
export enum PlayerActionTypes {
    FETCH_PLAYERS = 'FETCH_PLAYERS',
    FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS',
    FETCH_PLAYERS_FAIL = 'FETCH_PLAYERS_FAIL'
}

// ACTIONS - FETCH_PLAYERS
export type FetchPlayers = {
    type: PlayerActionTypes.FETCH_PLAYERS;
};
export type FetchPlayersSuccess = {
    type: PlayerActionTypes.FETCH_PLAYERS_SUCCESS;
    payload: PlayerMap;
};
export type FetchPlayersFail = {
    type: PlayerActionTypes.FETCH_PLAYERS_FAIL;
};

// prettier-ignore
export type PlayerActions =
    | FetchPlayers
    | FetchPlayersSuccess
    | FetchPlayersFail;
