import React from "react";
import { RoutePath } from "./constants";
import { RouteLabel } from "./constants";
import {GameSetter, OnlineSetter, OfflineSetter, MainSweeper, CreateRoom, FindRoom} from "../Containers/Minesweeper/Containers/"
import {SignIn, SignUp} from "../Containers/Auth/containers/"


export const privateRouter = userRole =>
    [
        {
            path: RoutePath.ARTICLES,
            exact: true,
            component: () =><div>fd</div>,
            accessLevel: [],
            children: [
                {
                    path: "/:id",
                    exact: true,
                    component: () => <div>User</div>,
                    accessLevel: [],
                    children: [],
                    label: RouteLabel.ARTICLES,
                    icon: null,
                },
            ],
            label: RouteLabel.ARTICLES,
            icon: null,
        },
        {
            path: `${RoutePath.MINESWEEPER}/:token`,
            exact: true,
            component: MainSweeper,
            label: RouteLabel.MINESWEEPER,
            children: [],
        },
        {
            path: RoutePath.GAME_SETTER,
            exact: true,
            component: GameSetter,
            label: RouteLabel.GAME_SETTER,
            children: [],
        },
        {
            path: RoutePath.ONLINE_SETTER,
            exact: true,
            component: OnlineSetter,
            label: RouteLabel.ONLINE_SETTER,
            children: [],
        },
        {
            path: RoutePath.OFFLINE_SETTER,
            exact: true,
            component: OfflineSetter,
            label: RouteLabel.OFFLINE_SETTER,
            children: [],
        },
        {
            path: RoutePath.FIND_ROOM,
            exact: true,
            component: FindRoom,
            label: RouteLabel.FIND_ROOM,
            children: [],
        },
        {
            path: RoutePath.CREATE_ROOM,
            exact: true,
            component: CreateRoom,
            label: RouteLabel.CREATE_ROOM,
            children: [],
        },
    ].filter(route => (userRole ? route.accessLevel.includes(userRole) : true));

export const publicRouter = [
    {
        path: RoutePath.SIGN_IN,
        exact: true,
        component: SignIn,
        label: RouteLabel.SIGN_IN,
        children: [],
    },
    {
        path: RoutePath.SIGN_UP,
        exact: true,
        component: SignUp,
        children: [],
        label: RouteLabel.SIGN_UP,
    },

];