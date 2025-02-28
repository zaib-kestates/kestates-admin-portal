import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";

import { getData, updateData } from "../../services/Blog";
import useFetchCategories from "../../hooks/useFetchCategories";
import { populateFormData } from "../../helpers";
import { STATUS } from "../../constants/blogs";
import MetadataForm from "./Metadata-form";
import Errors from "../Layouts/Errors";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [blog, setBlog] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState();
  const categories = useFetchCategories();

  // Handle file change
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setBlog({ ...blog, file: e.target.files[0] });
  };

  // Cancel click handler
  const handleCancel = (e) => {
    e.preventDefault();

    navigate("/blogs");
  };

  // Function to update state
  const updateState = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // Function to get data
  const fetchData = async () => {
    const data = await getData(`blogs/${id}`);
    setBlog(data);
    setFile(data.picture);
  };

  // Function to update data
  const save = async (e) => {
    e.preventDefault();

    // Add data in form object (for image)
    const formData = populateFormData(blog);

    // Update data
    try {
      await updateData(id, formData);
      navigate("/blogs", {
        state: { showMessage: true },
      });
    } catch (error) {
      setErrors(error.response.data.messages);
      window.scrollTo(0, 0);
    }
  };

  // Get data
  useEffect(() => {
    fetchData();
  }, []);

  if (!blog) return;
  return (
    <>
      {/* Header */}
      <label className="page-header">Edit Blog</label>

      {/* Errors */}
      {errors && <Errors errors={errors} />}

      {/* Form */}
      <form>
        <div className="row">
          <div className="col-md-12">
            <Image
              src={file}
              className="img-banner"
              onClick={() => imageRef.current.click()}
            />
            <input
              type="file"
              ref={imageRef}
              onChange={handleFileChange}
            ></input>
          </div>
          <div className="col-md-6 mt-2 pt-2">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="title" className="control-label">
                  Title
                </label>
                <InputText
                  name="title"
                  className="form-control"
                  value={blog.title}
                  onChange={updateState}
                ></InputText>
              </div>{" "}
              <div className="col-md-12 mt-2 pt-2">
                <label htmlFor="category" className="control-label">
                  Category
                </label>
                <Dropdown
                  name="BlogCategoryId"
                  options={categories}
                  optionLabel="name"
                  optionValue="id"
                  className="w-full md:w-14rem"
                  placeholder="Select"
                  value={blog.BlogCategoryId}
                  onChange={updateState}
                ></Dropdown>
              </div>
              <div className="col-md-6 mt-2 pt-2">
                <label htmlFor="slug" className="control-label">
                  Slug
                </label>
                <InputText
                  name="slug"
                  className="form-control"
                  value={blog.slug}
                  onChange={updateState}
                ></InputText>
              </div>
              <div className="col-md-6 mt-2 pt-2">
                <label htmlFor="status" className="control-label">
                  Status
                </label>
                <Dropdown
                  name="status"
                  options={STATUS}
                  className="w-full md:w-14rem"
                  placeholder="Select"
                  value={blog.status}
                  onChange={updateState}
                ></Dropdown>
              </div>
            </div>
          </div>
          <div className="col-md-6 pt-2 mt-2">
            <label htmlFor="caption" className="control-label">
              Caption
            </label>
            <InputTextarea
              name="caption"
              className="form-control"
              rows="8"
              value={blog.caption}
              onChange={updateState}
            ></InputTextarea>
          </div>
        </div>
        <div className="col-md-12 pt-2 mt-2">
          <label htmlFor="description" className="control-label">
            Description
          </label>
          <Editor
            name="description"
            value={blog.description}
            onTextChange={(e) => setBlog({ ...blog, description: e.htmlValue })}
          />
        </div>

        {/* Metadata */}
        <MetadataForm
          title={blog.metadata_title}
          description={blog.metadata_description}
          updateState={updateState}
        />

        <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
          <Button label="Save" onClick={save} />
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

export default EditBlog;
