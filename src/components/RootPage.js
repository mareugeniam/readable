import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadComposedPostData, doPostVote, doSort, doDeletePost } from '../actions/actionsHandler';
import { MdAddCircle, MdArrowDownward, MdArrowUpward, MdClear, MdEdit } from 'react-icons/lib/md';
import LikeDislikeToggle from './LikeDislikeToggle';
import CreateEditPostModal from './CreateEditPostModal';

class RootPage extends Component{
    state = {
        selectedPost: null,
        addNewPostModalOpen: false,
        deletePostModalOpen: false,
        editPostModalOpen: false,
        selectedCategory: this.props.match.params.category || 'all categories'
    };

    componentDidMount() {
        this.props.fetchData();
    };

    selectCategoryHandler = (category) => {
        this.setState({ selectedCategory: category });
        category ===  'all categories' 
            ? this.props.history.push(`/`)
            : this.props.history.push(`/${category}`);
    };

    openAddNewPostModal = () => this.setState(() => ({ addNewPostModalOpen: true }));
    closeAddNewPostModal = () => this.setState(() => ({ addNewPostModalOpen: false, selectedPost: null }));
    openDeletePostModal = () => this.setState(() => ({ deletePostModalOpen: true }));
    closeDeletePostModal = () => this.setState(() => ({ deletePostModalOpen: false, selectedPost: null }));
    openEditPostModal = () => this.setState(() => ({ editPostModalOpen: true }));
    closeEditPostModal = () => this.setState(() => ({ editPostModalOpen: false, selectedPost: null }));

    handleSelectedPost = (post) => this.setState({ selectedPost: post });

    handleDeletePost = () => {
        this.props.deletePost(this.state.selectedPost.id);        
        this.closeDeletePostModal();
    };

    handleSelectedRow = (event, category, postId) => {
        event.target.tagName === 'TD' &&
        this.props.history.push(`/${category}/${postId}`);
    };

    sortHandler = (sortKey) => {
        this.props.sort(sortKey, this.props.sorter.sortKey === sortKey 
            ? this.props.sorter.sortOrder 
            : 0);
    };

    render() {
        const { categories, posts, vote, sorter } = this.props;
        const { addNewPostModalOpen, deletePostModalOpen, 
            editPostModalOpen, selectedCategory, selectedPost } = this.state;
        
        return (            
            <div className="container">
                <div className="form-inline">
                    <div className="form-group">
                    <h1>Posts <small>by</small></h1>
                    </div>
                    <div className="form-group select-padding">
                    <select
                        value={selectedCategory}
                        onChange={(event) => {
                            this.selectCategoryHandler(event.target.value);
                        }}
                    >
                        <option key="all categories">all categories</option>
                        {categories.map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    </div>
                </div>
                <div className="row">
                    <Table responsive condensed hover>
                        <thead>
                            <tr>               
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th># of Comments</th>
                                <th>                                    
                                    <Button
                                        onClick={() => this.sortHandler('timestamp')}>
                                        Date
                                        {
                                            (sorter.sortKey !== "timestamp" ||
                                            (sorter.sortKey === "timestamp" && 
                                            sorter.sortOrder !== 1)) &&
                                            <MdArrowUpward size={18} /> 
                                        }
                                        {   
                                            (sorter.sortKey !== "timestamp" ||
                                            (sorter.sortKey === "timestamp" &&
                                            sorter.sortOrder !== 2)) &&
                                            <MdArrowDownward size={18} /> 
                                        }
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        onClick={() => this.sortHandler('voteScore')}>
                                        Score
                                        {
                                            (sorter.sortKey !== "voteScore" ||
                                            (sorter.sortKey === "voteScore" && 
                                            sorter.sortOrder !== 1)) &&
                                            <MdArrowUpward size={18} /> 
                                        }
                                        {   
                                            (sorter.sortKey !== "voteScore" ||
                                            (sorter.sortKey === "voteScore" &&
                                            sorter.sortOrder !== 2)) &&
                                            <MdArrowDownward size={18} /> 
                                        }
                                    </Button>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.filter(p => 
                                (this.props.match.params.category && this.props.match.params.category === p.category) 
                                || (this.props.match.path === "/" && p))
                                  .map((post, index) => (
                                <tr key={`${post.id}`} 
                                    onClick={(event) => {this.handleSelectedRow(event, post.category, post.id)}}
                                >
                                    <td>{post.title}</td>
                                    <td>{post.author}</td>
                                    <td>{post.category}</td>
                                    <td>{post.comments.length}</td>
                                    <td>{new Date(post.timestamp).toDateString()}</td>
                                    <td><LikeDislikeToggle itemVoted={post} vote={vote}/></td>
                                    <td>
                                        <div className="btn-group">
                                        <Button
                                            className="form-button"
                                            bsStyle="link"
                                            onClick={() => {
                                                this.handleSelectedPost(post);
                                                this.openEditPostModal();
                                            }}>
                                            <MdEdit size={20}/>
                                        </Button>
                                        <Button
                                            className="form-button"
                                            bsStyle="link"
                                            onClick={ () => {
                                                this.handleSelectedPost(post);
                                                this.openDeletePostModal();
                                            }}>
                                            <MdClear size={20}/>
                                        </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}                    
                        </tbody>
                    </Table>
                </div>
                <div className="row text-right">
                    <Button
                        className="form-button"
                        bsStyle="link"
                        onClick={this.openAddNewPostModal}>
                        <MdAddCircle size={48}/>
                    </Button>
                </div>                

                <CreateEditPostModal 
                    open={addNewPostModalOpen}
                    close={this.closeAddNewPostModal}
                    categories={categories}/>

                <CreateEditPostModal 
                    open={editPostModalOpen}
                    close={this.closeEditPostModal}
                    categories={categories}
                    post={selectedPost}/>

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
                            onClick={() => this.handleDeletePost()}                            
                        >Delete</Button>
                        <Button
                            onClick={this.closeDeletePostModal}
                            bsStyle="danger"
                        >Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ categories, posts, comments, sortData }) => {
    let sortByColumn = sortData["sort"];
    let defaultSortColumn = 'voteScore';
    return {
        categories: Object.keys(categories).map(category => categories[category]),
        posts: Object.keys(posts)
                .filter(postId => posts[postId].deleted === false)
                .map(postId => {
                    posts[postId].comments =  Object.keys(comments)
                    .map(commentId => comments[commentId])
                    .filter(comment => comment.deleted === false && comment.parentId === postId);
                
                    return posts[postId];
                }).sort((a,b) => {
                    if (sortByColumn !== undefined){
                        switch (sortByColumn.sortOrder){
                            case 1:
                                return (a[sortByColumn.sortKey] - b[sortByColumn.sortKey]);
                            case 2:
                                return (b[sortByColumn.sortKey] - a[sortByColumn.sortKey]);
                            default:
                                return 0;
                        }
                    } else {
                        return (b[defaultSortColumn] - a[defaultSortColumn]);
                    }        
                }),
        sorter: {
            ...sortData["sort"]
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(loadComposedPostData()),
        vote: (post, option) => dispatch(doPostVote(post, option)),
        sort: (sortKey, sortOrder=-1) => dispatch(doSort("sort", sortKey, sortOrder)),
        deletePost: (postId) => dispatch(doDeletePost(postId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootPage);