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
import { useForm } from 'react-hook-form';

function EditTeam() {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      title: '',
      message: '',
      email: '',
      contact_number: '',
      slug: '',
      DepartmentId: '',
      LanguageIds: '',
    },
  });
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
  const save = async (data) => {
    console.log(data);

    // Add data in formData (for image)
    const formData = populateFormData(data);
    formData.delete('LanguageIds');
    // formData.append('LanguageIds[]', languageId)

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

    setValue('name', data.name);
    setValue('title', data.title);
    setValue('message', data.message);
    setValue('email', data.email);
    setValue('contact_number', data.contact_number);
    setValue('slug', data.slug);
    setValue('DepartmentId', data.DepartmentId);
    setValue('LanguageIds', data.LanguageIds);
  };

  // Get data
  useEffect(() => {
    fetchData();
  }, []);

  if (!team) return;
  return (
    <>
      <label className="page-header">Edit Team</label>

      <form onSubmit={handleSubmit(save)}>
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="upload-image-wrapper animation">
              <Image
                src={file}
                className="image-team"
                onClick={() => imageRef.current.click()}
              />
              <label htmlFor="profile-image" className="overlay animation">
                <div className="text text-center">
                  <h6 className="">
                    Click to upload a new Photo!
                  </h6>
                  <div className="">
                    <small>Recommended Size : 300x400</small>
                  </div>
                </div>
              </label>
            </div>
            <div className="d-flex justify-content-end">
              <input
                id='profile-image'
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
                  Name <span className="required"> * </span>
                </label>
                <InputText
                  id="name"
                  name="name"
                  className="form-control"
                  {...register('name', {
                    required: 'Name is required', // Validation message
                  })}
                ></InputText>
                {errors.name && <div className='field-error'><span>{errors.name?.message}</span></div>}
              </div>
              <div className="col-md-12 mt-2 pt-2">
                <label htmlFor="title" className="control-label">
                  Title <span className="required"> * </span>
                </label>
                <InputText
                  id="title"
                  name="title"
                  className="form-control"
                  {...register('title', {
                    required: 'Title is required', // Validation message
                  })}
                ></InputText>
                {errors.title && <div className='field-error'><span>{errors.title?.message}</span></div>}
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="email" className="control-label">
              Email <span className="required"> * </span>
            </label>
            <InputText
              id="email"
              name="email"
              className="form-control"
              {...register('email', {
                required: 'Language is required', // Validation message
              })}
            ></InputText>
            {errors.email && <div className='field-error'><span>{errors.email?.message}</span></div>}
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="contact_number" className="control-label">
              Contact Number <span className="required"> * </span>
            </label>
            <InputText
              id="contact_number"
              name="contact_number"
              className="form-control"
              {...register('contact_number', {
                required: 'Contact Number is required', // Validation message
              })}
            ></InputText>
            {errors.contact_number && <div className='field-error'><span>{errors.contact_number?.message}</span></div>}
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="department" className="control-label">
              Department  <span className="required"> * </span>
            </label>
            <Dropdown
              id="department"
              name="DepartmentId"
              options={departments}
              optionLabel="name"
              optionValue="id"
              className="w-full md:w-14rem"
              placeholder="Select"
              {...register('DepartmentId', {
                required: 'Department is required', // Validation message
              })}
              value={team.DepartmentId} // You need to manage selected languages state
              onChange={(e) => {
                updateState(e); // Update selectedLanguages when changed
                setValue('DepartmentId', e.value); // Update form state in React Hook Form
              }}
            ></Dropdown>
            {errors.message && <div className='field-error'><span>{errors.message?.message}</span></div>}
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="languages" className="control-label">
              Language <span className="required"> * </span>
            </label>
            <MultiSelect
              id="languages"
              name="LanguageIds"
              options={languages} // your languages array
              optionLabel="name"
              optionValue="id"
              className="w-full md:w-20rem"
              placeholder="Select"
              {...register('LanguageIds', {
                required: 'Language is required', // Validation message
              })}
              value={team.LanguageIds} // You need to manage selected languages state
              onChange={(e) => {
                updateState(e); // Update selectedLanguages when changed
                setValue('LanguageIds', e.value); // Update form state in React Hook Form
              }}
            ></MultiSelect>
            {errors.LanguageIds && <div className="field-error"><span>{errors.LanguageIds?.message}</span></div>}
          </div>
          <div className="col-md-6 pt-2 mt-2">
            <label htmlFor="message" className="control-label">
              Message <span className="required"> * </span>
            </label>
            <InputTextarea
              id="message"
              name="message"
              className="form-control"
              rows="5"
              {...register('message', {
                required: 'Message is required',
              })}
            ></InputTextarea>
            {errors.message && <div className='field-error'><span>{errors.message?.message}</span></div>}
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <label htmlFor="slug" className="control-label">
              Slug <span className="required"> * </span>
            </label>
            <InputText
              id="slug"
              name="slug"
              className="form-control"
              {...register('slug', {
                required: 'Slug is required',
              })}
            ></InputText>
            {errors.slug && <div className='field-error'><span>{errors.slug?.message}</span></div>}
          </div>
        </div>

        <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
          <Button label="Save" type='submit' />
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
