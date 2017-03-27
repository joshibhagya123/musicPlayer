import React, { PropTypes } from 'react';
import './controls.scss';

class control extends React.Component {
  static propTypes = {
    objects: PropTypes.object,
    changeComponentState: PropTypes.func
  }
  state = { node: {},
    count: '',
    shuffle: false,
    seeker: '',
    flag: false,
    duration: '',
    value: '',
    seekerPsd: '',
    durationPsd: '',
    pre: false,
    next: false,
    playbutton: ''
  }


  componentWillMount() {
    const count = 0;
    const m = this.props.objects;
    const node = m.getNodeAt(0);
    this.setState({ node, count });
  }
  previous=() => {
    const m = this.props.objects;
    let count = this.state.count;
    if (this.state.shuffle) {
      const min = 0;
      const max = m.length;
      const random = Math.floor(Math.random() * ((max - min) + 1)) + min;
      const node = m.getNodeAt(random);
      this.setState({ node, count: random });
      this.props.changeComponentState(node);
    } else {
      const m = this.props.objects;
      const node = m.getNodeAt(count -= 1);
      this.setState({ node, count });
      this.props.changeComponentState(node);
    }
    const audio = document.getElementById('myaudio');
    audio.load();
    audio.autoplay = true;
  }

  next=() => {
    let count = this.state.count;
    const m = this.props.objects;
    if (this.state.shuffle) {
      const min = 0;
      const max = m.length;
      const random = Math.floor(Math.random() * ((max - min) + 1)) + min;
      const node = m.getNodeAt(random);
      this.setState({ node, count: random });
      this.props.changeComponentState(node);
    } else {
      const m = this.props.objects;
      const node = m.getNodeAt(count += 1);
      this.setState({ node, count });
      this.props.changeComponentState(node);
    }
    const audio = document.getElementById('myaudio');
    audio.load();
    audio.autoplay = true;
  }

  shuffle=() => {
    this.setState({ shuffle: !this.state.shuffle });
  }

  playPause=() => {
    const audio = document.getElementById('myaudio');
    if (!this.state.flag) {
      audio.play();
      this.setState({ flag: !this.state.flag, playbutton: 'fa fa-play' });
    } else {
      audio.pause();
      this.setState({ flag: !this.state.flag });
    }
  }

  update=() => {
    const player = document.getElementById('myaudio');
    // const seeker = document.getElementById('seek');
    const time = (player.currentTime / player.duration) * 100;
    const d = player.duration; // for total duration
    let sec = Math.floor(d);
    let min = Math.floor(sec / 60);
    min = (min >= 10 ? min : (0 + min));
    sec = Math.floor(sec % 60);
    sec = (sec >= 10 ? sec : (0 + sec));
    const e = player.currentTime;
    let secpasd = Math.floor(e);  // for progress time
    let minpasd = Math.floor(sec / 60);
    minpasd = (minpasd >= 10 ? minpasd : 0 + minpasd);
    secpasd = Math.floor(secpasd % 60);
    secpasd = (secpasd >= 10 ? secpasd : 0 + secpasd);
    this.setState({ seeker: sec, duration: min, seekerPsd: secpasd, durationPsd: minpasd, value: time });
  }

  progress=() => {
    const value = document.getElementById('seek').value;
    const player = document.getElementById('myaudio');
    const currentTime = (value * player.duration) / 100;
    player.currentTime = currentTime;
  }

  render() {
    return (
      <div className={'audio'}>
        <audio id="myaudio" onTimeUpdate={this.update}>
          <source src={this.state.node.url} />
        </audio>
        <div className={'seeker'}>
          <input id="seek" type="range" value={this.state.value} onChange={this.progress} />
        </div>
        <div className={'time'}>
          <p>{this.state.durationPsd}:{this.state.seekerPsd}</p>
        </div>
        <div className={'totaltime'}>
          <p>{this.state.duration}:{this.state.seeker}</p>
        </div>
        <div className={'buttons'}>
          <button className={'fa fa-step-backward previous'} onClick={this.previous} />
          <button className={this.state.flag ? 'fa fa-pause playPause' : 'fa fa-play playPause'} onClick={this.playPause} />
          <button className={'fa fa-step-forward next '} onClick={this.next} />
          <button className={this.state.shuffle ? 'fa fa-random shuffle' : 'fa fa-random'} onClick={this.shuffle} />
        </div>
      </div>
    );
  }
}

export default control;
