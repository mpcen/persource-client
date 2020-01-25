import * as React from 'react';
import { NavRoutes } from './navRoutes';

export const navigationRef = React.createRef<any>();

export function navigate(name: NavRoutes, params?: any) {
    navigationRef.current && navigationRef.current.navigate(name, params);
}
