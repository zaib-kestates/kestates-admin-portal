import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

import { getData, updateData } from "../../services/Property";
import { publishStatus, propertyStatus } from "../../constants/properties";
import useFetchPropertyTypes from "../../hooks/useFetchPropertyTypes";
import useFetchLocations from "../../hooks/useFetchLocations";
import useFetchTeams from "../../hooks/useFetchTeams";
import useFetchAmenities from "../../hooks/useFetchAmenities";
import MetadataFrom from "../Blogs/Metadata-form";
import { populateFormData } from "../../helpers";
import Errors from "../Layouts/Errors";
import MetadataForm from "../Blogs/Metadata-form";

function EditProperty() {
  const navigate = useNavigate();
  const params = useParams();
  const imageRef = useRef();
  const [property, setProperty] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState();
  const propertyTypes = useFetchPropertyTypes();
  const locations = useFetchLocations();
  const teams = useFetchTeams();
  const amenities = useFetchAmenities();

  // Handle file change
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

  // Handle save click
  const handleSave = async (e) => {
    e.preventDefault();

    // Add data in form object (for image)
    const formData = populateFormData(property);
    formData.append("file", file);

    // Save data
    try {
      await updateData(params.id, formData);
      setErrors(null);

      navigate("/properties", {
        state: { showMessage: true },
      });
    } catch (error) {
      setErrors(error.response.data.messages);
      window.scrollTo(0,0);
    }
  };

  const updateState = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async () => {
    const data = await getData(`properties/${params.id}`);
    setProperty(data);
    setFile(data.picture);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!property) return;
  return (
    <>
      {/* Header */}
      <label className="page-header">Edit Property</label>

      {/* Errors */}
      {errors && <Errors errors={errors} />}

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
              style={{ height: "130px" }}
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

export default EditProperty;
