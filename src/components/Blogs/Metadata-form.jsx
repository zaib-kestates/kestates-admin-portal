import React from "react";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

function MetadataForm({ title, description, updateState }) {
  return (
    <>
      <label className="page-subheader mt-3 pt-2">Metadata</label>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="title" className="control-label">
            Title
          </label>
          <InputText
            name="metadata_title"
            className="form-control"
            value={title}
            onChange={updateState}
          ></InputText>
        </div>
        <div className="col-md-12 mt-2 pt-2">
          <label htmlFor="description">Description</label>
          <InputTextarea
            name="metadata_description"
            className="form-control"
            rows={5}
            value={description}
            onChange={updateState}
          ></InputTextarea>
        </div>
      </div>
    </>
  );
}

MetadataForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  updateState: PropTypes.func,
};

export default MetadataForm;
