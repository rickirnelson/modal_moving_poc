import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { MdBuild } from "react-icons/md";
import { Button } from 'react-bootstrap';

class Attributes extends React.Component {

    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox } = this.props;

        return (
            <div className="attributes">
                <ReactModal initWidth={200} initHeight={200} top={top} left={left} onRequestClose={closeModal} isOpen={modalIsOpen}>
                    <div id="m4" className="attributes-modal">
                        <h3>Attributes</h3>
                        <div>
                            <MdBuild /> In Progress
                        </div>
                        <br />
                        <Button onClick={closeModal} name="attributes">
                            Close
                        </Button>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default Attributes;
