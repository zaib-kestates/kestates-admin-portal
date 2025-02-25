import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import PropTypes from "prop-types";

import { getData, updateData } from "../../services/PropertyType";
import Errors from "../Layouts/Errors";

function EditPropertyType({ handleCancel, typeId }) {
  const [type, setType] = useState();
  const [errors, setErrors] = useState();

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    try {
      await updateData(type);
      handleCancel(true, "edit");
    } catch (error) {
      setErrors(error.response.data.messages);
    }
  };

  // Function to get data
  const fetchTypes = async () => {
    const data = await getData(`property-types/${typeId}`);
    setType(data);
  };

  // Update category name when loaded
  useEffect(() => {
    fetchTypes();
  }, []);

  if (!type) return;
  return (
    <>
      {/* Errors */}
      {errors && <Errors errors={errors} />}

      {/* Form */}
      <form>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="name" className="control-label">
              Name
            </label>
            <InputText
              id="name"
              className="form-control"
              value={type.name}
              onChange={(e) => setType({ ...type, name: e.target.value })}
            ></InputText>
          </div>

          <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
            <Button label="Save" onClick={save} />
            <Button
              type="button"
              className="ms-2"
              label="Cancel"
              severity="secondary"
              onClick={() => handleCancel(false, "edit")}
            />
          </div>
        </div>
      </form>
    </>
  );
}

EditPropertyType.propTypes = {
  handleCancel: PropTypes.func,
  typeId: PropTypes.number,
};

export default EditPropertyType;
