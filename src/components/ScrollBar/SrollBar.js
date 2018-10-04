import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbars extends Component {

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = { top: 0 };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }

  handleUpdate(values) {
    const { top } = values;
    this.setState({ top });
  }

  renderView({ style, ...props }) {
    const { top } = this.state;
    const viewStyle = {
      padding: 0,
    };
    return (
      <div
        className="box"
        style={{ ...style, ...viewStyle }}
        {...props}/>
    );
  }

  renderThumb({ style, ...props }) {
    const { top } = this.state;
    const thumbStyle = {
      backgroundColor: '#a1a1a1',
      borderRadius: '2px',
      width: '4px',
      top: '0px',
      bottom: '0px',
    };
    return (
      <div className="ters1"
        style={{ ...style, ...thumbStyle }}
        {...props}/>
    );
  }

  renderTrackVertical({ style, ...props }) {
    const trackVerticalStyle = {
      backgroundColor: '#e6e6e6',
      borderRadius: '2px',
      width: '4px',
      top: '10px',
      bottom: '10px',
      right: '10px'
    };
    return (
      <div className="ters2"
           style={{ ...style, ...trackVerticalStyle }}
           {...props}/>
    );
  }

  render() {
    return (
      <Scrollbars
        renderView={this.renderView}
        renderTrackVertical={this.renderTrackVertical}
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        onUpdate={this.handleUpdate}
        {...this.props}/>
    );
  }
}