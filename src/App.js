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

class App extends Component {
  render() {

    return (
      <Switch>
        <Route path='/voting-page' exact component={VotingPage}/>
        <Route path ='/elimination-page' exact component={EliminationPage}/>
        <Route path='/not-enough-characters' exact component={CharacterRedirect}/>
        <Route path='/finals' exact component={(FinalsPage)}/>
        <Route path='/upload-page'exact component={UploadPage}/>
        <Route path='/winner'exact component={Winner}/>
        <Route path='/' exact component={Home}/>
        <Route component={() => <h1>404: Page Not Found</h1>}/>
      </Switch>
    );
  }
}

export default App;
