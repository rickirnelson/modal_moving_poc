import React, { Component } from 'react';
import { Button, Checkbox } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { MdLink, MdCloudUpload, MdCloudDownload, MdStarBorder, MdEventNote, MdDelete } from "react-icons/md";
import Transcription from '../images/Transcription.png';
import Header from './Header';
import AssetHeader  from './AssetHeader';
import Tags from './Modals/Tags';
import Buckets from './Modals/Buckets';
import Data from './Modals/Data';
import Attributes from './Modals/Attributes';
import '../App.css';

const formatBucketData = (name, position) => {
    return {
        name: {
            bottom: position.bottom,
            height: position.height,
            left: position.left,
            right: position.right,
            top: position.top,
            width: position.width,
            x: position.x,
            y: position.y,
            modalIsOpen: true
        }
    }
}

class Main extends Component {
    static getDerivedStateFromProps(props, state) {
        return props.user
    }

    constructor(props) {
        super(props);

        this.state = {
            bucket: {
                listItems: []
            },
            tags: {
                tagData: []
            },
            data: {},
            attributes: {},
            comments: 'Notes',
            currentUser: null,
            assetName: 'Asset Name'
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.lockModalPos = this.lockModalPos.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        // TODO: help?
        // if (Object.values(this.props.user).length === 0){
        //     this.props.history.push('/');
        // }
    }

    openModal(e) {
        const copyStateOpen = Object.assign({}, {...this.state[e.target.name]}, {modalIsOpen: true});
        this.setState({[e.target.name]: copyStateOpen});
    }

    closeModal(e) {
        const copyStateClose = Object.assign({}, {...this.state[e.target.name]}, {modalIsOpen: false});
        this.setState({[e.target.name]: copyStateClose});
    }


    lockModalPos(e, id) {
        const modalPos = document.getElementById(id).getBoundingClientRect();
        let modal;
        if (e.target.name === 'bucket') {
            // TODO: it works, but it's pretty unruly.  Refactor
            const copyBucket = Object.keys({...this.state.bucket})

            const tempModal = {
                [e.target.name]: {
                    bottom: modalPos.bottom,
                    height: modalPos.height,
                    left: modalPos.left,
                    right: modalPos.right,
                    top: modalPos.top,
                    width: modalPos.width,
                    x: modalPos.x,
                    y: modalPos.y,
                    modalIsOpen: true
                }
            };
            const checkboxes = [];
            copyBucket.forEach(key => {
                if (tempModal.bucket[key]) {
                    return;
                }
                checkboxes.push(key);
            })

            const bucketCheckObj = {};
            checkboxes.forEach(checkbox => {
                bucketCheckObj[checkbox] = this.state.bucket[checkbox];
            });

            const modalData = Object.assign({}, tempModal.bucket, bucketCheckObj);
            modal = {
                [e.target.name]: modalData
            }
        } else {
            modal = {
                [e.target.name]: {
                    bottom: modalPos.bottom,
                    height: modalPos.height,
                    left: modalPos.left,
                    right: modalPos.right,
                    top: modalPos.top,
                    width: modalPos.width,
                    x: modalPos.x,
                    y: modalPos.y,
                    modalIsOpen: true
                }
            };
        }
        this.save(modal);
        this.setState(modal);
    }

    checkTheBox = (e, type) => {
        const isChecked = this.state[type][e.target.name];
        const copyData = Object.assign({}, { ...this.state[type]}, {[e.target.name]: !isChecked });
        const mergeState = Object.assign({}, { ...this.state})
        delete mergeState[type];
        mergeState[type] = copyData;
        this.save(mergeState);
        this.setState(mergeState);
    }

    createNewTag = (newTagData) => {
        // Save to an API of some kind
        // Don't want it to rerender
        const tagCopy = Object.assign({}, this.state.tags);
        const updatedTagData = (tagCopy.tagData || []).concat(newTagData);
        this.setState({
            tags: {
                tagData: updatedTagData
            },
        });
    }

    createListItem = (itemData) => {
        const bucketCopy = Object.assign({}, this.state.bucket);
        const updatedItemData = (bucketCopy.listItems || []).concat(itemData);
        this.setState({
            bucket: {
                listItems: updatedItemData
            }
        })
    }

    addAsset = (asset, listname) => {
        const bucketCopy = Object.assign({}, this.state.bucket);
        const updatedItemData = (bucketCopy.listItems || [])
        updatedItemData.forEach(item => {
            if (item.listName === listname) {
                console.log('where to add', item, asset)
                item.assets.push(asset)
            }
        })

        console.log('adding?', updatedItemData)
        // updatedItemData.assets.concat(asset);
        this.setState({
            bucket: {
                listItems: updatedItemData
            }
        })
    }
    save(data) {
        // TODO: redo all this
        console.log('saved data:', data)
        let userAndData;
        if (data.bucket && JSON.stringify(data.bucket) !== JSON.stringify(this.state.bucket)) {
            // TODO: add ability to save position and checked boxes here.
            userAndData = Object.assign(
                {},
                {currentUser: this.state.currentUser},
                data,
                {tags: this.state.tags}
            );
        } else if (data.tags && JSON.stringify(data.tags) !== JSON.stringify(this.state.tags)) {
            userAndData = Object.assign(
                {},
                {currentUser: this.state.currentUser},
                data,
                {bucket: this.state.bucket}
            );
        } else {
            userAndData = Object.assign(
                {},
                {currentUser: this.state.currentUser},
                {bucket: this.state.bucket},
                {tags: this.state.tags}
            );
        }
        localStorage.setItem(`userData-${this.state.currentUser}`, JSON.stringify(userAndData));
        this.setState(userAndData);
    }

    render() {
        return (
            <div className="App">
                <Header />
                <AssetHeader />
                <div className="containers">
                    <div className="container-left">
                        <div className="video-player">
                            <video width="520" height="340" controls>
                                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="action-row">
                            <ul>
                                <li><MdLink /></li>
                                <li><MdCloudUpload /></li>
                                <li><MdCloudDownload /></li>
                                <li><MdStarBorder /></li>
                                <li><MdEventNote /></li>
                                <li><MdDelete /></li>
                            </ul>
                        </div>
                        <div className="access-control">
                            <Checkbox name="allow-dl"><h4>Allow Downloads</h4></Checkbox>
                            <Checkbox name="allow-share"><h4>Allow Sharing</h4></Checkbox>
                            <br />
                            <h4>Anyone with the following link can view this asset: (???)</h4>
                        </div>
                    </div>
                    <div className="container-right">
                        <div className="button-row">
                            <div className="modal-button">
                                <Button onClick={this.openModal} name="tags">
                                    Tags
                                </Button>
                                <Tags
                                    {...this.state.tags}
                                    openModal={this.openModal}
                                    closeModal={this.closeModal}
                                    lockModalPos={this.lockModalPos}
                                    checkTheBox={this.checkTheBox}
                                    createNewTag={this.createNewTag}
                                />
                            </div>
                            <div className="modal-button">
                                <Button onClick={this.openModal} name="bucket">
                                    Bucket
                                </Button>
                                <Buckets
                                    {...this.state.bucket}
                                    createListItem={this.createListItem}
                                    openModal={this.openModal}
                                    closeModal={this.closeModal}
                                    lockModalPos={this.lockModalPos}
                                    checkTheBox={this.checkTheBox}
                                    assetName={this.state.assetName}
                                    addAsset={this.addAsset}
                                />
                            </div>
                            <div className="modal-button">
                                <Button onClick={this.openModal} name="data">
                                    Data
                                </Button>
                                <Data
                                    {...this.state.data}
                                    openModal={this.openModal}
                                    closeModal={this.closeModal}
                                />
                            </div>
                            <div className="modal-button">
                                <Button onClick={this.openModal} name="attributes">
                                    Attribute
                                </Button>
                                <Attributes
                                    {...this.state.attributes}
                                    openModal={this.openModal}
                                    closeModal={this.closeModal}
                                />
                            </div>
                        </div>
                        <div className="transcription">
                            <img src={Transcription} alt=""/>
                        </div>
                        <div className="comments">
                            <textarea value={this.state.comments} />
                        </div>
                        <div className="save-button">
                            <Button onClick={this.save}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Main);
