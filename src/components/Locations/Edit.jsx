import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { getData, updateData } from '../../services/Location';
import { locationTemplate } from '../../constants';
import useFetchStates from '../../hooks/useFetchStates';

function EditLocation({ handleCancel, locationId }) {
  const [location, setLocation] = useState(locationTemplate);
  const states = useFetchStates();

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    await updateData(location);

    handleCancel(true, 'edit');
  };

  // Function to update state
  const updateState = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  // Function to get data
  const fetchLocation = async () => {
    const data = await getData(`locations/${locationId}`);
    setLocation(data);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (!location) return;
  return (
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
          <label htmlFor="StateId" className="control-label">
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
            onClick={() => handleCancel(false, 'edit')}
          />
        </div>
      </div>
    </form>
  );
}

EditLocation.propTypes = {
  handleCancel: PropTypes.func,
  locationId: PropTypes.number,
};

export default EditLocation;
