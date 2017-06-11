import React from 'react';
import {PropTypes} from 'prop-types';
import TextInput from '../common/TextInput';
import CategoryItemList from './CategoryItemList';

const EventForm = ({event, allCategories, onSave, onChange, onNewCategory, loading, errors, saving}) => {
  return (
    <form>
      <TextInput
        name="title"
        label="Title"
        value={event.title}
        onChange={onChange}
        error={errors.title} />

      <CategoryItemList
        categories={event.categories}
        onChange={onChange}
        onNewCategory={onNewCategory} />

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
  saving: PropTypes.bool
};

export default EventForm;