import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import AddLocation from './Add';
import EditLocation from './Edit';
import { LocationColumns, messageTemplate } from '../../constants';
import DialogHeader from '../Layouts/DialogHeader';
import { getData } from '../../services/Location';

function Locations() {
  const [locations, setLocations] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [locationId, setLocationId] = useState();
  const message = useRef(null);

  const actionTemplate = (location) => {
    return (
      <a
        className="link-edit"
        onClick={(e) => {
          setLocationId(location.id);
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
        messageTemplate('success', 'Location saved successfully')
      );

      fetchLocations();
    }
  };

  // Function to get data
  const fetchLocations = async () => {
    const data = await getData('locations');
    setLocations(data);
  };

  // Get data
  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <>
      {/* Header */}
      <label className="page-header">Locations</label>

      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button label="Add" onClick={() => setShowAdd(true)} />
      </div>

      {/* Table */}
      <DataTable stripedRows paginator value={locations} rows={10}>
        {LocationColumns.map((column, index) => (
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
        header={<DialogHeader text="Add Location" />}
        visible={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <AddLocation handleCancel={handleCancel} />
      </Dialog>

      {/* Edit dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Edit Location" />}
        visible={showEdit}
        onHide={() => setShowEdit(false)}
      >
        <EditLocation handleCancel={handleCancel} locationId={locationId} />
      </Dialog>
    </>
  );
}

export default Locations;
