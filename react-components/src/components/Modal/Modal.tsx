import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.styles.scss';

export default class Modal extends React.Component {
  static createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('modal-container');
    return container;
  };

  modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  container = Modal.createContainer();

  componentDidMount() {
    this.modalRoot.appendChild(this.container);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}
