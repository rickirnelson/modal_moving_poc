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
import { VIDEO } from '../videos/VideoLinks';
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
            comments: '',
            currentUser: null,
            assetName: 'Asset Name',
            assetVideo: VIDEO.demo1,
            foreground: null
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.lockModalPos = this.lockModalPos.bind(this);
        this.modalZIndex = this.modalZIndex.bind(this);
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

    checkTheBox = (e, type, listname) => {

        if (type === 'bucket') {
            this.state[type].listItems.forEach(item => {
                console.log('item', item, listname)
                if (item.listName === listname) {
                    console.log('ischecked', item.checked)
                    item.checked = !item.checked
                }
            })
            console.log('bucket', this.state[type])
            const isChecked = this.state[type].listItems.checked;
            const copyData = Object.assign({}, { ...this.state[type]});
            console.log('copied data', copyData)
            const mergeState = Object.assign({}, { ...this.state});
            mergeState[type] = copyData;
            console.log('mergedstate', mergeState);
            this.save(mergeState);
            this.setState(mergeState);
        } else {
            const isChecked = this.state[type][e.target.name];
            const copyData = Object.assign({}, { ...this.state[type]}, {[e.target.name]: !isChecked });
            const mergeState = Object.assign({}, { ...this.state})
            delete mergeState[type];
            mergeState[type] = copyData;
            this.save(mergeState);
            this.setState(mergeState);
        }
    }

    createNewTag = (newTagData) => {
        // Save to an API of some kind
        // Don't want it to rerender
        const tagCopy = Object.assign({}, this.state.tags);
        const updatedTagData = (tagCopy.tagData || []).concat(newTagData);
        this.setState({
            tags: {
                tagData: updatedTagData,
                modalIsOpen: true
            },
        });
    }

    //We want to add a checked feature to the state of the bucket.
    // its deeply nested so we have to do some things...

    createListItem = (itemData) => {
        const bucketCopy = Object.assign({}, this.state.bucket);
        const updatedItemData = (bucketCopy.listItems || []).concat(itemData);
        this.setState({
            bucket: {
                listItems: updatedItemData,
                modalIsOpen: true
            }
        })
    }

    addAsset = (asset, listname) => {
        const bucketCopy = Object.assign({}, this.state.bucket);
        const updatedItemData = (bucketCopy.listItems || [])
        updatedItemData.forEach(item => {
            if (item.listName === listname) {
                item.assets.push(asset)
            }
        })

        this.setState({
            bucket: {
                listItems: updatedItemData,
                modalIsOpen: true
            }
        })
    }
    save(data) {
        // TODO: redo all this
        console.log('saving', data);
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

    handleComments = (e) => {
        this.setState({
            comments: e.target.value
        })
    }

    handleForeground = (modal) => {
        this.setState({
            foreground: modal
        })
    }

    modalZIndex = (name) => {
        this.setState({
            modalClicked: name
        })
    }

    removeItem = (type, idx) => {
        console.log('bucket', this.state['bucket'])
        console.log('tags', this.state['tags'])
        if (type === 'tags') {
            const tagState = {...this.state.tags};
            tagState.tagData.splice(idx, 1);
            console.log('new tags', tagState);
            this.setState({
                [type]: tagState
            })
        } else if (type === 'bucket') {
            const bucketState = {...this.state.bucket};
            bucketState.listItems.splice(idx, 1)
            this.setState({
                [type]: bucketState
            })
        }
    }

    removeAsset = (bucketIdx, assetIdx) => {

        const bucketState = {...this.state.bucket};
        console.log('removal!!!!', bucketState, bucketIdx, assetIdx)
        bucketState.listItems[bucketIdx].assets.splice(assetIdx, 1);
        this.setState({
            bucket: bucketState
        })
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
                                <source src={this.state.assetVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
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
                    </div>
                        <div className="access-control">
                            <Checkbox name="allow-dl"><h4>Allow Downloads</h4></Checkbox>
                            <Checkbox name="allow-share"><h4>Allow Sharing</h4></Checkbox>
                            <br />
                            <h4>Anyone with the following link can view this asset: </h4>
                            <a href="http://www.poc-asset-page.com.s3-website-us-west-2.amazonaws.com/main">
                                {'http://www.poc-asset-page.com.s3-website-us-west-2.amazonaws.com/main'}
                            </a>

                        </div>
                    </div>
                    <div className="container-right">
                        <div className="button-row">
                            <div className="modal-button">
                                <Button onClick={this.state.tags.modalIsOpen ? this.closeModal : this.openModal} name="tags">
                                    Tags
                                </Button>
                                <Tags
                                    {...this.state.tags}
                                    openModal={this.openModal}
                                    closeModal={this.closeModal}
                                    lockModalPos={this.lockModalPos}
                                    checkTheBox={this.checkTheBox}
                                    createNewTag={this.createNewTag}
                                    modalIsOpen={this.state.tags.modalIsOpen}
                                    foreground={this.state.foreground}
                                    handleForeground={this.handleForeground}
                                    removeItem={this.removeItem}
                                />
                            </div>
                            <div className="modal-button">
                                <Button onClick={this.state.bucket.modalIsOpen ? this.closeModal : this.openModal} name="bucket">
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
                                    assetVideo={this.state.assetVideo}
                                    foreground={this.state.foreground}
                                    handleForeground={this.handleForeground}
                                    removeItem={this.removeItem}
                                    removeAsset={this.removeAsset}
                                />
                            </div>
                            <div className="modal-button">
                                <Button onClick={this.state.data.modalIsOpen ? this.closeModal : this.openModal} name="data">
                                    Data
                                </Button>
                                <Data
                                    {...this.state.data}
                                    openModal={this.openModal}
                                    closeModal={this.closeModal}
                                    foreground={this.state.foreground}
                                    handleForeground={this.handleForeground}
                                    modalZIndex={this.modalZIndex}
                                    clickedModal={this.state.modalClicked}
                                />
                            </div>
                            <div className="modal-button">
                                <Button onClick={this.state.attributes.modalIsOpen ? this.closeModal : this.openModal} name="attributes">
                                    Attribute
                                </Button>
                                <Attributes
                                    {...this.state.attributes}
                                    openModal={this.openModal}
                                    closeModal={this.closeModal}
                                    foreground={this.state.foreground}
                                    handleForeground={this.handleForeground}
                                    modalZIndex={this.modalZIndex}
                                    clickedModal={this.state.modalClicked}
                                />
                            </div>
                        </div>
                        <div className="transcription">
                            <img src={Transcription} alt=""/>
                        </div>
                        <div className="comments">
                            <textarea cols="500" rows="10" placeholder="Comments" value={this.state.comments} onChange={this.handleComments}/>
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
