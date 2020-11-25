import React from "react";
import { Switch } from "react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { privateRouter, publicRouter } from "./routers";
import routeAccessor from "./utils/routerAssessors";
import  Main  from "./Containers/Main/containers/Main/Main";

export default () => {

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#556cd6",
                default: "#ccc",
            },
            secondary: {
                main: "#19857b",
            },
            error: {
                main: red.A400,
            },
            background: {
                default: "#fff",
            },
        },
    });
    return (
        <MuiThemeProvider theme={theme}>
            <Switch>
                {publicRouter.map(route => routeAccessor(null, route))}
                <Main>{privateRouter().map(route => routeAccessor(null, route))}</Main>
            </Switch>
        </MuiThemeProvider>

    );
};