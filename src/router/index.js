import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeModule from 'views/home';

import PrivateRoute from './PrivateRouteWrapper';

const Router = () => {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={HomeModule} />
            <PrivateRoute path="/home/:id" exact component={HomeModule} />
        </Switch>
    );
};

export default Router;
