import React, { Component } from 'react';
import GridCustomization from './GridCustomization';

class HomePage extends Component {
  render() {
    return (
      <div>
        Home Page!
        <GridCustomization parentTab="HOME" />
      </div>
    );
  }
}

export default HomePage;

//TODO
//add homepage text and fluff
//styling
// add user-select: none to text stuff
// add warning about using B0 on other boundless apps
