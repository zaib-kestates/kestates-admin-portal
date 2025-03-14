import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

import { propertyStatus, publishStatus } from "../../constants/properties";
import useFetchPropertyTypes from "../../hooks/useFetchPropertyTypes";
import useFetchTeams from "../../hooks/useFetchTeams";
import useFetchLocations from "../../hooks/useFetchLocations";
import useFetchAmenities from "../../hooks/useFetchAmenities";
import { populateFormData } from "../../helpers";
import { propertyTemplate } from "../../constants";
import { saveData } from "../../services/Property";
import MetadataForm from "../Blogs/Metadata-form";
import Errors from "../Layouts/Errors";
import Blog from "../../assets/blog.jpg";

function AddProperty() {
  const [file, setFile] = useState(Blog);
  const [errors, setErrors] = useState();
  const [property, setProperty] = useState(propertyTemplate);
  const imageRef = useRef();
  const navigate = useNavigate();
  const propertyTypes = useFetchPropertyTypes();
  const locations = useFetchLocations();
  const teams = useFetchTeams();
  const amenities = useFetchAmenities();

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setProperty({
      ...property,
      file: e.target.files[0],
    });
  };

  // Handle cancel click
  const handleCancel = (e) => {
    e.preventDefault();

    navigate("/properties");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Add data in form object (for image)
    const formData = populateFormData(property);

    try {
      await saveData(formData);
      setErrors(null);

      navigate("/properties", {
        state: { showMessage: true },
      });
    } catch (error) {
      setErrors(error.response.data.messages);
      window.scrollTo(0, 0);
    }
  };

  const updateState = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Header */}
      <label className="page-header">Add Property</label>

      {/* Errors */}
      {errors && <Errors errors={errors} />}

      {/* Form */}
      <form>
        <div className="row">
          <div className="col-md-12">
            <Image
              src={file}
              className="img-banner"
              onClick={() => imageRef.current.click()}
            />
            <input type="file" ref={imageRef} onChange={handleFileChange} />
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="title" className="control-label">
              Title
            </label>
            <InputText
              name="title"
              className="form-control"
              value={property.title}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="bed" className="control-label">
              Bed
            </label>
            <InputText
              name="bed"
              className="form-control"
              value={property.bed}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="bath" className="control-label">
              Bath
            </label>
            <InputText
              name="bath"
              className="form-control"
              value={property.bath}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="size" className="control-label">
              Size
            </label>
            <InputText
              name="size"
              className="form-control"
              value={property.size}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="permit_no" className="control-label">
              Permit Number
            </label>
            <InputText
              name="permit_no"
              className="form-control"
              value={property.permit_no}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="permit_no" className="control-label">
              Reference Number
            </label>
            <InputText
              name="reference_number"
              className="form-control"
              value={property.reference_number}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="slug" className="control-label">
              Slug
            </label>
            <InputText
              name="slug"
              className="form-control"
              value={property.slug}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="qr_code_link" className="control-label">
              QR Code Link
            </label>
            <InputText
              name="qr_code_link"
              className="form-control"
              value={property.qr_code_link}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="price" className="control-label">
              Price
            </label>
            <InputText
              name="price"
              className="form-control"
              value={property.price}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-3 mt-2 pt-2">
            <label htmlFor="department" className="control-label">
              Status
            </label>
            <Dropdown
              name="status"
              options={propertyStatus}
              className="w-full md:w-14rem"
              placeholder="Select"
              value={property.status}
              onChange={updateState}
            ></Dropdown>
          </div>
          <div className="col-md-3 mt-2 pt-2">
            <label htmlFor="department" className="control-label">
              Publish Status
            </label>
            <Dropdown
              name="publish_status"
              options={publishStatus}
              className="w-full md:w-14rem"
              placeholder="Select"
              value={property.publish_status}
              onChange={updateState}
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="department" className="control-label">
              Property Type
            </label>
            <Dropdown
              name="PropertyTypeId"
              options={propertyTypes}
              className="w-full md:w-14rem"
              placeholder="Select"
              optionLabel="name"
              optionValue="id"
              value={property.PropertyTypeId}
              onChange={updateState}
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="department" className="control-label">
              Location
            </label>
            <Dropdown
              name="LocationId"
              options={locations}
              className="w-full md:w-14rem"
              placeholder="Select"
              optionLabel="name"
              optionValue="id"
              value={property.LocationId}
              onChange={updateState}
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="department" className="control-label">
              Team
            </label>
            <Dropdown
              name="TeamId"
              options={teams}
              className="w-full md:w-14rem"
              placeholder="Select"
              optionLabel="name"
              optionValue="id"
              value={property.TeamId}
              onChange={updateState}
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="Amenities" className="control-label">
              Amenities
            </label>
            <MultiSelect
              name="Amenities"
              className="w-full md:w-14rem"
              placeholder="Select"
              optionLabel="name"
              optionValue="id"
              options={amenities}
              value={property.Amenities}
              onChange={(e) =>
                setProperty({
                  ...property,
                  Amenities: e.value,
                })
              }
            ></MultiSelect>
          </div>
          <div className="col-md-12 pt-2 mt-2">
            <label htmlFor="caption" className="control-label">
              Description
            </label>
            <InputTextarea
              name="description"
              className="form-control property-description"
              rows="8"
              value={property.description}
              onChange={updateState}
            ></InputTextarea>
          </div>
        </div>

        {/* Metadata */}
        <MetadataForm
          title={property.metadata_title}
          description={property.metadata_description}
          canonical_url={property.metadata_canonical_url}
          focus_keywords={property.metadata_focus_keywords}
          updateState={updateState}
        />

        <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
          <Button label="Save" onClick={handleSave} />
          <Button
            className="ms-2"
            label="Cancel"
            severity="secondary"
            onClick={handleCancel}
          />
        </div>
      </form>
    </>
  );
}

export default AddProperty;
