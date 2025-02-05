import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { getDepartments, updateData } from '../../services/Department';
import { departmentTemplate } from '../../constants';

function EditDepartment({ handleCancel, departmentId }) {
  const [department, setDepartment] = useState(departmentTemplate);

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    await updateData(department);

    handleCancel(true, 'edit');
  };

  // Function to update state
  const updateState = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  // Function to get data
  const fetchDepartment = async () => {
    const data = await getDepartments(`departments/${departmentId}`);
    setDepartment(data);
  };

  // Update category name when loaded
  useEffect(() => {
    fetchDepartment();
  }, []);

  if (!department) return;
  return (
    <form>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="name" className="control-label">
            Name
          </label>
          <InputText
            name="name"
            className="form-control"
            value={department.name}
            onChange={updateState}
          ></InputText>
        </div>
        <div className="col-md-12 mt-2 pt-2">
          <label htmlFor="name" className="control-label">
            Sorting Priority
          </label>
          <InputText
            name="sorting_priority"
            className="form-control"
            value={department.sorting_priority}
            onChange={updateState}
          ></InputText>
        </div>

        <div className="col-md-12 mt-2 pt-2 d-flex justify-content-end">
          <Button label="Save" onClick={save} />
          <Button
            type="button"
            className="ms-2"
            label="Cancel"
            severity="secondary"
            onClick={() => handleCancel(false, 'edit')}
          />
        </div>
      </div>
    </form>
  );
}

EditDepartment.propTypes = {
  handleCancel: PropTypes.func,
  departmentId: PropTypes.number,
};

export default EditDepartment;
