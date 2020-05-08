import React, { Component } from 'react';
import './App.css';
import DraggableList from "./Components/DraggableList";
import Builder from "./Components/Builder";
import { DndProvider } from 'react-dnd'
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import Backend from 'react-dnd-html5-backend'
const chartSimple = {
  offset: {
    x: 0,
    y: 0
  },
  nodes: {
    node1: {
      id: "node1",
      type: "output-only",
      position: {
        x: 300,
        y: 100
      },
      ports: {
        port1: {
          id: "port1",
          type: "output",
          properties: {
            value: "yes"
          }
        },
        port2: {
          id: "port2",
          type: "output",
          properties: {
            value: "no"
          }
        }
      }
    },
    node2: {
      id: "node2",
      type: "input-output",
      position: {
        x: 300,
        y: 300
      },
      ports: {
        port1: {
          id: "port1",
          type: "input"
        },
        port2: {
          id: "port2",
          type: "output"
        }
      }
    },
  },
  links: {
    link1: {
      id: "link1",
      from: {
        nodeId: "node1",
        portId: "port2"
      },
      to: {
        nodeId: "node2",
        portId: "port1"
      },
    },
  },
  selected: {},
  hovered: {}
};
class App extends Component {
  state = {
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
      }
    ],
    chart: chartSimple
  }

  removeItemOnDrop = (id) => {
    this.setState({departments: this.state.departments.filter(item => item.id !== id)});
  }


  render() {
    const { departments, chart } = this.state;
    const stateActions = (data) => {
      console.log(data);
      this.setState({chart: data});
    }
    return (
      <div className="App">
      <DndProvider backend={Backend}>
        <DraggableList departments={departments} />
        <Builder removeItemOnDrop={this.removeItemOnDrop} />
      </DndProvider>
      {/* <FlowChartWithState initialValue={chart} callback={stateActions} /> */}
      </div>
    );
  }
}

export default App;
