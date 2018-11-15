import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { Rnd } from 'react-rnd';
import { MdBuild } from "react-icons/md";
import { Button } from 'react-bootstrap';

class Attributes extends React.Component {
    static getDerivedStateFromProps(props) {
        if (props.clickedModal === 'attributes') {
            return {
                zIndexState: 1
            }
        }
        return {
            zIndexState: 0
        }
    }

    constructor(props) {
        super(props);

        this.state = {}

        this.update = this.update.bind(this);
    }

    update() {
        this.props.modalZIndex('attributes');
    }

    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox } = this.props;
        const { zIndexState } = this.state;

        return (
            <div className="attributes">
                <Rnd
                    default={{
                        x: left || 0,
                        y: top || 0,
                        width: 320,
                        height: 200,
                    }}
                    style={{
                        display: modalIsOpen ? 'block' : 'none',
                        border: '1px solid black',
                        background: 'white',
                        zIndex: zIndexState
                    }}
                    onMouseDown={ this.update }
                >
                <div id="m3" className="attributes-modal">
                    <h3>Attributes</h3>
                    <div>
                        <MdBuild /> In Progress
                    </div>
                    <br />
                    <Button onClick={closeModal} name="attributes">
                        Close
                    </Button>
                </div>
                </Rnd>

            </div>
        )
    }
}

export default Attributes;
