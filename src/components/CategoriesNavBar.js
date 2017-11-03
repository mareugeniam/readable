import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoriesNavBar = (props) =>
    <ButtonGroup justified>
        <Link to="/" className="btn btn-success">All categories</Link>
        {props.categories.map(category => (
            <Button key={category.name} href="#" onClick={() => {
                            props.history.push(`/${category.name}`);
                        }}
            >{category.name}</Button>
        ))}
    </ButtonGroup>

CategoriesNavBar.propTypes = {
    categories: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
}

export default CategoriesNavBar;