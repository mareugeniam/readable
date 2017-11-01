import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import CreateEditComment from './CreateEditComment';

const CreateEditCommentModal = (props) =>    
    <Modal
    show={props.open}
    onHide={props.close}
    >
    <Modal.Header closeButton>
        <Modal.Title>{props.comment !== undefined ? "Edit Comment" : "Add New Comment"}</Modal.Title>
    </Modal.Header>
        <CreateEditComment comment={props.comment} close={props.close} post={props.post}/>
    </Modal>

CreateEditCommentModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    comment: PropTypes.object,
    post: PropTypes.object
}

export default CreateEditCommentModal;