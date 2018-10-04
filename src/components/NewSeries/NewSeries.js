import React, { Component } from 'react';
import './NewSeries.scss';
import CustomScrollbars from '../ScrollBar/SrollBar';
import Episodes from './Episodes';


class NewSeries extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="new_series">
        <CustomScrollbars className="new_series__scroll">
          <Episodes data={data} />
        </CustomScrollbars>
      </div>
    );
  }
}

export default NewSeries;