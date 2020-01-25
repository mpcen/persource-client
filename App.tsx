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
// import SearchScreen from './src/screens/Search/SearchScreen';
// import PlayerScreen from './src/screens/Player/PlayerScreen';

// STORE
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// NAVIGATORS
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
// const SearchStack = createStackNavigator();

// const SearchStackScreen = () => {
//     return (
//         <SearchStack.Navigator headerMode="none">
//             <SearchStack.Screen name={NavRoutes.SearchScreen} component={SearchScreen} />
//             <SearchStack.Screen name={NavRoutes.PlayerScreen} component={PlayerScreen} />
//         </SearchStack.Navigator>
//     );
// };

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
            {/* <Tab.Screen name={NavRoutes.SearchScreen} component={SearchStackScreen} /> */}
            <Tab.Screen name={NavRoutes.NewsScreen} component={NewsScreen} />
            <Tab.Screen name={NavRoutes.AccountScreen} component={AccountScreen} />
        </Tab.Navigator>
    );
};

const App = () => {
    const authReducer = useSelector((state: RootState) => state.auth);
    const { userToken, isResolvingAuth, isPreLoadComplete } = authReducer;

    // debugger;

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

export default () => {
    return (
        <Provider store={store}>
            <NavigationNativeContainer ref={navigationRef}>
                <App />
            </NavigationNativeContainer>
        </Provider>
    );
};
