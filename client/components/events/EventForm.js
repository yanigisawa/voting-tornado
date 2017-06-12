import React from 'react';
import {PropTypes} from 'prop-types';
import TextInput from '../common/TextInput';
import CategoryItemList from './CategoryItemList';

// Inline Styles in JSX: https://speakerdeck.com/vjeux/react-css-in-js
const EventForm = ({event, allCategories, onSave, onChange, onNewCategory, loading, errors, saving, removeCategory}) => {
  let styles = {
    marginLeft: 20,
    marginBottom: 15
  };

  return (
    <form>
      <TextInput
        name="title"
        label="Title"
        value={event.title}
        onChange={onChange}
        error={errors.title} />
      
      <div style={styles}>
        <CategoryItemList
          categories={event.categories}
          onChange={onChange}
          onNewCategory={onNewCategory}
          removeCategory={removeCategory} />
      </div>

      <TextInput
        name="startDate"
        label="Start Date"
        value={event.startDate}
        onChange={onChange}
        error={errors.length} />


      <TextInput
        name="endDate"
        label="End Date"
        value={event.endDate}
        onChange={onChange}
        error={errors.length} />

      <input type="submit" disabled={loading || saving} 
        value={(loading || saving) ? "Saving..." : "Save"} className="btn btn-primary" onClick={onSave} />
    </form>
  );
};

EventForm.propTypes = {
  event : PropTypes.object.isRequired, 
  allCategories: PropTypes.array, 
  onSave: PropTypes.func.isRequired, 
  onChange: PropTypes.func.isRequired,
  onNewCategory: PropTypes.func.isRequired,
  loading : PropTypes.bool,
  errors: PropTypes.object,
  saving: PropTypes.bool,
  removeCategory: PropTypes.func.isRequired
};

export default EventForm;