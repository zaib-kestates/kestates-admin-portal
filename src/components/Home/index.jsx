import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useForm } from 'react-hook-form';
import { getData, saveData } from '../../services/Home';
import { messageTemplate, homeObject } from '../../constants';
import './index.css';

function Home() {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      our_story: '',
      title: '',
      header: '',
      description: '',
    },
  });

  const videoRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const message = useRef(null);
  const [data, setData] = useState();
  const [bannerVideo, setBannerVideo] = useState();

  // Function to update metadata
  const updateMetadata = (e) => {
    setData({
      ...data,
      metadata: {
        ...data.metadata,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Function to update page data
  const updatePageData = (e) => {
    setData({
      ...data,
      pageData: {
        [0]: {
          ...data.pageData[0],
          value: e.target.value,
        },
      },
    });
  };

  // Handle upload click
  const handleUpload = (e) => {
    e.preventDefault();

    videoRef.current.click();
  };

  // Handle file upload
  const handlefileUpload = (e) => {
    setBannerVideo(URL.createObjectURL(e.target.files[0]));
    setData({ ...data, file: e.target.files[0] });
    videoPlayerRef.current.load();
  };

  // Function to save data
  const save = async (data) => {
    console.log(data);

    // Add data in form object (for video)
    const formData = new FormData();
    formData.append('header', data.header);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('our_story', data.our_story);
    formData.append('file', data.file);

    await saveData(formData);

    message.current.show(messageTemplate('success', 'Data saved successfully'));
  };

  // Function to retrieve data
  const fetchData = async () => {
    const data = await getData();
    setData(data);
    setBannerVideo(data.images[0].picture);
    setValue('our_story', data.pageData[0].value);
    setValue('title', data.metadata.title);
    setValue('header', data.metadata.header);
    setValue('description', data.metadata.description);
  };

  // Get data
  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return;
  return (
    <>
      {/* Header */}
      <label className="page-header">Home</label>

      <Messages ref={message} />

      {/* Banner video */}
      <form onSubmit={handleSubmit(save)}>
        <div className="row">
          <div className="col-md-12">
            <video
              width="100%"
              height="280"
              className="video-home"
              ref={videoPlayerRef}
              controls
            >
              <source src={bannerVideo} type="video/mp4" />
            </video>
            <input type="file" ref={videoRef} onChange={handlefileUpload} />
            <Button
              label="Upload"
              className="float-end"
              onClick={handleUpload}
            />
          </div>
        </div>

        {/* Our story */}
        <div className="row mt-3 pt-2">
          <div className="col-md-12">
            <label htmlFor="our_story" className="control-label">
              Our Story <span className="required"> * </span>
            </label>
            <InputTextarea
              id="our_story"
              className="form-control"
              rows={8}
              {...register('our_story', { required: 'Our story is required' })}
            ></InputTextarea>
            {errors.our_story && <div className='field-error'><span>{errors.our_story?.message}</span></div>}
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
              {...register('title', { required: 'Title is required' })}
            ></InputText>
            {errors.title && <div className='field-error'><span>{errors.title?.message}</span></div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="header">Header <span className="required"> * </span></label>
            <InputText
              name="header"
              id='header'
              className="form-control"
              {...register('header', { required: 'Header is required' })}
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
            <Button label="Save" />
          </div>
        </div>
      </form>
    </>
  );
}

export default Home;
