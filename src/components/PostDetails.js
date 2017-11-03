import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPostByIdWithComments, doPostVote, doDeletePost } from '../actions/postsActions';
import { Label, Button, Grid, Row, Col, Modal } from 'react-bootstrap';
import { MdPerson, MdDateRange, MdChatBubble, MdStyle, MdClear, MdEdit } from 'react-icons/lib/md';
import NotFoundPage from './NotFoundPage';
import LikeDislikeToggle from './LikeDislikeToggle';
import CreateEditPostModal from './CreateEditPostModal';
import Comment from './Comment';
import CreateEditCommentModal from './CreateEditCommentModal';
import CategoriesNavBar from './CategoriesNavBar';

class PostDetails extends Component {
    state = {
        deletePostModalOpen: false,
        editPostModalOpen: false,
        commentsFeedOpen: true,
        addNewCommentModalOpen: false,
        defaultSort: 'voteScore'
    };

    componentDidMount() {
        this.getPost(this.props.match.params.id);
    }

    openDeletePostModal = () => this.setState(() => ({ deletePostModalOpen: true }));
    closeDeletePostModal = () => this.setState(() => ({ deletePostModalOpen: false }));
    openEditPostModal = () => this.setState(() => ({ editPostModalOpen: true }));
    closeEditPostModal = () => this.setState(() => ({ editPostModalOpen: false }));
    openAddNewCommentModal = () => this.setState(() => ({ addNewCommentModalOpen: true }));
    closeAddNewCommentModal = () => this.setState(() => ({ addNewCommentModalOpen: false }));

    getPost(postId) {
        const postExists = this.props.posts.find(p => p.id === postId);
        if (!postExists) {
            this.props.fetchPost(postId);
        }
    }

    handleDeletePost = (post) => {
        this.props.deletePost(post.id);        
        this.closeDeletePostModal();
        this.props.history.push(`/`);
    };

    getFilteredComments = (post) => {
        let filteredComments = post.comments.sort((a,b) => {
            return (b[this.state.defaultSort] - a[this.state.defaultSort]);
        });
        return filteredComments;
    };

    render() {
        const post = this.props.posts.filter(p => p.id === this.props.match.params.id);
        const { vote, categories } = this.props;
        const { editPostModalOpen, deletePostModalOpen, commentsFeedOpen, addNewCommentModalOpen } = this.state;

        return(
            <div>
                {post[0] !== undefined ? (
                <div>
                    <div className="row col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2">
                        <CategoriesNavBar categories={categories} history={this.props.history}/>
                    </div>
                    <Grid className="grid-margin-bottom">
                        <Row>
                            <Col xs={8} xsOffset={2} md={8} mdOffset={2}><h1>{post[0].title}</h1></Col>
                        </Row>
                        <Row>
                            <Col xs={6} xsOffset={2} md={6} mdOffset={2}>
                                <p className="no-margin-bottom">
                                    <MdPerson size={20}/> by {post[0].author} <MdDateRange size={20}/> {new Date(post[0].timestamp).toDateString()}
                                </p>
                            </Col>
                            <Col xs={2} md={2}>
                                <div className="text-right">
                                    <Button
                                        className="form-button no-padding"
                                        bsStyle="link"
                                        onClick={() => {
                                            this.openEditPostModal();
                                        }}>
                                        <MdEdit size={22}/>
                                    </Button>
                                    <Button
                                        className="form-button no-padding"
                                        bsStyle="link"
                                        onClick={ () => {
                                            this.openDeletePostModal();
                                        }}>
                                        <MdClear size={22}/>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} xsOffset={2} md={8} mdOffset={2}><hr className="no-margin-top"/></Col>
                        </Row>
                        <Row>
                            <Col xs={8} xsOffset={2} md={8} mdOffset={2}><p>{post[0].body}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={8} xsOffset={2} md={8} mdOffset={2}><hr className="no-margin-bottom"/></Col>
                        </Row>
                        <Row>
                            <Col xs={6} xsOffset={2} md={6} mdOffset={2}>
                                <p><Button bsStyle="link" onClick={() => this.setState({commentsFeedOpen: !commentsFeedOpen })}><MdChatBubble size={20}/> {post[0].comments.length} comment{post[0].comments.length !== 1 && "s"}</Button> | <MdStyle size={20}/> <Label bsStyle="info">{post[0].category}</Label></p>
                            </Col>
                            <Col xs={2} md={2}>
                                <div className="text-right">
                                    <LikeDislikeToggle itemVoted={post[0]} vote={vote}/>
                                </div>
                            </Col>
                        </Row>
                        {commentsFeedOpen && 
                            <Row>
                                <Col xs={8} xsOffset={2} md={8} mdOffset={2}><hr/></Col>
                            </Row>
                        }                        
                        {commentsFeedOpen && 
                            (post[0].comments.length > 0
                                ? (this.getFilteredComments(post[0]).map(comment => (
                                <Comment key={`${comment.id}`} comment={comment}/>
                            ))) : (<div className="row col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2">
                                        No comments yet. Be the first one to comment
                                   </div>))
                        }
                        
                        
                        <Row>
                            <Col xs={8} xsOffset={2} md={8} mdOffset={2}><hr/></Col>
                        </Row>
                        <Row>
                            <Col xs={8} xsOffset={2} md={8} mdOffset={2}>
                            <div className="text-right">
                                <Button
                                    onClick={ () => this.openAddNewCommentModal()}
                                >Comment
                                </Button>
                            </div>
                            </Col>
                        </Row>        
                        
                    </Grid>

                    <CreateEditPostModal 
                    open={editPostModalOpen}
                    close={this.closeEditPostModal}
                    categories={categories}
                    post={post[0]}/>

                    <CreateEditCommentModal 
                    open={addNewCommentModalOpen}
                    close={this.closeAddNewCommentModal}
                    post={post[0]}/>

                    <Modal
                        show={deletePostModalOpen}
                        onHide={this.closeDeletePostModal}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Post</Modal.Title>
                        </Modal.Header>                        
                        <Modal.Body>
                            Are you sure you want to delete this post?
                        </Modal.Body>
                        <Modal.Footer>                        
                            <Button
                                onClick={() => this.handleDeletePost(post[0])}    
                            >Delete</Button>
                            <Button
                                onClick={this.closeDeletePostModal}
                                bsStyle="danger"
                            >Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </div>              
                    
                ) : (<NotFoundPage/>)} 
            </div>            
        );
    }
}

const mapStateToProps = ({ categories, posts, comments }) => {
    let defaultSortColumn = 'voteScore';
    return {
        categories: Object.keys(categories).map(category => categories[category]),
        posts: Object.keys(posts)
            .filter(postId => posts[postId].deleted === false)
            .map(postId => {
                posts[postId].comments = Object.keys(comments)
                    .map(commentId => comments[commentId])
                    .filter(comment => comment.deleted === false && comment.parentId === postId)
                return posts[postId];
            })
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (postId) => dispatch(loadPostByIdWithComments(postId)),
        vote: (post, option) => dispatch(doPostVote(post, option)),
        deletePost: (postId) => dispatch(doDeletePost(postId)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);