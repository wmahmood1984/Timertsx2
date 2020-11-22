import React from 'react';
import './Timer.css';
import TimerButton from '../TimerButton/TimerButton';

class Timer extends React.Component<{},{minutes:number,seconds:number,isOn:boolean}> {
  constructor(props:any) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: 0,
      isOn: false,
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  myInterval = setInterval(() => {
    const { seconds, minutes, isOn } = this.state;
    if(isOn === true){
    if (seconds > 0) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }));
    }
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(this.myInterval);
      } else {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59,
        }));
      }
    }
  }}, 1000);

  startTimer() {
    
    this.setState({ isOn: true });
  }

  stopTimer() {
    clearInterval(this.myInterval);
    this.setState({ isOn: false });
  }

  resetTimer() {
    this.stopTimer();
    this.setState({
      minutes: 25,
      seconds: 0,
    });
  }

  render = () => {
    const { minutes, seconds } = this.state;

    return (
      <div className="timer-container">
        <div className="time-display">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="timer-button-container">
          
          <div className="start-timer">
          <TimerButton
            buttonAction={this.startTimer}
            buttonValue={'Start'}
          /></div>
          
          <div className="stop-timer">
          <TimerButton
            buttonAction={this.stopTimer}
            buttonValue={'Stop'}
          /></div>
          
          <div className="reset-timer">
          <TimerButton
            buttonAction={this.resetTimer}
            buttonValue={'Reset'}
          /></div>
        </div>
      </div>
    );
  };
}

export default Timer;