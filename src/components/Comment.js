import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Col, Media, Modal } from 'react-bootstrap';
import { MdDateRange, MdClear, MdEdit, MdLocationHistory } from 'react-icons/lib/md';
import LikeDislikeToggle from './LikeDislikeToggle';
import * as actions from '../actions/commentsActions';
import CreateEditCommentModal from './CreateEditCommentModal';

class Comment extends Component {
    state = {
        deleteCommentModalOpen: false,        
        editCommentModalOpen: false
    };

    openDeleteCommentModal = () => this.setState(() => ({ deleteCommentModalOpen: true }));
    closeDeleteCommentModal = () => this.setState(() => ({ deleteCommentModalOpen: false }));
    openEditCommentModal = () => this.setState(() => ({ editCommentModalOpen: true }));
    closeEditCommentModal = () => this.setState(() => ({ editCommentModalOpen: false }));

    handleDeleteComment = (comment) => {
        this.props.doDeleteComment(comment.id);
        this.closeDeleteCommentModal();
    };

    render() {
        const { comment, doCommentVote } = this.props;
        const { deleteCommentModalOpen, editCommentModalOpen } = this.state;

        return (
            <div>
                <div className="row col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2">                        
                    <Media>
                        <Media.Left>
                            <MdLocationHistory size={36}/>
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{comment.author}</Media.Heading>
                            <Row>
                                <Col xs={8} md={8}>
                                    <p><MdDateRange size={20}/> {new Date(comment.timestamp).toDateString()}</p>
                                </Col>
                                <Col xs={4} md={4}>
                                    <div className="text-right">
                                        <Button
                                            className="form-button no-padding"
                                            bsStyle="link"
                                            onClick={() => this.openEditCommentModal()}>
                                            <MdEdit size={22}/>
                                        </Button>
                                        <Button
                                            className="form-button no-padding"
                                            bsStyle="link"
                                            onClick={ () => this.openDeleteCommentModal()}>
                                            <MdClear size={22}/>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>                           
                            <p>{comment.body}</p>
                            <hr className="no-margin-top no-margin-bottom"/>
                            <div className="text-right">
                                <LikeDislikeToggle itemVoted={comment} vote={doCommentVote}/>
                            </div>
                        </Media.Body>
                    </Media>                                   
                </div>              

                <CreateEditCommentModal 
                    open={editCommentModalOpen}
                    close={this.closeEditCommentModal}
                    comment={comment}/>

                <Modal
                    show={deleteCommentModalOpen}
                    onHide={this.closeDeleteCommentModal}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Comment</Modal.Title>
                    </Modal.Header>                        
                    <Modal.Body>
                        Are you sure you want to delete this comment?
                    </Modal.Body>
                    <Modal.Footer>                        
                        <Button
                            onClick={() => this.handleDeleteComment(comment)}    
                        >Delete</Button>
                        <Button
                            onClick={this.closeDeleteCommentModal}
                            bsStyle="danger"
                        >Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }    
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default connect(null, actions)(Comment);