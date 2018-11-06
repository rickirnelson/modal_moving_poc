import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { Button, Checkbox } from 'react-bootstrap';

class Buckets extends React.Component {

    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox } = this.props;

        return (
            <div>
                <ReactModal initWidth={width} initHeight={height + 50} top={top} left={left} onRequestClose={closeModal} isOpen={modalIsOpen}>
                    <div name="bucket" id="m2">
                        <h3>Bucket</h3>
                        <div className="body">
                            <p>Bucket Checkboxes</p>
                        </div>
                        <div className="checkboxes">
                            <Checkbox
                                name="checkbox-1"
                                onChange={checkTheBox}
                                checked={this.props["checkbox-1"] ? this.props["checkbox-1"] : false}
                                >
                                Checkbox #1 {this.props["checkbox-1"] ? this.props["checkbox-1"] : false}
                            </Checkbox>
                            <Checkbox
                                name="checkbox-2"
                                onChange={checkTheBox}
                                checked={this.props["checkbox-2"] ? this.props["checkbox-2"] : false}
                                >
                                Checkbox #2 {this.props["checkbox-2"] ? this.props["checkbox-2"] : false}
                            </Checkbox>
                            <Checkbox
                                name="checkbox-3"
                                onChange={checkTheBox}
                                checked={this.props["checkbox-3"] ? this.props["checkbox-3"] : false}
                                >
                                Checkbox #3 {this.props["checkbox-3"] ? this.props["checkbox-3"] : false}
                            </Checkbox>
                        </div>
                        <Button onClick={closeModal} name="bucket">
                            Close
                        </Button>
                        <Button name="bucket" onClick={e => lockModalPos(e, "m2")}>
                            {"Save Position"}
                        </Button>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default Buckets;
