import React from "react";
import { Route, Switch } from "react-router";

const routeAccessor = (parentRoutePath, route) => {
    const { children, component, exact, path } = route;

    const fullPath = parentRoutePath ? `${parentRoutePath}${path}` : path;

    if (!children.length) {
        return <Route path={fullPath} exact={exact} key={fullPath} component={component} />;
    } else {
        return (
            <Switch key="parent">
                <Route path={fullPath} exact={exact} key={fullPath} component={component} />
                {children.map(childRoute => routeAccessor(path, childRoute))}
            </Switch>
        );
    }
};

export default routeAccessor;