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
import MetadataForm from "../Blogs/Metadata-form";
import Blog from "../../assets/blog.jpg";

const departments = [
  {
    name: "Management",
    code: 1,
  },
  { name: "Sales", code: 2 },
];

const languages = [
  {
    name: "English",
    code: "en",
  },
  {
    name: "Arabic",
    code: "ar",
  },
];

function AddProperty() {
  const [file, setFile] = useState(Blog);
  const [errors, setErrors] = useState();
  const [property, setProperty] = useState();
  const imageRef = useRef();
  const navigate = useNavigate();
  const propertyTypes = useFetchPropertyTypes();
  const locations = useFetchLocations();
  const teams = useFetchTeams();
  const amenities = useFetchAmenities();

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  // Handle cancel click
  const handleCancel = (e) => {
    e.preventDefault();

    navigate("/properties");
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Add data in form object (for image)
    const formData = populateFormData(property);
  };

  const updateState = (e) => {};

  return (
    <>
      {/* Header */}
      <label className="page-header">Add Property</label>

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
              onChange={updateState}
            ></InputTextarea>
          </div>
        </div>

        {/* Metadata */}
        <MetadataForm title={""} description={""} updateState={updateState} />

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
