import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import VotingPage from './containers/VotingPage/VotingPage';

class App extends Component {
  toViewerUnits = (height, width) => {
    let maxHeight = document.getElementsByTagName("html")[0].getBoundingClientRect()['height'];
    let maxWidth = document.getElementsByTagName("html")[0].getBoundingClientRect()['width'];
    let vh = (height/maxHeight)*100;
    let vw = (width/maxWidth)*100;
    console.log(`Input item's current vh': ${vh}`);
    console.log(`Input item's current vw': ${vw}`);
    return([vw, vh]);
  }

  render() {

    return (
        <VotingPage/>
    );
  }
}

export default App;
