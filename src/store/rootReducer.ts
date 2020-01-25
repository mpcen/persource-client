import { combineReducers } from 'redux';

import { authReducer } from '../screens/Auth/store/reducer';
// // import newsReducer from '../screens/News/store/reducer';
// // import playersReducer from '../screens/Player/store/reducer';

export const rootReducer = combineReducers({
    auth: authReducer
    // news: newsReducer,
    // players: playersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
