import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import CreateEditPost from './CreateEditPost';

const CreateEditPostModal = (props) =>    
    <Modal
    show={props.open}
    onHide={props.close}
    >
    <Modal.Header closeButton>
        <Modal.Title>{props.post !== undefined ? "Edit Post" : "Add New Post"}</Modal.Title>
    </Modal.Header>
        <CreateEditPost post={props.post} categories={props.categories} close={props.close}/>
    </Modal>

CreateEditPostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    post: PropTypes.object
}

export default CreateEditPostModal;