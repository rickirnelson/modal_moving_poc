import React, { Component } from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { images } from '../images/UserImage';
import Header from './Header';
import Tags from './Modals/Tags';
import Buckets from './Modals/Buckets';
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
        console.log('in main state', props, localStorage)
        return props.user
    }

    constructor(props) {
        super(props);

        this.state = {
            bucket: {},
            tags: {},
            comments: 'Comments',
            currentUser: null
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

    checkTheBox = (e) => {
        const isChecked = this.state.bucket[e.target.name];
        const copyBucket = Object.assign({}, { ...this.state.bucket}, {[e.target.name]: !isChecked });
        const mergeState = Object.assign({}, { ...this.state})
        delete mergeState.bucket;
        mergeState.bucket = copyBucket;
        this.save(mergeState);
        this.setState(mergeState);
    }

    save(data) {
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
                <div className="container">
                    <div className="userdata">
                        <img alt="" src={`${images[this.state.currentUser]}`}/>
                        <h4>{ this.state.currentUser + '\'s data'}</h4>
                    </div>
                    <div className="video-player">
                        <video width="520" height="340" controls>
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="button-row">
                        <div className="modal-button">
                            <Button bsStyle="success" onClick={this.openModal} name="tags">
                                Tags
                            </Button>
                            <Tags
                                {...this.state.tags}
                                openModal={this.openModal}
                                closeModal={this.closeModal}
                                lockModalPos={this.lockModalPos}
                                />
                        </div>
                        <div className="modal-button">
                            <Button  bsStyle="warning" onClick={this.openModal} name="bucket">
                                Bucket
                            </Button>
                            <Buckets
                                {...this.state.bucket}
                                openModal={this.openModal}
                                closeModal={this.closeModal}
                                lockModalPos={this.lockModalPos}
                                checkTheBox={this.checkTheBox}
                                />
                        </div>
                    </div>
                    <div className="comments">
                        <textarea value={this.state.comments} />
                    </div>
                    <div className="save-button">
                        <Button onClick={this.save}>Save</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Main);
