import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { MdBuild } from "react-icons/md";
import { Button } from 'react-bootstrap';

class Data extends React.Component {

    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox } = this.props;

        return (
            <div>
                <ReactModal initWidth={200} initHeight={200} top={top} left={left} onRequestClose={closeModal} isOpen={modalIsOpen}>
                    <div id="m3">
                        <h3>Data</h3>
                        <div>
                            <MdBuild /> In Progress
                        </div>
                    </div>
                    <br />
                    <Button onClick={closeModal} name="data">
                        Close
                    </Button>
                </ReactModal>
            </div>
        )
    }
}

export default Data;
