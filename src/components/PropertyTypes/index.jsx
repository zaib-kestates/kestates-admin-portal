import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import AddPropertyType from './Add';
import EditPropertyType from './Edit';
import { BlogCategoryColumns, messageTemplate } from '../../constants';
import DialogHeader from '../Layouts/DialogHeader';
import { getData } from '../../services/PropertyType';

function PropertyTypes() {
  const [types, setTypes] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [typeId, setTypeId] = useState();
  const message = useRef(null);

  const actionTemplate = (type) => {
    return (
      <a
        className="link-edit"
        onClick={(e) => {
          setTypeId(type.id);
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
        messageTemplate('success', 'Property type saved successfully')
      );

      fetchTypes();
    }
  };

  // Function to get data
  const fetchTypes = async () => {
    const data = await getData('property-types');
    setTypes(data);
  };

  // Get data
  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <>
      {/* Header */}
      <label className="page-header">Property Types</label>
      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button label="Add" onClick={() => setShowAdd(true)} />
      </div>

      {/* Table */}
      <DataTable stripedRows paginator value={types} rows={10}>
        {BlogCategoryColumns.map((column, index) => (
          <Column
            key={column.field}
            header={column.header}
            field={column.field}
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
        header={<DialogHeader text="Add Property Type" />}
        visible={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <AddPropertyType handleCancel={handleCancel} />
      </Dialog>

      {/* Edit dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Edit Property Type" />}
        visible={showEdit}
        onHide={() => setShowEdit(false)}
      >
        <EditPropertyType handleCancel={handleCancel} typeId={typeId} />
      </Dialog>
    </>
  );
}

export default PropertyTypes;
