import React, { Component } from 'react';
import './App.css';
import DraggableList from "./Components/DraggableList";
import Builder from "./Components/Builder";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend';
class App extends Component {
  state = {
    searchString: '',
    departments: [
      {
        name: "A",
        id: "1"
      },
      {
        name: "B",
        id: "2"
      },
      {
        name: "C",
        id: "3"
      },
      {
        name: "D",
        id: "4"
      },
      {
        name: "E",
        id: "5"
      },
      {
        name: "F",
        id: "6"
      },
      {
        name: "G",
        id: "7"
      },
      {
        name: "H",
        id: "8"
      },
      {
        name: "I",
        id: "9"
      },
      {
        name: "J",
        id: "10"
      },
      {
        name: "K",
        id: "11"
      },
      {
        name: "L",
        id: "12"
      },
      {
        name: "M",
        id: "13"
      },
      {
        name: "N",
        id: "14"
      },
      {
        name: "0",
        id: "15"
      },
      {
        name: "P",
        id: "16"
      },
      {
        name: "Q",
        id: "17"
      },
      {
        name: "R",
        id: "18"
      },

      {
        name: "S",
        id: "19"
      },
      {
        name: "T",
        id: "20"
      },
      {
        name: "U",
        id: "21"
      },
      {
        name: "V",
        id: "22"
      },
      {
        name: "W",
        id: "23"
      },
      {
        name: "X",
        id: "24"
      },
      {
        name: "Y",
        id: "25"
      },
      {
        name: "Z",
        id: "26"
      },
    ]
  }

  removeItemOnDrop = (id) => {
    this.setState({departments: this.state.departments.filter(item => item.id !== id)});
  }

  handleChange = (e) => {
    if(e.target.value) {
      this.setState({searchString: e.target.value});
    } else {
      this.setState({searchString: ''});
    }
  }

  render() {
    const { departments, searchString } = this.state;
    return (
      <div className="App">
      <DndProvider backend={Backend}>
        <DraggableList searchString={searchString} handleChange={this.handleChange} departments={departments} />
        <Builder searchString={searchString} removeItemOnDrop={this.removeItemOnDrop} />
      </DndProvider>
      </div>
    );
  }
}

export default App;
