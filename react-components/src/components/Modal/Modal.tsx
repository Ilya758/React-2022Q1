import React from 'react';
import ReactDOM from 'react-dom';
import { IModalProps } from '../../App.types';
import './Modal.styles.scss';

export default class Modal extends React.Component<IModalProps> {
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
    const { toggleModalCb, children } = this.props;

    return ReactDOM.createPortal(
      <div onClick={toggleModalCb} className="overlay">
        <div className="content modal__content">
          <span className="modal-close__button">X</span>
          {children}
          <div>
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi illum modi
              dolore consequuntur impedit error.
            </p>
          </div>
        </div>
      </div>,
      this.container
    );
  }
}
