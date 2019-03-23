import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pagination from './components/Pagination';
import OurTable from './components/Table';

class App extends Component {

  constructor() {
    super();

    const exampleItems = [...Array(150).keys()].map(i =>({
      id: (i+1), name: 'Item ' + (i+1)
    }));

    this.state ={
      exampleItems: exampleItems,
      pageOfItems: []
    }

    this.onPageChange = this.onPageChange.bind(this);
  }

  // will update the stes with new page of items and stuff
  onPageChange(pageOfItems){
    this.setState({
      pageOfItems: pageOfItems
    })
  }
 

  render() {
    // const pageOfItems = this.state;
    return (
      <div className="App">
          <h1>Pageination example</h1>
          <div class ="text-center"> 
              {/* {this.state.pageOfItems.map(item => 
                <div key={item.id}> {item.name}</div>
                
              )} */}

          <OurTable items={this.state.pageOfItems} />

          <Pagination items={this.state.exampleItems} onPageChange={this.onPageChange} />
          
            
          </div>

      </div>
    );
  }
}

export default App;
