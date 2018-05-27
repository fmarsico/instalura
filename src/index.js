import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';


const PrivateRoute = ({component: Component, ...rest})=>(
    <Route {...rest} render={(props)=>(
        localStorage.getItem('auth-token')!==null ? <Component {...props} />
      : <Redirect to={{
        pathname:'/',
        state: {from: props.location, msg: 'você precisa estar logado para acessar o endereço', isAuthenticated:false }        
        
      }}/>
    )}/>
  )

ReactDOM.render(
(
<Router>
      <div>
          <Route exact path="/" component={Login}/>
          <Route exact path="/logout" component={Logout}/>
          <Route path="/timeline/:login?" component={App} />
          <PrivateRoute exact path="/timeline" component={App}/>          
      </div>
  </Router>
)
    
    , document.getElementById('root'));
registerServiceWorker();
