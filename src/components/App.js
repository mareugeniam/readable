import React, { Component } from 'react';
import { Route,  Switch } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import RootPage from './RootPage';
import PostDetails from './PostDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route exact path="/" component={RootPage}/>
            <Route exact path="/:category" component={RootPage}/>
            <Route exact path="/:category/:id" component={PostDetails}/>
            <Route component={NotFoundPage} />
        </Switch>  
      </div>
    );
  }
}

export default App;
