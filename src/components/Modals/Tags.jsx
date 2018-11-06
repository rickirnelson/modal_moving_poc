import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { Button, Label } from 'react-bootstrap';

class Tags extends React.Component {

    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos } = this.props;

        return (
            <div>
                <ReactModal initWidth={width} initHeight={height + 50} top={top} left={left} onRequestClose={closeModal} isOpen={modalIsOpen}>
                    <div id="m1" name="tags">
                        <h3>Tags</h3>
                        <div className="body" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Label style={{ margin: '10px', padding: '10px', background: 'pink' }}>Tag #1</Label>
                            <Label style={{ margin: '10px', padding: '10px', background: 'lightgreen' }}>Tag #2</Label>
                        </div>
                        <Button onClick={closeModal} name="tags">
                            Close
                        </Button>
                        <Button name="tags" onClick={e => lockModalPos(e, "m1")}>
                            { "Save Position" }
                        </Button>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default Tags;
