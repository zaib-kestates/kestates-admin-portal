import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { getData, updateData } from '../../services/Amenity';

function EditAmenity({ handleCancel, amenityId }) {
  const [amenity, setAmenity] = useState();

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    await updateData(amenity);

    handleCancel(true, 'edit');
  };

  // Function to get data
  const fetchAmenities = async () => {
    const data = await getData(`amenities/${amenityId}`);
    setAmenity(data);
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  if (!amenity) return;
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
            value={amenity.name}
            onChange={(e) => setAmenity({ ...amenity, name: e.target.value })}
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

EditAmenity.propTypes = {
  handleCancel: PropTypes.func,
  amenityId: PropTypes.number,
};

export default EditAmenity;
