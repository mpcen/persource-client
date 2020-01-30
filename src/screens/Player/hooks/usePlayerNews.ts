import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { NavRoutes } from '../../../navigation/navRoutes';
import { Player, PlayerActionTypes } from '../store/types';
import { RootState } from '../../../store/rootReducer';
import { refetchPlayerNews } from '../store/actions';
import { News } from '../../News/store/types';

export function usePlayerNews(player: Player, stackNavRoute: NavRoutes): [boolean, News, Dispatch<any>] {
    const dispatch = useDispatch();
    const playerReducer = useSelector((state: RootState) => state.player);

    const {
        isLoadingFromNews,
        isLoadingFromSearch,
        playerNewsFromNews,
        playerNewsFromSearch
    } = playerReducer;

    useEffect(() => {
        dispatch(refetchPlayerNews({ playerId: player.id, stackNavRoute }));

        return () => {
            switch (stackNavRoute) {
                case NavRoutes.NewsScreen:
                    dispatch({ type: PlayerActionTypes.CLEAR_PLAYER_NEWS_FROM_NEWS });
                    break;

                case NavRoutes.SearchScreen:
                    dispatch({ type: PlayerActionTypes.CLEAR_PLAYER_NEWS_FROM_SEARCH });
                    break;
            }
        };
    }, []);

    switch (stackNavRoute) {
        case NavRoutes.NewsScreen:
            return [isLoadingFromNews, playerNewsFromNews, dispatch];

        case NavRoutes.SearchScreen:
            return [isLoadingFromSearch, playerNewsFromSearch, dispatch];
    }
}
