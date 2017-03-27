import React from 'react';
// import { render } from 'react-dom';
import DoublyLinkedList from './DLL';
import './index.scss';
import data from './Data';
import Title from './Title.jsx';
import Image from './image.jsx';
import Controls from './Controls.jsx';

class Music extends React.Component {
  state = { node: {}, dll: '' }

  componentWillMount() {
    const list = new DoublyLinkedList();
    data.map((value, i) => {
      list.add(value, i);
    });
    const node = list.getNodeAt(0);
    this.setState({ node, dll: list });
  }
  list = new DoublyLinkedList()
  changeState = (node) => {
    this.setState({ node });
  }
  render() {
    return (
      <div className={'musicPlayer'}>
        <Title
          data={this.state.node}
        />
        <Image
          image={this.state.node}
        />
        <Controls
          changeComponentState={this.changeState}
          objects={this.state.dll}
        />
      </div>
    );
  }
}

export default Music;

