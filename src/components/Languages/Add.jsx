import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { saveData } from '../../services/Language';
import { languageTemplate } from '../../constants';

function AddLanguage({ handleCancel }) {
  const [language, setLanguage] = useState(languageTemplate);

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    await saveData(language);

    handleCancel(true);
  };

  // Function to update state
  const updateState = (e) => {
    setLanguage({ ...language, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="code" className="control-label">
            Code
          </label>
          <InputText
            name="code"
            className="form-control"
            value={language.code}
            onChange={updateState}
          ></InputText>
        </div>
        <div className="col-md-12 mt-2 pt-2">
          <label htmlFor="name" className="control-label">
            Name
          </label>
          <InputText
            name="name"
            className="form-control"
            value={language.name}
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
            onClick={() => handleCancel()}
          />
        </div>
      </div>
    </form>
  );
}

AddLanguage.propTypes = {
  handleCancel: PropTypes.func,
};

export default AddLanguage;
