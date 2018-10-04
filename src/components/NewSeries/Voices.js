import React, { Component } from 'react';

class Voices extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="episode__voices">
        <div className="text">
          {
            data.map((voice, index) => (
              <span key={index}>{voice.name}</span>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Voices;