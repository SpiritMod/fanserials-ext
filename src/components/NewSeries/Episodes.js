import React, { Component } from 'react';
import Voices from './Voices';
import ReactImageFallback from "react-image-fallback";

class Episodes extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="new-series-list">
        {
          data.map(({ serial: { name }, episode }, index) => (
            <div className="episode" key={index}>
              <a className="episode__link" href={episode.url} target="_blank">
                <div className="episode__img">
                  <ReactImageFallback
                    src={episode.images.small}
                    fallbackImage="img/default.jpg"
                    alt={name}
                  />
                </div>
                <div className="episode__info">
                  <div className="episode__title"><p className="text">{name}</p></div>
                  <div className="episode__desc"><p className="text">{episode.name}</p></div>
                  <Voices data={episode.voices} />
                </div>
              </a>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Episodes;