import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { Button, Checkbox } from 'react-bootstrap';

class Buckets extends React.Component {

    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox } = this.props;

        return (
            <div>
                <ReactModal initWidth={width} initHeight={height + 50} top={top} left={left} onRequestClose={closeModal} isOpen={modalIsOpen}>
                    
                </ReactModal>
            </div>
        )
    }
}

export default Buckets;
