import React from "react";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

function MetadataForm({
  title,
  description,
  canonical_url,
  focus_keywords,
  updateState,
}) {
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
          <label htmlFor="canonical_url" className="control-lanel">
            Canonical URL
          </label>
          <InputText
            name="metadata_canonical_url"
            className="form-control"
            value={canonical_url}
            onChange={updateState}
          ></InputText>
        </div>
        <div className="col-md-12 mt-2 pt-2">
          <label htmlFor="focus_keywords" className="control-label">
            Focus Keywords
          </label>
          <InputText
            name="metadata_focus_keywords"
            className="form-control"
            value={focus_keywords}
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
  canonical_url: PropTypes.string,
  focus_keywords: PropTypes.string,
  updateState: PropTypes.func,
};

export default MetadataForm;
