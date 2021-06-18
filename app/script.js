import React from 'react';
import { render } from 'react-dom';

class AppDescription extends React.Component {
  render() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
  }
};

class App extends React.Component {
  state = {
    status: 'off',
    time: '',
    timer: null,
  }

  formatTime = (time) => {
    const ss = Math.round(time % 60);
    const mm = Math.floor((time % 3600) / 60);
    return [
      mm > 9 ? mm : '0' + mm,
      ss > 9 ? ss : '0' + ss,
    ].filter(Boolean).join(':');
  }

  step = () => {
    this.setState({
      time: this.state.time - 1,
    });
    if (this.state.time === 0) {
      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 2,
        });
      } else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 5,
        });
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),      
      status: 'work',
      time: 5,
    });

  };

  render() {
    const {status, time} = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription/>}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn">Stop</button>}
        <button className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
