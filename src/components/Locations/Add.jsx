import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

import { saveData } from '../../services/Location';
import { locationTemplate } from '../../constants';
import useFetchStates from '../../hooks/useFetchStates';
import Errors from '../Layouts/Errors';

function AddLocation({ handleCancel }) {
  const [location, setLocation] = useState(locationTemplate);
  const [errors, setErrors] = useState();
  const states = useFetchStates();

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    try {
      await saveData(location);
      handleCancel(true);
    } catch (error) {
      setErrors(error.response.data.messages);
    }
  };

  // Function to update state
  const updateState = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
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
              value={location.name}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="name" className="control-label">
              State
            </label>
            <Dropdown
              name="StateId"
              options={states}
              optionLabel="name"
              optionValue="id"
              value={location.StateId}
              onChange={updateState}
            ></Dropdown>
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

AddLocation.propTypes = {
  handleCancel: PropTypes.func,
};

export default AddLocation;
