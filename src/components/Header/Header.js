import React, { Component } from 'react';
import './Header.scss';
import Search from '../Search/Search';
//import config from '../../config';

class Header extends Component {

  render() {
    const host = this.props.data.slice(0, -1).split('.')[1];

    return (
      <header className="header">
        <div className="header__wrapper">
          <div className="header__logo">
            <a href={this.props.data} target="_blank"><img src="img/logo.png" alt="FanSerials"/><span>fanserials.<span className="orange">{host}</span></span></a>
          </div>
          <Search data={this.props.data}/>
        </div>
      </header>
    );
  }
}

export default Header;