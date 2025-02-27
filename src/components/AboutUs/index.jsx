import { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Messages } from 'primereact/messages';

import { messageTemplate } from '../../constants';
import { getData, saveData } from '../../services/AboutUs';
import Errors from '../Layouts/Errors';
import './index.css';

function AboutUs() {
  const bannerRef = useRef(null);
  const teamImageRef = useRef(null);
  const message = useRef(null);
  const [data, setData] = useState();
  const [banner, setBanner] = useState();
  const [teamImage, setTeamImage] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [errors, setErrors] = useState();

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
  const save = async (e) => {
    e.preventDefault();

    // Add data in form object (for images)
    const formData = new FormData();
    formData.append('header', data.metadata.header);
    formData.append('title', data.metadata.title);
    formData.append('description', data.metadata.description);
    formData.append('about', data.pageData[0].value);
    formData.append('team', data.pageData[1].value);
    formData.append('file1', file1);
    formData.append('file2', file2);
    window.scrollTo(0, 0);

    console.log(formData);

    try {
      await saveData(formData);
      setErrors(null);

      message.current.show(
        messageTemplate('success', 'Data saved successfully')
      );
    } catch (error) {
      setErrors(error.response.data.messages);
    }
  };

  // Function to fetch data
  const fetchData = async () => {
    const data = await getData();
    setData(data);
    setBanner(data.images[0].picture);
    setTeamImage(data.images[1].picture);
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

      {/* Errors */}
      {errors && <Errors errors={errors} />}

      <Messages ref={message} />

      {/* About */}
      <label className="page-subheader">About</label>
      <form>
        <div className="row">
          <div className="col-md-12">
            <Image
              src={banner}
              className="img-banner"
              onClick={() => bannerRef.current.click()}
            />
            <input
              type="file"
              ref={bannerRef}
              onChange={(e) => {
                setBanner(URL.createObjectURL(e.target.files[0]));
                setFile1(e.target.files[0]);
              }}
            />
          </div>
          <div className="col-md-12 mt-2">
            <label htmlFor="about" className="control-label">
              About
            </label>
            <InputTextarea
              name="about"
              className="form-control"
              rows={8}
              value={data.pageData[0].value}
              onChange={(e) => updatePageData(e, 0)}
            ></InputTextarea>
          </div>
        </div>
      </form>

      {/* Team */}
      <label className="page-subheader mt-3 pt-2">Team</label>
      <form>
        <div className="row">
          <div className="col-md-2">
            <Image
              src={teamImage}
              className="image-aboutus-team"
              onClick={() => teamImageRef.current.click()}
            />
            <input
              type="file"
              ref={teamImageRef}
              onChange={(e) => {
                setTeamImage(URL.createObjectURL(e.target.files[0]));
                setFile2(e.target.files[0]);
              }}
            />
          </div>
          <div className="col-md-10">
            <InputTextarea
              name="team"
              className="form-control team"
              rows={5}
              value={data.pageData[1].value}
              onChange={(e) => updatePageData(e, 1)}
            ></InputTextarea>
          </div>
        </div>
      </form>

      {/* Metadata */}
      <label className="page-subheader mt-3 pt-2">Meatadata</label>
      <form>
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

export default AboutUs;
