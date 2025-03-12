import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

import { getData, saveData } from '../../services/Metadata';
import Errors from '../Layouts/Errors';

function Metadata({ handleCancel }) {
  const [metadata, setMetadata] = useState();
  const [errors, setErrors] = useState();

  // Function to update state
  const updateState = (e) => {
    setMetadata({
      ...metadata,
      [e.target.name]: e.target.value,
    });
  };

  // Handle save click
  const save = async (e) => {
    e.preventDefault();

    try {
      await saveData(metadata, 'teams');
      handleCancel(e, true);
    } catch (error) {
      setErrors(error.response.data.messages);
    }
  };

  // Function to get metadata
  const getMetadata = async () => {
    const data = await getData('teams');
    setMetadata(data);
  };

  useEffect(() => {
    getMetadata();
  }, []);

  if (!metadata) return;
  return (
    <>
      {/* Errors */}
      {errors && <Errors errors={errors} />}

      {/* Form */}
      <form>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="title" className="control-label">
              Title
            </label>
            <InputText
              name="title"
              className="form-control"
              value={metadata.title}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="header" className="control-label">
              Header
            </label>
            <InputText
              name="header"
              className="form-control"
              value={metadata.header}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="header" className="control-label">
              Canonical URL
            </label>
            <InputText
              name="canonical_url"
              className="form-control"
              value={metadata.canonical_url}
              onChange={updateState}></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="description" className="control-label">
              Description
            </label>
            <InputTextarea
              name="description"
              className="form-control"
              rows={5}
              value={metadata.description}
              onChange={updateState}
            ></InputTextarea>
          </div>

          <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
            <Button label="Save" onClick={save} />
            <Button
              type="button"
              className="ms-2"
              label="Cancel"
              severity="secondary"
              onClick={handleCancel}
            />
          </div>
        </div>
      </form>
    </>
  );
}

Metadata.prototypes = {
  handleCancel: PropTypes.func,
};

export default Metadata;
