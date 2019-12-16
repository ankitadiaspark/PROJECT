import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
// import newItemForm from './components/newItemForm';
import "./App.css";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 }
    ]
  };

  constructor(props) {
    super(props);
    console.log("App-Constructor", this.props);
  }

  componentDidMount() {
    console.log("App-Mounted");
  }

  handleAdd = () => {
   console.log('add new Item');
  //  const Item = ReactDOM.findDOMNode(this._ItemInput).value;
  //  const Quantity = ReactDOM.findDOMNode(this._QuantityInput).value;
  //  const errors = validate(Item,Quantity);
  //   if (errors.length > 0) {
  //     this.setState({ errors });
  //     return;
  //   }
   this.props.history.push('/newItem');
  };


  handleIncrement = counter => {
    console.log(counter);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
    console.log(this.state.counters[index]);
  };


  handleDecrement = decount => {
    console.log(decount);
    const counters = [...this.state.counters];
    const index = counters.indexOf(decount);
    counters[index] = { ...decount };
    counters[index].value--;
    this.setState({ counters });
    console.log(this.state.counters[index]);
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    console.log("event handler called", counterId);
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };
  render() {
    console.log("App-rendered");
    return (
      <React.Fragment>
        <NavBar
        
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onAdd={this.handleAdd}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            // onSubmit={this.handleSubmit}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
