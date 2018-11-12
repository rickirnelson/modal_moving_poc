import React, { Fragment } from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import { MdAddCircleOutline } from "react-icons/md";
import { Button, Checkbox } from 'react-bootstrap';
import '../../App.css';


class Buckets extends React.Component {
    static getDerivedStateFromProps(props) {
        if (props.foreground === 'bucket') {
            return {
                isForeground: true
            }
        }
        return {
            isForeground: false
        }
    }

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
                assets: [],
                checked: false
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
            video: this.props.assetVideo
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
                            <Fragment key={`${bucket.listName}-${i}`}>
                                <li className="check-add-asset-row">
                                    <div>
                                        <Checkbox
                                            name={`${bucket}-${i}`}
                                            onChange={e => this.props.checkTheBox(e, 'bucket', bucket.listName)}
                                            checked={bucket.checked ? bucket.checked : false}
                                            >
                                            <span style={{ fontWeight: 'bolder'}}>{bucket.listName}</span>
                                        </Checkbox>
                                    </div>
                                    <div className="add-asset-btn">
                                        { bucket.checked &&
                                            <button value={bucket.listName} onClick={this.addAssetToPlaylist}>Add Asset</button>
                                        }
                                    </div>
                                </li>
                                <li className="asset-detail">
                                    { bucket.checked &&
                                        this.renderListAssets(bucket, bucket.checked)
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

    clickForeground = () => {
        this.props.handleForeground('buckets');
    }
    render() {
        const { width, height, top, left, closeModal, modalIsOpen, lockModalPos, checkTheBox, createListItem, listItems } = this.props;

        const { isForeground } = this.state;
        console.log(this.props)
        return (
            <div className="buckets" style={{ zIndex: isForeground ? '1000' : '0' }} onClick={this.clickForeground}>
                <ReactModal initWidth={300} initHeight={600} top={top} left={left} onRequestClose={closeModal} isOpen={modalIsOpen}>
                    <div name="bucket" className="bucket-modal" id="m2">
                        <div className="playlist-header">
                            <h3>Playlist</h3>
                        </div>
                        <div className="close-modal-btn">
                            <Button onClick={closeModal} name="bucket">
                                x
                            </Button>
                        </div>
                    <div className="body">
                        <div className="bucket-input">
                            <MdAddCircleOutline color={this.state.value.length === 0 ? "grey" : "orange"} onClick={this.createNewListItem}/>
                            <input type="text" value={this.state.value} onChange={this.handleChange}/>
                        </div>
                        <div>
                            {this.renderLists(listItems)}
                        </div>
                    </div>
                </div>
                </ReactModal>
            </div>
        )
    }
}

export default Buckets;
