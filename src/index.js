import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import App from './components/app';
import RequireAuth from './components/require_auth';
import reducers from './reducers';
import Sign from './components/auth/signin';
import SignOut from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import reduxThunk from 'redux-thunk';
import Welcome from './components/welcome'
import {AUTH_USER} from './actions/types';
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");
if(token){
  store.dispatch({type:AUTH_USER})
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path ="/" component={App}>
        <IndexRoute component={Welcome}/>
          <Route path ="/signin" component={Sign}/>
          <Route path ="/signout" component={SignOut}/>
          <Route path ="/signup" component={Signup} />
          <Route path ="/feature" component={RequireAuth(Feature)} />
        </Route> 
    </Router>
  </Provider>
  , document.querySelector('.container'));
