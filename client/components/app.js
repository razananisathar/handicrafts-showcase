import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Solo Project React App title',
      data: [],
    };
  }

  componentDidMount() {
    fetch('/api')
      .then((data) => data.json())
      .then((results) => {
        console.log(results);
        this.setState({
          data: [...results.products],
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <ul>{this.state.data}</ul>
      </div>
    );
  }
}

export default App;
