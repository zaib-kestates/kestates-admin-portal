import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import AddLanguage from './Add';
import EditLanguage from './Edit';
import { LanguageColumns, messageTemplate } from '../../constants';
import DialogHeader from '../Layouts/DialogHeader';
import { getData } from '../../services/Language';

function Languages() {
  const [languages, setLanguages] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [languageId, setLanguageId] = useState();
  const message = useRef(null);

  const actionTemplate = (language) => {
    return (
      <a
        className="link-edit"
        onClick={(e) => {
          setLanguageId(language.id);
          setShowEdit(true);
        }}
      >
        Edit
      </a>
    );
  };

  // Event handler to hide dialog
  const handleCancel = (reload = false, type = 'add') => {
    if (type == 'add') {
      setShowAdd(false);
    }

    if (type == 'edit') {
      setShowEdit(false);
    }

    // Re-fetch data if new record created
    if (reload) {
      // Success message
      message.current.show(
        messageTemplate('success', 'Language saved successfully')
      );

      fetchLanguages();
    }
  };

  // Function to get data
  const fetchLanguages = async () => {
    const data = await getData('languages');
    setLanguages(data);
  };

  // Get data
  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <>
      {/* Header */}
      <label className="page-header">Languages</label>

      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button label="Add" onClick={() => setShowAdd(true)} />
      </div>

      {/* Table */}
      <DataTable stripedRows paginator value={languages} rows={10}>
        {LanguageColumns.map((column, index) => (
          <Column
            key={column.field}
            header={column.header}
            field={column.field}
            style={{ width: column.width }}
          />
        ))}
        <Column
          header=""
          bodyClassName="text-center"
          style={{ width: '9%' }}
          body={actionTemplate}
        ></Column>
      </DataTable>

      {/* Add dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Add Language" />}
        visible={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <AddLanguage handleCancel={handleCancel} />
      </Dialog>

      {/* Edit dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Edit Language" />}
        visible={showEdit}
        onHide={() => setShowEdit(false)}
      >
        <EditLanguage handleCancel={handleCancel} languageId={languageId} />
      </Dialog>
    </>
  );
}

export default Languages;
