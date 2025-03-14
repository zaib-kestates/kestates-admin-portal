import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";

import { getData, saveData } from "../../services/Home";
import { messageTemplate } from "../../constants";
import Errors from "../Layouts/Errors";
import "./index.css";

function Home() {
  const videoRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const message = useRef(null);
  const [data, setData] = useState();
  const [bannerVideo, setBannerVideo] = useState();
  const [errors, setErrors] = useState();

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
  const save = async (e) => {
    e.preventDefault();

    // Add data in form object (for video)
    const formData = new FormData();
    formData.append("header", data.metadata.header);
    formData.append("title", data.metadata.title);
    formData.append("description", data.metadata.description);
    formData.append("canonical_url", data.metadata.canonical_url);
    formData.append("focus_keywords", data.metadata.focus_keywords);
    formData.append("our_story", data.pageData[0].value);
    formData.append("file", data.file);
    window.scrollTo(0, 0);

    try {
      await saveData(formData);
      setErrors(null);
      message.current.show(
        messageTemplate("success", "Data saved successfully")
      );
    } catch (error) {
      setErrors(error.response.data.messages);
    }
  };

  // Function to retrieve data
  const fetchData = async () => {
    const data = await getData();
    setData(data);
    setBannerVideo(data.images[0].picture);
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

      {/* Errors */}
      {errors && <Errors errors={errors} />}

      <Messages ref={message} />

      {/* Banner video */}
      <form>
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
              Our Story
            </label>
            <InputTextarea
              id="our_story"
              className="form-control"
              rows={8}
              onChange={updatePageData}
              value={data.pageData[0].value}
            ></InputTextarea>
          </div>
        </div>

        {/* Metadata */}
        <label className="page-subheader mt-3 pt-2">Meatadata</label>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="title" className="control-label">
              Title
            </label>
            <InputText
              name="title"
              className="form-control"
              value={data.metadata.title}
              onChange={updateMetadata}
            ></InputText>
          </div>
          <div className="col-md-6">
            <label htmlFor="header">Header</label>
            <InputText
              name="header"
              className="form-control"
              value={data.metadata.header}
              onChange={updateMetadata}
            ></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="canonical_url" className="control-label">
              Canonical URL
            </label>
            <InputText
              name="canonical_url"
              className="form-control"
              value={data.metadata.canonical_url}
              onChange={updateMetadata}
            ></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="focus_keywords" className="control-label">
              Focus Keywords
            </label>
            <InputText
              name="focus_keywords"
              className="form-control"
              value={data.metadata.focus_keywords}
              onChange={updateMetadata}
            ></InputText>
          </div>
          <div className="col-md-12 mt-2 pt-2">
            <label htmlFor="description">Description</label>
            <InputTextarea
              name="description"
              className="form-control"
              rows={5}
              value={data.metadata.description}
              onChange={updateMetadata}
            ></InputTextarea>
          </div>
          <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
            <Button label="Save" onClick={save} />
          </div>
        </div>
      </form>
    </>
  );
}

export default Home;
