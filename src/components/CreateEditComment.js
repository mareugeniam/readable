import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { doAddComment, doUpdateComment } from '../actions/commentsActions';
import UUID from 'uuid';

class CreateEditComment extends Component {
    state = {
        comment: {
            author: '',
            body: ''
        },
        afterValidate: false
    };

    componentDidMount() {
        const initialComment = this.props.comment !== undefined 
            ? this.props.comment 
            : this.state.comment;
        this.setState({ comment: { ...initialComment } });
    };

    handleSubmitForm = () => {
        let toComment = null;       
            
        if (this.getValidationStateAfterSubmit() === true) {
            toComment = {
                ...this.state.comment,
                timestamp: Date.now()
            };

            this.createEditComment(toComment);
            this.clearComment();
            this.props.close();
        }
    };

    createEditComment = (comment) => {
        if(comment.id === undefined){
            comment.id = UUID();
            comment.parentId = this.props.post.id;
            this.props.createComment(comment);
        }else {
            this.props.editComment(comment);
        };
    };

    getValidationStateAfterSubmit = () => {
        let validateSuccess = false;
        this.clearAfterValidate();

        if (this.getValidationState(this.state.comment.author) === 'success'
            && this.getValidationState(this.state.comment.body) === 'success') {
                validateSuccess = true;
        }

        if (validateSuccess === false) {
            this.setState({ afterValidate: true });
        }

        return validateSuccess;
    };
    
    getValidationState = (value) => {
        return typeof value === 'string' 
            && value.trim().length > 0 ? 'success' : 'error';
    };
        
    handleAuthorChange = (value) => 
        this.setState({ comment: {...this.state.comment, author: value} });

    handleMessageChange = (value) =>
        this.setState({ comment: {...this.state.comment, body: value }});

    clearComment = () => {
        this.handleAuthorChange('');
        this.handleMessageChange('');
    };

    clearAfterValidate = () => {
        this.setState({ afterValidate: false });
    };

    render() {
        const { comment, afterValidate } = this.state;
        const { close } = this.props;

        return(
            <div>
            <Modal.Body>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        this.handleSubmitForm();
                    }}
                >
                    {afterValidate &&
                        <Alert bsStyle="danger">
                            <strong>Please</strong> make sure all required fields are filled out properly before Submitting!
                        </Alert>}
                    <FormGroup
                        controlId="commentAuthor"
                        validationState={this.getValidationState(comment.author)}
                        >
                        <ControlLabel>Author</ControlLabel>
                        <FormControl
                            type="text"
                            value={comment.author}
                            placeholder="Enter text"
                            onChange={(event) => this.handleAuthorChange(event.target.value)}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup 
                        controlId="commentBody"
                        validationState={this.getValidationState(comment.body)}
                        >
                        <ControlLabel>Message</ControlLabel>
                        <FormControl 
                            componentClass="textarea" 
                            placeholder="Enter text"
                            value={comment.body}
                            onChange={(event) => this.handleMessageChange(event.target.value)}
                        />
                    </FormGroup>
                    <div className="modal-footer">                        
                        <Button type="submit">Submit</Button>
                        <Button
                            bsStyle="danger"
                            onClick={close}
                        >Cancel</Button>
                    </div>
                </form>
            </Modal.Body>
        </div>
            
        );
    }
}

CreateEditComment.propTypes = {
    close: PropTypes.func.isRequired,
    comment: PropTypes.object,
    post: PropTypes.object
}

function mapDispatchToProps(dispatch) {
    return {
        createComment: (comment) => dispatch(doAddComment(comment)),
        editComment: (comment) => dispatch(doUpdateComment(comment))
    }
}

export default connect(null, mapDispatchToProps)(CreateEditComment);