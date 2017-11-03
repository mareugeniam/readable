import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { doAddPost, doUpdatePost } from '../actions/postsActions';
import UUID from 'uuid';

class CreateEditPost extends Component {
    state = {
        post: {
            title : '',
            author: '',
            category: 'none',
            body: ''
        },
        afterValidate: false
    };

    componentDidMount() {
        const initialPost = this.props.post !== undefined 
            ? this.props.post 
            : this.state.post;
        this.setState({ post: { ...initialPost } });
    };

    handleSubmitForm = () => {
        let toPost = null;       
            
        if (this.getValidationStateAfterSubmit() === true) {
            toPost = {
                ...this.state.post,
                timestamp: Date.now()
            };

            this.createEditPost(toPost);
            this.clearPost();
            this.props.close();
        }
    };

    createEditPost = (post) => {
        if(post.id === undefined){
            post.id = UUID();
            this.props.createPost(post);
        }else {
            this.props.editPost(post);
        };
    };

    getValidationStateAfterSubmit = () => {
        let validateSuccess = false;
        this.clearAfterValidate();

        if (this.getValidationState(this.state.post.title) === 'success'
            && this.getValidationState(this.state.post.author) === 'success'
            && this.getValidationStateSelect(this.state.post.category) === 'success'
            && this.getValidationState(this.state.post.body) === 'success') {
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

    getValidationStateSelect = (value) => {
        return typeof value === 'string'
            && value !== 'none' ? 'success' : 'error';
    };
    
    handleTitleChange = (value) => 
        this.setState({ post: {...this.state.post, title: value} });
    
    handleAuthorChange = (value) => 
        this.setState({ post: {...this.state.post, author: value} });
    
    handleSelectChange = (value) => 
        this.setState({ post: {...this.state.post, category: value} });

    handleMessageChange = (value) =>
        this.setState({ post: {...this.state.post, body: value }});

    clearPost = () => {
        this.handleTitleChange('');
        this.handleAuthorChange('');
        this.handleSelectChange('none');
        this.handleMessageChange('');
    };

    clearAfterValidate = () => {
        this.setState({ afterValidate: false });
    };

    render() {
        const { post, afterValidate } = this.state;
        const { categories, close } = this.props;

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
                        controlId="postTitle"
                        validationState={this.getValidationState(post.title)}
                        >
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            value={post.title}
                            placeholder="Enter text"
                            onChange={(event) => this.handleTitleChange(event.target.value)}
                        />
                        <FormControl.Feedback />                                              
                    </FormGroup>
                    <FormGroup
                        controlId="postAuthor"
                        validationState={this.getValidationState(post.author)}
                        >
                        <ControlLabel>Author</ControlLabel>
                        <FormControl
                            type="text"
                            value={post.author}
                            placeholder="Enter text"
                            onChange={(event) => this.handleAuthorChange(event.target.value)}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup 
                        controlId="formControlsSelect"
                        validationState={this.getValidationStateSelect(post.category)}
                        >
                        <ControlLabel>Category</ControlLabel>
                        <FormControl 
                            componentClass="select"
                            placeholder="none"
                            value={post.category}
                            onChange={(event) => this.handleSelectChange(event.target.value)}
                        >
                            <option value="none">select</option>
                            {categories.map((category) => (
                                <option key={category.name} value={category.name}>{category.name}</option>
                            ))}                       
                        </FormControl>
                    </FormGroup>
                    <FormGroup 
                        controlId="postBody"
                        validationState={this.getValidationState(post.body)}
                        >
                        <ControlLabel>Message</ControlLabel>
                        <FormControl 
                            componentClass="textarea" 
                            placeholder="Enter text"
                            value={post.body}
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

CreateEditPost.propTypes = {
    categories: PropTypes.array.isRequired,
    close: PropTypes.func.isRequired,
    post: PropTypes.object
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (post) => dispatch(doAddPost(post)),
        editPost: (post) => dispatch(doUpdatePost(post))
    }
}

export default connect(null, mapDispatchToProps)(CreateEditPost);