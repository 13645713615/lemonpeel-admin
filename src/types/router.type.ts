import { Ref } from "vue";
import { RouteLocationNormalizedLoaded, RouteRecordRedirectOption, RouteComponent, RouteMeta as IRouteMeta, RouteRecordName, _RouteRecordBase, PathParserOptions, NavigationGuardWithThis } from "vue-router";

export interface IHistory {
    name?: RouteRecordName;
    index: number;
    fullPath: string;
    path: string;
    title?: string;
    noCache?: boolean;
}

export interface Route {
    path?: string;
    name?: string;
    meta?: Record<string, any>;
    params?: Record<string, any>;
    query?: Record<string, any>;
    redirect?: RouteRecordRedirectOption;
}

// extends Router
export interface AppRouter {
    route: Ref<RouteLocationNormalizedLoaded>;
    to(route: any | Route, isReplace?: boolean): void;
    query(name: string): RoutesRaw | undefined;
    history: readonly IHistory[];
}

type Lazy<T> = () => Promise<T>;
type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;

export interface RouteMeta extends IRouteMeta {
    hidden?: boolean;
    noCache?: boolean;
    history?: boolean;
    title: string;
    icon?: string;
    breadcrumb?: boolean;
    visitor?: boolean;
    href?: boolean;
    transition?: string | boolean
}

export interface Routes extends PathParserOptions {
    path: string;
    redirect?: RouteRecordRedirectOption;
    children?: RoutesRaw[];
    alias?: string | string[];
    name?: RouteRecordName;
    meta?: RouteMeta;
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
    component?: RawRouteComponent;
}

export type RoutesRaw = RouteRecordMultipleViews | RouteRecordSingleView | RouteRecordRedirect
export interface TRoutesMenu extends Routes {
    component: any;
    children?: any[];
}

interface RouteRecordSingleView extends Routes {
    name: RouteRecordName;
    component: RawRouteComponent;
    components?: never;
    props?: never;
}

interface RouteRecordMultipleViews extends Routes {
    name: RouteRecordName;
    components: Record<string, RawRouteComponent>;
    component?: never;
    props?: Record<string, never> | boolean;
}

interface RouteRecordRedirect extends Routes {
    redirect: RouteRecordRedirectOption;
    component?: never;
    components?: never;
}