import React, { Fragment } from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { MdAddCircleOutline } from "react-icons/md";
import { Button, Checkbox } from 'react-bootstrap';

class Buckets extends React.Component {
    state = {
        value: '',
        playlist: []
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    createNewListItem = () => {
        if (this.state.value.length > 0) {
            const listItemObj = {
                listName: this.state.value,
                assets: []
            }
            this.props.createListItem(listItemObj);
            return this.setState({
                value: ''
            })
        }
    }

    addAssetToPlaylist = (e) => {
        const assetData = {
            assetName: this.props.assetName,
            notes: this.state.notes,
            video: 'https://www.w3schools.com/html/mov_bbb.mp4'
        }

        this.props.addAsset(assetData, e.target.value);
        this.setState({
            playList: assetData
        })
    }

    renderLists = (playlists) => {
        if (!playlists) {
            return (<div> no playlists yet...</div>)
        }
        return (
            <div className="checkboxes">
                <ul>
                    {
                        playlists.map((bucket, i) =>
                            <Fragment>
                                <li>
                                    <Checkbox
                                        name={`${bucket}-${i}`}
                                        onChange={e => this.props.checkTheBox(e, 'bucket')}
                                        checked={this.props[`${bucket}-${i}`] ? this.props[`${bucket}-${i}`] : false}
                                        >
                                        {bucket.listName}
                                    </Checkbox>
                                </li>
                                <li>
                                    { this.props[`${bucket}-${i}`] &&
                                        this.renderListAssets(bucket, this.props[`${bucket}-${i}`])
                                    }
                                </li>
                                <li>
                                    { this.props[`${bucket}-${i}`] &&
                                        <button value={bucket.listName} onClick={this.addAssetToPlaylist}>Add Asset</button>
                                    }
                                </li>
                            </Fragment>
                        )
                    }
                </ul>
            </div>
        )
    }

    renderListAssets = (bucket, isChecked) => {
        return (
            <div>
                {isChecked &&
                    <div className="bucket-detail">
                        {
                            bucket.assets.map(item =>
                                <ul className="asset-detail-list">
                                    <li>
                                        <div className="asset-video-player">
                                            <video>
                                                <source src={item.video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </li>
                                    <li className="asset-data">
                                        <p className="asset-name">{item.assetName}</p>
                                        <p className="asset-notes">{item.notes || 'No comments'}</p>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                }
            </div>
        )
    }

    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox, createListItem, listItems } = this.props;

        return (
            <div>
                <ReactModal initWidth={300} initHeight={height + 50} top={top} left={left} onRequestClose={closeModal} isOpen={modalIsOpen}>
                    <div name="bucket" id="m2">
                        <h3>Playlist</h3>
                        <div className="body">
                            <div className="bucket-input">
                                <MdAddCircleOutline color={this.state.value.length === 0 ? "grey" : "orange"} onClick={this.createNewListItem}/>
                                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div>
                            {this.renderLists(listItems)}
                        </div>
                        <div>
                            <Button onClick={closeModal} name="bucket">
                                Close
                            </Button>
                            <Button name="bucket" onClick={e => lockModalPos(e, "m2")}>
                                {"Save Position"}
                            </Button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default Buckets;
