import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import PropTypes from 'prop-types';
import { saveData } from '../../services/Partner';
import Logo from '../../assets/user-prof.png';
import { partnerTemplate } from '../../constants';
import { populateFormData } from '../../helpers';

function AddPartner({ handleCancel }) {
  const imageRef = useRef(null);
  const [partner, setPartner] = useState(partnerTemplate);
  const [file, setFile] = useState(Logo);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setPartner({ ...partner, file: e.target.files[0] });
  };

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    // Add data in form object (for image)
    const formData = populateFormData(partner);
    await saveData(formData);

    handleCancel(true);
  };

  // Function to update state
  const updateState = (e) => {
    setPartner({ ...partner, [e.target.name]: e.target.value });
  };

  return (
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
            onClick={() => handleCancel()}
          />
        </div>
      </div>
    </form>
  );
}

AddPartner.propTypes = {
  handleCancel: PropTypes.func,
};

export default AddPartner;
