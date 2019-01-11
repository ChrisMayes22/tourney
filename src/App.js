import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import CharacterRedirect from './components/CharacterRedirect/CharacterRedirect';
import VotingPage from './containers/VotingPage/VotingPage';
import UploadPage from './containers/UploadPage/UploadPage';

class App extends Component {
  render() {

    return (
      <Switch>
        <Route path='/voting-page' component={VotingPage}/>
        <Route path='/upload-page' component={UploadPage}/>
        <Route path='/not-enough-characters' component={CharacterRedirect}/>
        <Route path='/' component={Home}/>
      </Switch>
    );
  }
}

export default App;
