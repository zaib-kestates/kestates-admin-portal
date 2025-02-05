import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import Blog from '../../assets/blog.jpg';

const departments = [
  {
    name: 'Management',
    code: 1,
  },
  { name: 'Sales', code: 2 },
];

const languages = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Arabic',
    code: 'ar',
  },
];

function AddProperty() {
  const navigate = useNavigate();

  // Handle cancel click
  const handleCancel = (e) => {
    e.preventDefault();

    navigate('/properties');
  };

  return (
    <>
      <label className="page-header">Add Property</label>

      <form>
        <div className="row">
          <div className="col-md-12">
            <Image src={Blog} className="img-banner" />
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="title" className="control-label">
              Title
            </label>
            <InputText id="title" className="form-control"></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="LocationId" className="control-label">
              Location
            </label>
            <Dropdown
              id="LocationId"
              className="w-full md:w-14rem"
              placeholder="Select"
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="bed" className="control-label">
              Bed
            </label>
            <InputText id="bed" className="form-control"></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="TeamId" className="control-label">
              Team
            </label>
            <Dropdown
              id="TeamId"
              className="w-full md:w-14rem"
              placeholder="Select"
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="bath" className="control-label">
              Bath
            </label>
            <InputText id="bath" className="form-control"></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="size" className="control-label">
              Size
            </label>
            <InputText id="size" className="form-control"></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="permit_no" className="control-label">
              Permit Number
            </label>
            <InputText id="permit_no" className="form-control"></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="slug" className="control-label">
              Slug
            </label>
            <InputText id="slug" className="form-control"></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="qr_code_link" className="control-label">
              QR Code Link
            </label>
            <InputText id="qr_code_link" className="form-control"></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="status" className="control-label">
              Status
            </label>
            <Dropdown
              id="status"
              className="w-full md:w-14rem"
              placeholder="Select"
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="PropertyTypeId" className="control-label">
              Type
            </label>
            <Dropdown
              id="PropertyTypeId"
              className="w-full md:w-14rem"
              placeholder="Select"
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="reference_number" className="control-label">
              Reference Number
            </label>
            <InputText
              id="reference_number"
              className="form-control"
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="price" className="control-label">
              Price
            </label>
            <InputText id="price" className="form-control"></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="description" className="control-label">
              Description
            </label>
            <InputTextarea
              id="description"
              className="form-control"
              rows="4"
            ></InputTextarea>
          </div>
        </div>

        <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
          <Button label="Save" />
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
