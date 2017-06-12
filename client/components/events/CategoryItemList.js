import React from 'react';
import {PropTypes} from 'prop-types';
import CategoryItem from './CategoryItem';

const CategoryItemList = ({categories, onChange, onNewCategory, removeCategory}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr><td>Category Name</td><td>Weight</td><td>&nbsp;</td></tr>
        </thead>
        <tbody>
        {categories.map(c => 
          <CategoryItem key={c.id} category={c} onChange={onChange} removeCategory={removeCategory} />
        )}
        </tbody>
      </table>
      <input type="button" value="Add Category" className="btn btn-primary" onClick={onNewCategory} />
    </div>
  );
};

CategoryItemList.propTypes = {
  categories: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onNewCategory: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired
};

export default CategoryItemList;