import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { update } from '../../services/BlogCategory';
import useFetchBlogCategories from '../../hooks/useFetchBlogCategories';

function EditBlogCategory({ handleCancel, categoryId }) {
  const [name, setName] = useState();
  const category = useFetchBlogCategories(`blog-categories/${categoryId}`);

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    await update(categoryId, { name });

    handleCancel(true, 'edit');
  };

  // Update category name when loaded
  useEffect(() => {
    if (category) setName(category.name);
  }, [category]);

  if (!category) return;
  return (
    <form>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="name" className="control-label">
            Name
          </label>
          <InputText
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></InputText>
        </div>

        <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
          <Button label="Save" onClick={save} />
          <Button
            type="button"
            className="ms-2"
            label="Cancel"
            severity="secondary"
            onClick={() => handleCancel(false, 'edit')}
          />
        </div>
      </div>
    </form>
  );
}

EditBlogCategory.propTypes = {
  handleCancel: PropTypes.func,
};

export default EditBlogCategory;
