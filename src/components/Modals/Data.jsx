import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { Rnd } from 'react-rnd';
import { MdBuild } from "react-icons/md";
import { Button } from 'react-bootstrap';

class Data extends React.Component {
    static getDerivedStateFromProps(props) {
        if (props.clickedModal === 'data') {
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

        // derived state from prop?
        this.state = {
            isResizing: false,
            sizing: { top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }
        }

        this.update = this.update.bind(this);
        this.canResize = this.canResize.bind(this);
        this.disableResize = this.disableResize.bind(this);
        this.dataModal = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.enableResize) {
            this.setState({
                enableResize: !prevState.enableResize
            })
        }
    }
    update() {
        this.canResize()
        this.props.modalZIndex('data');
    }

    canResize() {
        this.setState({
            enableResize: true,
            sizing: { top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }
        })
    }

    disableResize(){
        this.setState({
            enableResize: false,
            sizing: { top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }
        })
    }


    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox } = this.props;
        const { zIndexState } = this.state;

        let sizing;
        if (this.state.enableResize) {
            sizing = { top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }
        } else {
            sizing = { top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }
        }

        return (
            <div className="data">
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
                    ref={ c => this.dataModal = c }
                    onMouseOut={this.disableResize}
                    onClick={this.canResize}
                    enableResizing={false}
                >
                    <div id="m3" className="data-modal">
                        <h3>Data</h3>
                        <div>
                            <MdBuild /> In Progress
                        </div>
                        <br />
                        <Button onClick={closeModal} name="data">
                            Close
                        </Button>
                    </div>
                </Rnd>
            </div>
        )
    }
}

export default Data;
