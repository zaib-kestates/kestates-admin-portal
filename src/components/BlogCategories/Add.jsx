import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { postData } from '../../services/BlogCategory';

function AddBlogCategory({ handleCancel }) {
  const [name, setName] = useState();

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    await postData({ name });

    handleCancel(true);
  };

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
            onClick={() => handleCancel()}
          />
        </div>
      </div>
    </form>
  );
}

AddBlogCategory.propTypes = {
  handleCancel: PropTypes.func,
};

export default AddBlogCategory;
