import React from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { MdAddCircleOutline, MdClear } from "react-icons/md";
import { Button, Checkbox } from 'react-bootstrap';

class Tags extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.tagData && props.tagData.length !== state.tagList.length) {
            const tagList = [];
            props.tagData.forEach(tag => tagList.push(tag));
            return { tagList: props.tagData , modalIsOpen: props.modalIsOpen };
        }
    }

    state = {
        value: '',
        tagList: [],
        disableAddTag: true
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
            disableAddTag: this.state.value.length === 0
        })
    }

    createTag = () => {
        if (this.state.value.length > 0 && !this.state.disableAddTag) {
            this.props.createNewTag(this.state.value)
            return this.setState({
                value: ''
            })
        }
    }

    removeTag = (idx) => {
        this.props.removeItem('tags', idx);
    }

    renderTags = (tagList) => {
        if (!tagList) {
            return (<div> no tags yet...</div>)
        }
        return (
            <div className="checkboxes">
                <ul>
                    {
                        tagList.map((tag, i) =>
                            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <Checkbox
                                    name={`${tag}-${i}`}
                                    onChange={e => this.props.checkTheBox(e, 'tags')}
                                    checked={this.props[`${tag}-${i}`] ? this.props[`${tag}-${i}`] : false}
                                >
                                    {tag}
                                </Checkbox>
                                <div className="clear-button">
                                    <MdClear onClick={() => this.removeTag(i)} />
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }

    render() {
        // tags passed in as props
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox, tagData } = this.props;

        return (
            <div className="tags">
                <ReactModal initWidth={300} initHeight={height + 50} top={top} left={left} onRequestClose={closeModal} isOpen={modalIsOpen}>
                    <div id="m1" className="tag-modal" name="tags">
                        <div className="playlist-header">
                            <h3>Tags</h3>
                        </div>
                        <div className="close-modal-btn">
                            <Button onClick={closeModal} name="tags">
                                x
                            </Button>
                        </div>
                        <div className="body">
                            <div className="tag-input">
                                <MdAddCircleOutline color={this.state.value.length === 0 ? "grey" : "orange"} onClick={this.createTag}/>
                                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                            </div>
                            <div>
                                {this.renderTags(this.state.tagList)}
                            </div>
                        </div>

                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default Tags;
