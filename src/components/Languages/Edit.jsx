import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { getData, updateData } from '../../services/Language';
import { languageTemplate } from '../../constants';

function EditLanguage({ handleCancel, languageId }) {
  const [language, setLanguage] = useState(languageTemplate);

  // Save click handler
  const save = async (e) => {
    e.preventDefault();

    await updateData(language);

    handleCancel(true, 'edit');
  };

  // Function to update state
  const updateState = (e) => {
    setLanguage({ ...language, [e.target.name]: e.target.value });
  };

  // Function to get data
  const fetchLanguage = async () => {
    const data = await getData(`languages/${languageId}`);
    setLanguage(data);
  };

  useEffect(() => {
    fetchLanguage();
  }, []);

  if (!language) return;
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
            onClick={() => handleCancel(false, 'edit')}
          />
        </div>
      </div>
    </form>
  );
}

EditLanguage.propTypes = {
  handleCancel: PropTypes.func,
  languageId: PropTypes.number,
};

export default EditLanguage;
