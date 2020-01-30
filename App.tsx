import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationNativeContainer } from '@react-navigation/native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { rootReducer, RootState } from './src/store/rootReducer';

import { navigationRef } from './src/navigation/navigationRef';
import { NavRoutes } from './src/navigation/navRoutes';
import { getHeaderTitle, shouldHeaderBeShown } from './src/navigation/navUtils';

import SignupScreen from './src/screens/Auth/Signup/SignupScreen';
import SigninScreen from './src/screens/Auth/Signin/SigninScreen';
import NewsScreen from './src/screens/News/NewsScreen';
import AccountScreen from './src/screens/Account/AccountScreen';
import ResolveAuthScreen from './src/screens/Auth/ResolveAuth/ResolveAuthScreen';
import PreLoadScreen from './src/screens/Auth/PreLoad/PreLoadScreen';
import ResetPasswordScreen from './src/screens/Auth/ResetPassword/ResetPasswordScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import PlayerScreen from './src/screens/Player/PlayerScreen';

import { Player } from './src/screens/Player/store/types';

// NAVIGATION TYPES
export type NewsStackParamList = {
    [NavRoutes.NewsScreen]: undefined;
    [NavRoutes.PlayerScreenFromNews]: { player: Player; stackNavRoute: NavRoutes };
};
export type SearchStackParamList = {
    [NavRoutes.SearchScreen]: undefined;
    [NavRoutes.PlayerScreenFromSearch]: { player: Player; stackNavRoute: NavRoutes };
};

// NAVIGATORS
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const NewsStack = createStackNavigator<NewsStackParamList>();
const SearchStack = createStackNavigator<SearchStackParamList>();

const NewsStackScreen = () => {
    return (
        <NewsStack.Navigator headerMode="none">
            <NewsStack.Screen name={NavRoutes.NewsScreen} component={NewsScreen} />
            <NewsStack.Screen name={NavRoutes.PlayerScreenFromNews} component={PlayerScreen} />
        </NewsStack.Navigator>
    );
};

const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator headerMode="none">
            <SearchStack.Screen name={NavRoutes.SearchScreen} component={SearchScreen} />
            <SearchStack.Screen name={NavRoutes.PlayerScreenFromSearch} component={PlayerScreen} />
        </SearchStack.Navigator>
    );
};

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name={NavRoutes.SigninScreen} component={SigninScreen} />
            <AuthStack.Screen name={NavRoutes.SignupScreen} component={SignupScreen} />
            <AuthStack.Screen name={NavRoutes.ResetPasswordScreen} component={ResetPasswordScreen} />
        </AuthStack.Navigator>
    );
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={NavRoutes.NewsScreen} component={NewsStackScreen} />
            <Tab.Screen name={NavRoutes.SearchScreen} component={SearchStackScreen} />
            <Tab.Screen name={NavRoutes.AccountScreen} component={AccountScreen} />
        </Tab.Navigator>
    );
};

// APP
const App = () => {
    const authReducer = useSelector((state: RootState) => state.auth);
    const { userToken, isResolvingAuth, isPreLoadComplete } = authReducer;

    return (
        <Stack.Navigator headerMode="float">
            {isResolvingAuth ? (
                // RESOLVE_AUTH
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={NavRoutes.ResolveAuthScreen}
                    component={ResolveAuthScreen}
                />
            ) : userToken === null ? (
                // AUTHFLOW
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={NavRoutes.AuthFlow}
                    component={AuthStackNavigator}
                />
            ) : isPreLoadComplete ? (
                // MAINFLOW
                <Stack.Screen
                    options={({ route }) => ({
                        headerShown: shouldHeaderBeShown(route),
                        title: getHeaderTitle(route)
                    })}
                    name={NavRoutes.MainFlow}
                    component={MainTabNavigator}
                />
            ) : (
                // PRELOAD
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={NavRoutes.PreLoadScreen}
                    component={PreLoadScreen}
                />
            )}
        </Stack.Navigator>
    );
};

// STORE
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default () => {
    return (
        <Provider store={store}>
            <NavigationNativeContainer ref={navigationRef}>
                <App />
            </NavigationNativeContainer>
        </Provider>
    );
};
