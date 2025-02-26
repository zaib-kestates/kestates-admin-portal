import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

import { saveData } from '../../services/Department';
import { departmentTemplate } from '../../constants';
import Errors from '../Layouts/Errors';

function AddDepartment({ handleCancel }) {
  const [department, setDepartment] = useState(departmentTemplate);
  const [errors, setErrors] = useState();

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    try {
      await saveData(department);
      handleCancel(true);
    } catch (error) {
      setErrors(error.response.data.messages);
    }
  };

  // Function to update state
  const updateState = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Errors */}
      {errors && <Errors errors={errors} />}

      {/* Form */}
      <form>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="name" className="control-label">
              Name
            </label>
            <InputText
              name="name"
              className="form-control"
              value={department.name}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="name" className="control-label">
              Sorting Priority
            </label>
            <InputText
              name="sorting_priority"
              className="form-control"
              value={department.sorting_priority}
              onChange={updateState}
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
    </>
  );
}

AddDepartment.propTypes = {
  handleCancel: PropTypes.func,
};

export default AddDepartment;
