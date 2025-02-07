import { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Messages } from 'primereact/messages';
import { messageTemplate } from '../../constants';
import { getData, saveData } from '../../services/AboutUs';
import './index.css';
import { useForm } from 'react-hook-form';
import { hasFileValidationErrors } from '../../utils/helpers';

function AboutUs() {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      header: '',
      title: '',
      description: '',
      about: '',
      team: '',
    },
  });

  const bannerRef = useRef(null);
  const teamImageRef = useRef(null);
  const message = useRef(null);
  const [data, setData] = useState();
  const [banner, setBanner] = useState();
  const [teamImage, setTeamImage] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();

  const handleFileUpload = (e, fileIndex) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileValidationErrors = hasFileValidationErrors(file, "image");
    if (!!fileValidationErrors) {
      return message.current.show(messageTemplate('error', fileValidationErrors));
    }
    if (fileIndex === 1) {
      setBanner(URL.createObjectURL(file));
      setFile1(file);
    } else if (fileIndex === 2) {
      setTeamImage(URL.createObjectURL(file));
      setFile2(file);
    }
  };

  // Function to update metadata
  const updateMetadata = (e) => {
    setData({
      ...data,
      metadata: { ...data.metadata, [e.target.name]: e.target.value },
    });
  };

  // Function to update page data
  const updatePageData = async (e, index) => {
    setData({
      ...data,
      pageData: {
        ...data.pageData,
        [index]: {
          ...data.pageData[index],
          value: e.target.value,
        },
      },
    });
  };

  // Save click handler
  const save = async (data) => {
    // e.preventDefault();

    // Add data in form object (for images)
    const formData = new FormData();
    formData.append('header', data.header);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('about', data.about);
    formData.append('team', data.team);
    formData.append('file1', file1);
    formData.append('file2', file2);

    await saveData(formData);

    message.current.show(messageTemplate('success', 'Data saved successfully'));
  };

  // Function to fetch data
  const fetchData = async () => {
    const data = await getData();
    setData(data);
    setBanner(data.images[0].picture);
    setTeamImage(data.images[1].picture);

    setValue('header', data.metadata.header);
    setValue('title', data.metadata.title);
    setValue('description', data.metadata.description);
    setValue('about', data.pageData[0].value);
    setValue('team', data.pageData[1].value);
  };

  // Get data
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return;
  return (
    <>
      {/* Header */}
      <label className="page-header">About Us</label>

      <Messages ref={message} />

      {/* About */}
      <label className="page-subheader">About</label>
      <form onSubmit={handleSubmit(save)}>
        <div className="row">
          <div className="col-md-12">
            <div className="upload-image-wrapper animation">
              <Image
                src={banner}
                className="img-banner"
                onClick={() => bannerRef.current.click()}
              />
              <label htmlFor="banner-image" className="overlay animation">
                <div className="text text-center">
                  <h6 className="">
                    Click to upload a new Photo!
                  </h6>
                  <div className="">
                    <small>Recommended Size : 1280x960</small>
                  </div>
                </div>
              </label>
            </div>
            <input
              type="file"
              id="banner-image"
              ref={bannerRef}
              accept='image/*'
              onChange={(e) => {
                handleFileUpload(e, 1);
              }}
            />
          </div>
          <div className="col-md-12 mt-2">
            <label htmlFor="about" className="control-label">
              About <span className="required"> * </span>
            </label>
            <InputTextarea
              name="about"
              className="form-control"
              rows={8}
              {...register('about', {
                required: 'About text is required',
              })}
            ></InputTextarea>
            {errors.about && <div className='field-error'><span>{errors.about?.message}</span></div>}
          </div>
        </div>

        {/* Team */}
        <label className="page-subheader mt-3 pt-2">Team  <span className="required"> * </span></label>
        <div className="row">
          <div className="col-md-3">
            <div className="upload-image-wrapper">
              <Image
                src={teamImage}
                className="image-aboutus-team"
                onClick={() => teamImageRef.current.click()}
              />
              <label htmlFor="team-image" className="overlay animation">
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
            <input
              type="file"
              id='team-image'
              accept='image/*'
              ref={teamImageRef}
              onChange={(e) => {
                handleFileUpload(e, 2);
              }}
            />
          </div>
          <div className="col-md-9 mt-2">
            <InputTextarea
              name="team"
              id='team'
              className="form-control"
              rows={5}
              {...register('team', {
                required: 'Team text is required',
              })}
            ></InputTextarea>
            {errors.team && <div className='field-error'><span>{errors.team?.message}</span></div>}
          </div>
        </div>

        {/* Metadata */}
        <label className="page-subheader mt-3 pt-2">Meatadata</label>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="title" className="control-label">
              Title <span className="required"> * </span>
            </label>
            <InputText
              name="title"
              id='title'
              className="form-control"
              {...register('title', {
                required: 'Title is required',
              })}
            ></InputText>
            {errors.title && <div className='field-error'><span>{errors.title?.message}</span></div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="header">Header <span className="required"> * </span></label>
            <InputText
              name="header"
              id='header'
              className="form-control"
              {...register('header', {
                required: 'Header is required',
              })}
            ></InputText>
            {errors.header && <div className='field-error'><span>{errors.header?.message}</span></div>}
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="description">Description <span className="required"> * </span></label>
            <InputTextarea
              name="description"
              id='description'
              className="form-control"
              rows={5}
              {...register('description', {
                required: 'Description is required',
              })}
            ></InputTextarea>
            {errors.description && <div className='field-error'><span>{errors.description?.message}</span></div>}
          </div>
          <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
            <Button label="Save" type='submit' />
          </div>
        </div>
      </form>
    </>
  );
}

export default AboutUs;
