import { combineReducers } from 'redux';

import { authReducer } from '../screens/Auth/store/reducer';
import { playerReducer } from '../screens/Player/store/reducer';
import newsReducer from '../screens/News/store/reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    player: playerReducer,
    news: newsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
