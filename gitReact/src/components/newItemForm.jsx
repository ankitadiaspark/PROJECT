import React, { Component } from "react";
class newItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Item: "",
      Quantity: "",
      redirectToReferrer: false
  }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }
  handleSubmit = () => {
    console.log("submitted");
    this.props.history.push("/cart");
    console.log('refs',this.refs)
    this.setState({
      Item: this.state.Item.value,
      Quantity: this.state.Quantity.value,
      redirectToReferrer: true
  });
  console.log('item',this.state.Item.value)
   
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add New Item to the Cart</h1>
        <label>
          Item:
          <input type="text" ref={this.input} />
        </label>
        <label>
          Quantity:
          <input type="number" ref={this.input} />
        </label>
        <button 
        // type="submit"
          onClick={() => this.handleSubmit}
          className="btn  btn-info btn-secondary btn-sm"
        >
          Add
        </button>
      </form>
    );
  }
}

export default newItemForm;
