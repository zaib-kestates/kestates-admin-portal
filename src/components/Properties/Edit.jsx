import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';

import { getData, updateData } from '../../services/Property';
import Blog from '../../assets/blog.jpg';

function EditProperty() {
  const navigate = useNavigate();
  const params = useParams();
  const [property, setProperty] = useState();
  
  // Handle cancel click
  const handleCancel = (e) => {
    e.preventDefault();

    navigate('/properties');
  };

  // Handle save click
  const handleSave = (e) => {
    e.preventDefault();

    updateData(params.id, {
      title: property.title,
      qr_code_link: property.qr_code_link,
    });
  };

  const updateState = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    });
  } 

  const fetchData = async () => {
    const data = await getData(`properties/${params.id}`);
    setProperty(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!property) return;
  return (
    <>
      <label className="page-header">Edit Property</label>

      <form>
        <div className="row">
          <div className="col-md-12">
            <Image src={Blog} className="img-banner" />
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
        </div>

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
