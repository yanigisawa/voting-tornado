import React from 'react';
import {PropTypes} from 'prop-types';
import CategoryItem from './CategoryItem';

const CategoryItemList = ({categories, onChange, onNewCategory}) => {
  return (
    <div>
      <table>
        <thead>
          <tr><td>Category Name</td><td>Weight</td></tr>
        </thead>
        <tbody>
        {categories.map(c => 
          <CategoryItem key={c.id} category={c} onChange={onChange} />
        )}
        </tbody>
      </table>
      <input type="button" value="Add" className="btn btn-primary" onClick={onNewCategory} />
    </div>
  );
};

CategoryItemList.propTypes = {
  categories: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onNewCategory: PropTypes.func.isRequired
};

export default CategoryItemList;