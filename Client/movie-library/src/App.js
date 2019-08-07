import React from 'react';
import { Component } from 'react';
import './App.css';
import Title from './Components/Title';
import DisplayMovies from './Components/DisplayMovies';

class App extends Component {
  render(){
    return(
      <div>
        <Title title="Alexander's Favorite Films List"/>
        <DisplayMovies />
      </div>
    )
  }
}

export default App;
