import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      items_to_show: [],
      item_index: 0,
    };
    this.pickRandomItem = this.pickRandomItem.bind(this);
    this.pickMultipleItems = this.pickMultipleItems.bind(this);
    this.setItemIndex = this.setItemIndex.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    fetch("http://j0.wlmediahub.com/App_Themes/api/test/photos.js")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({ items: data.photo });
      })
      .then(() => {
        this.pickMultipleItems();
      });
  }

  componentDidMount() {
    this.loadData();
  }

  pickRandomItem() {
    const index = Math.floor(Math.random() * this.state.items.length);
    const item = {
      ...this.state.items[index],
    };
    this.setState((prevState, props) => {
      return {
        items: prevState.items.filter((itemA) => itemA.id !== item.id),
      };
    });
    console.log(this.state.items.length);
    return item;
  }

  pickMultipleItems() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(this.pickRandomItem());
    }

    this.setState({
      items_to_show: items,
    });
  }

  setItemIndex(e) {
    this.setState({
      item_index: e.target.value,
    });
  }

  render() {
    const item = this.state.items_to_show[this.state.item_index]
      ? this.state.items_to_show[this.state.item_index]
      : {};
    return (
      <div className="App">
        <div className="item">
          <img src={item.img} />
          <div className="title">{item.title}</div>
          <div className="description">
            {item.description || "There is no description"}
          </div>
        </div>

        <div className="flex-nav">
          <div className={`index-${this.state.item_index}`}>
            <button onClick={this.setItemIndex} value={0}>
              1
            </button>
            <button onClick={this.setItemIndex} value={1}>
              2
            </button>
            <button onClick={this.setItemIndex} value={2}>
              3
            </button>
            <button onClick={this.setItemIndex} value={3}>
              4
            </button>
            <button onClick={this.setItemIndex} value={4}>
              5
            </button>
          </div>
          <button onClick={this.pickMultipleItems}>shuffle</button>
        </div>
      </div>
    );
  }
}

export default App;
