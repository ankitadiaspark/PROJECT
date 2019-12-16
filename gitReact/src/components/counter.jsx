import React, { Component } from "react";
class Counter extends Component {
  // state={
  //     value:this.props.counter.value
  //     // tags:['tag1','tag2','tag3']

  // };

  // constructor(){
  //     super();
  //     // console.log("constructor",this)
  //     this.handleIncrement=this.handleIncrement.bind(this)
  // }
  // renderTags(){
  //     if(this.state.tags.length===0) return <p>Therre are no tags!</p>;

  //     return <ul>
  //     {this.state.tags.map(tag=><li key={tag}>{tag}</li>)}
  // </ul>
  // }

  // handleIncrement= product =>{
  //     console.log(product);
  //     // console.log("Incrememt clicked",this);

  //     this.setState({value:this.state.value+1})
  // };

  // doHandleIncrement=()=>{
  //     this.handleIncrement({id:1})
  // }
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      //ajax call and get data from the server
    }
  }

  componentWillUnmount() {
    console.log("counter-unmount");
  }
  render() {
    console.log("Counter-Rendered");
    //   console.log('props',this.props);
    return (
      <div>
        {/* <span><h3>Item</h3></span> */}
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        {/* <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
         -
        </button> */}

        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm"
        >
          {/* <i class="fa fa-trash"></i> */}
          Delete
        </button>

        {/* {this.state.tags.length===0 && "please create a new tag!"}
            {this.renderTags()} */}
        {/* <ul>
         {this.state.tags.map(tag=><li key={tag}>{tag}</li>)}
     </ul> */}
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props.counter;
    return count === 0 ? "zero" : count;
  }

  getDecrementButton() {
    let classes = "btn btn-sm btn-";
    classes += this.props.counter.value > 1 ? "secondary" : "danger";
    return classes;
  }
}

export default Counter;
