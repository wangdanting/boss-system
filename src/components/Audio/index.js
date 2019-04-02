import React, { PureComponent } from 'react';
import source from './new-order-audio.mp3';

class Audio extends PureComponent {
  constructor(props) {
    super(props);
    this.myRef = null;
  }

  state = {
    audioSrc: source
  };

  setMyRef = element => {
    this.myRef = element;
  };

  render() {
    const { audioSrc } = this.state;
    return (
      <audio ref={this.setMyRef} src={audioSrc} controls='controls' style={{ display: 'none' }} />
    );
  }
}

export default Audio;
