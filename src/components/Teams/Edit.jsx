import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { getData, updateData } from '../../services/Team';
import useFetchDepartments from '../../hooks/useFetchDepartments';
import useFetchLanguages from '../../hooks/useFetchLanguages';
import { populateFormData } from '../../helpers';

function EditTeam() {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [team, setTeam] = useState();
  const [file, setFile] = useState();
  const departments = useFetchDepartments();
  const languages = useFetchLanguages();
  const { id } = useParams();

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setTeam({ ...team, file: e.target.files[0] });
  };

  // Cancel click handler
  const handleClick = (e) => {
    e.preventDefault();

    navigate('/teams');
  };

  // Function to update state
  const updateState = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  // Function to update data
  const save = async (e) => {
    e.preventDefault();

    // Add data in formData (for image)
    const formData = populateFormData(team);
    formData.delete('LanguageIds');

    // Add LanguageIds in formdata
    team.LanguageIds.forEach((languageId) =>
      formData.append('LanguageIds[]', languageId)
    );

    await updateData(id, formData);
    navigate('/teams', {
      state: {
        showMessage: true,
      },
    });
  };

  // Function to get data
  const fetchData = async () => {
    const data = await getData(`teams/${id}`);
    setTeam(data);
    setFile(data.picture);
  };

  // Get data
  useEffect(() => {
    fetchData();
  }, []);

  if (!team) return;
  return (
    <>
      <label className="page-header">Edit Team</label>

      <form>
        <div className="row">
          <div className="col-md-6 text-center">
            <Image
              src={file}
              className="image-team"
              onClick={() => imageRef.current.click()}
            />
            <div className="d-flex justify-content-end">
              <input
                ref={imageRef}
                type="file"
                className="mt-2 pe-0"
                onChange={handleFileChange}
              ></input>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="name" className="control-label">
                  Name
                </label>
                <InputText
                  id="name"
                  name="name"
                  className="form-control"
                  value={team.name}
                  onChange={updateState}
                ></InputText>
              </div>
              <div className="col-md-12 mt-2 pt-2">
                <label htmlFor="title" className="control-label">
                  Title
                </label>
                <InputText
                  id="title"
                  name="title"
                  className="form-control"
                  value={team.title}
                  onChange={updateState}
                ></InputText>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="email" className="control-label">
              Email
            </label>
            <InputText
              id="email"
              name="email"
              className="form-control"
              value={team.email}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="contact_number" className="control-label">
              Contact Number
            </label>
            <InputText
              id="contact_number"
              name="contact_number"
              className="form-control"
              value={team.contact_number}
              onChange={updateState}
            ></InputText>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="department" className="control-label">
              Department
            </label>
            <Dropdown
              id="department"
              name="DepartmentId"
              options={departments}
              optionLabel="name"
              optionValue="id"
              className="w-full md:w-14rem"
              placeholder="Select"
              value={team.DepartmentId}
              onChange={updateState}
            ></Dropdown>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="languages" className="control-label">
              Languages
            </label>
            <MultiSelect
              id="languages"
              name="LanguageIds"
              options={languages}
              optionLabel="name"
              optionValue="id"
              className="w-full md:w-20rem"
              placeholder="Select"
              value={team.LanguageIds}
              onChange={updateState}
            ></MultiSelect>
          </div>
          <div className="col-md-6 pt-2 mt-2">
            <label htmlFor="message" className="control-label">
              Message
            </label>
            <InputTextarea
              id="message"
              name="message"
              className="form-control"
              rows="5"
              value={team.message}
              onChange={updateState}
            ></InputTextarea>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="slug" className="control-label">
              Slug
            </label>
            <InputText
              id="slug"
              name="slug"
              className="form-control"
              value={team.slug}
              onChange={updateState}
            ></InputText>
          </div>
        </div>

        <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
          <Button label="Save" onClick={save} />
          <Button
            className="ms-2"
            label="Cancel"
            severity="secondary"
            onClick={handleClick}
          />
        </div>
      </form>
    </>
  );
}

export default EditTeam;
