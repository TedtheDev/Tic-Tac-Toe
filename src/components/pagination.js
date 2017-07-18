import React from 'react';
import PropTypes from 'prop-types'

const Pagination = (props) => {
  // current page
  // amountOfPages

  return (
    <div>
      {props}
    </div>
  )
}

Pagination.propTypes = {
  renderButtons: PropTypes.func.isRequired
}

export default Pagination;
