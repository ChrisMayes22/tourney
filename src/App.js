import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './containers/Home/Home';
import CharacterRedirect from './components/CharacterRedirect/CharacterRedirect';
import VotingPage from './containers/VotingPage/VotingPage';
import UploadPage from './containers/UploadPage/UploadPage';
import EliminationPage from './containers/EliminationPage/EliminationPage';
import FinalsPage from './containers/FinalsPage/FinalsPage';
import Winner from './containers/Winner/Winner';
import componentNotFound from './components/ComponentNotFound/ComponentNotFound';
import * as urls from './constants/urls'

class App extends Component {
  render() {

    return (
      <Switch>
        <Route path={urls.VOTING_PAGE} exact component={VotingPage}/>
        <Route path ={urls.ELIMINATION_PAGE} exact component={EliminationPage}/>
        <Route path={urls.NOT_ENOUGH_CHARACTERS} exact component={CharacterRedirect}/>
        <Route path={urls.FINALS_PAGE} exact component={(FinalsPage)}/>
        <Route path={urls.UPLOAD_PAGE} exact component={UploadPage}/>
        <Route path={urls.WINNER_PAGE} exact component={Winner}/>
        <Route path={urls.HOME} exact component={Home}/>
        <Route component={componentNotFound}/>
      </Switch>
    );
  }
}

export default App;
