import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { MdThumbUp, MdThumbDown } from 'react-icons/lib/md';

export const LikeDislikeToggle = (props) => {
    return (
        <div>
            <Button 
                className="no-padding"
                bsStyle="link"
                onClick={(event) => {
                    event.preventDefault();
                    props.vote(props.itemVoted, true);
                }}>
                <MdThumbUp 
                    size={20}/>
            </Button>
            <span className="vote-score">{props.itemVoted.voteScore}</span>
            <Button 
                className="no-padding"
                bsStyle="link"
                onClick={(event) => {
                    event.preventDefault();
                    props.vote(props.itemVoted, false);
                }}>
                <MdThumbDown size={20}/>
            </Button>            
        </div>
    );
}

LikeDislikeToggle.propTypes = {
    itemVoted: PropTypes.object.isRequired,
    vote: PropTypes.func.isRequired
}

export default LikeDislikeToggle;