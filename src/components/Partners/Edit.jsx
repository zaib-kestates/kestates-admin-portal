import { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

import { getData, updateData } from '../../services/Partner';
import { populateFormData } from '../../helpers';
import Errors from '../Layouts/Errors';

function EditPartner({ handleCancel, partnerId }) {
  const imageRef = useRef(null);
  const [partner, setPartner] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState();

  // HandleFileChange
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setPartner({ ...partner, file: e.target.files[0] });
  };

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    // Add data in form object (for image)
    const formData = populateFormData(partner);

    try {
      await updateData(partnerId, formData);
      handleCancel(true, 'edit');
    } catch (error) {
      setErrors(error.response.data.messages);
    }
  };

  // Function to update state
  const updateState = (e) => {
    setPartner({ ...partner, [e.target.name]: e.target.value });
  };

  // Function to get data
  const fetchPartner = async () => {
    const data = await getData(`partners/${partnerId}`);
    setPartner(data);
    setFile(data.picture);
  };

  useEffect(() => {
    fetchPartner();
  }, []);

  if (!partner) return;
  return (
    <>
      {/* Errors */}
      {errors && <Errors errors={errors} />}

      {/* Form */}
      <form>
        <div className="row">
          <div className="col-md-12 text-center">
            <Image
              className="image-team"
              src={file}
              onClick={() => imageRef.current.click()}
            ></Image>
            <input type="file" ref={imageRef} onChange={handleFileChange} />
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="name" className="control-label">
              Name
            </label>
            <InputText
              name="name"
              className="form-control"
              value={partner.name}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="url" className="control-label">
              Url
            </label>
            <InputText
              name="url"
              className="form-control"
              value={partner.url}
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
              onClick={() => handleCancel(false, 'edit')}
            />
          </div>
        </div>
      </form>
    </>
  );
}

EditPartner.propTypes = {
  handleCancel: PropTypes.func,
  partnerId: PropTypes.number,
};

export default EditPartner;
