import { NavRoutes } from './navRoutes';

export function getHeaderTitle(route: any) {
    const routeName = route.state ? route.state.routes[route.state.index].name : undefined;

    switch (routeName) {
        case NavRoutes.AccountScreen:
            return NavRoutes.AccountScreen;
    }
}

export function shouldHeaderBeShown(route: any) {
    const routeName = route.state ? route.state.routes[route.state.index].name : NavRoutes.NewsScreen;

    switch (routeName) {
        case NavRoutes.AccountScreen:
            return true;
        default:
            return false;
    }
}
