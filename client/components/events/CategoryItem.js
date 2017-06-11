import React from 'react';
import {PropTypes} from 'prop-types';

const CategoryItem = ({category, onChange}) => {
  return (
    <tr>
      <td>
        <input type="text"
          name={"categoryName" + category.id}
          className="form-control"
          value={category.name}
          onChange={onChange} />
      </td>
      <td>
        <input type="text"
          name={"categoryWeight" + category.id}
          className="form-control"
          value={category.weight}
          onChange={onChange} />
      </td>
    </tr>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CategoryItem;