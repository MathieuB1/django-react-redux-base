import React from 'react';
import { Route, Switch } from 'react-router';
import { HomeView, HomeViewICO, LoginView, ProtectedView, NotFoundView, FaqView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/index" component={HomeViewICO} />
        <Route path="/login" component={LoginView} />
        <Route path="/protected" component={requireAuthentication(ProtectedView)} />
        <Route path="/faq" component={FaqView} />
        <Route path="*" component={NotFoundView} />
    </Switch>

);
