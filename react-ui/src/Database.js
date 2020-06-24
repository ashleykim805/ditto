import React, { Component } from 'react';

class Database extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      tableData:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData () {
    await fetch("/db/test_table")
    .then(res => res.json())
    .then(res => this.setState({
      tableData: res
    }))
  }

  handleChange(event) {
    const key = event.target.name;
    this.setState({
      [key]: event.target.value
    });
  }

  async handleSubmit(event) {
    // don't let the form do what it usually does
    event.preventDefault();
    // this is the entry we're be sending over the the DB
    const newEntry = {
      id: this.state.id,
      name: this.state.name
    };
    console.log(JSON.stringify(newEntry));
    // okay now post to db.js
    await fetch("db/add_to_test_table", {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(newEntry),
    });
    // calling this to update the db results
    this.fetchData();
  }

  render() {
    return (
      <div>
        database page!
        <form action="/db/add_to_test_table" method="POST" onSubmit={this.handleSubmit}>
          <label>id
            <input type="number" name="id" onChange={this.handleChange}/>
          </label>
          <label>name
            <input type="text" name="name" onChange={this.handleChange}/>
          </label>
          <input type="submit"/>
        </form>
        <h3>test_table do be looking like this</h3>
        { JSON.stringify(this.state.tableData) }
      </div>
    );
  }
}

export default Database;
