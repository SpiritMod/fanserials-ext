import React, { Component } from 'react';
import './Search.scss';
//import utf8_decode from '../windows-1251';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      status: false
    };
  }


  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  handleOpen = (event) => {
    event.preventDefault();
    this.setState({status: !this.state.status});
    setTimeout(() => {
      this.searchInput.focus();
    },400);
    if (this.state.status) {

    } else {
      this.setState({value: ''});
    }

  };

  handleSubmit = (event) => {
    const link = this.props.data;
    let searchText = this.state.value;
    let url = link+"search/?query=" + searchText;
    window.open(url, "_blank");
    event.preventDefault();
  };

  render() {
    return (
      <div className={`search ${this.state.status ? 'is-opened' : ''}`}>
        <a href="#" onClick={this.handleOpen} className="btn-show"><span className="icon-search"></span></a>
        <form onSubmit={this.handleSubmit}>
          <input ref={(input) => { this.searchInput = input; }} type="text" value={this.state.value} onChange={this.handleChange} />
          <button className="btn-submit" type="submit"><span className="icon-search"></span></button>
        </form>
      </div>
    );
  }
}

export default Search;
