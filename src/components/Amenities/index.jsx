import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import AddAmenity from './Add';
import EditAmenity from './Edit';
import { BlogCategoryColumns, messageTemplate } from '../../constants';
import DialogHeader from '../Layouts/DialogHeader';
import { getData } from '../../services/Amenity';

function Amenities() {
  const [amenities, setAmenities] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [amenityId, setAmenityId] = useState();
  const message = useRef(null);

  const actionTemplate = (category) => {
    return (
      <a
        className="link-edit"
        onClick={(e) => {
          setAmenityId(category.id);
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
        messageTemplate('success', 'Amenity saved successfully')
      );

      fetchAmenities();
    }
  };

  // Function to get data
  const fetchAmenities = async () => {
    const data = await getData('amenities');
    setAmenities(data);
  };

  // Get data
  useEffect(() => {
    fetchAmenities();
  }, []);

  return (
    <>
      {/* Header */}
      <label className="page-header">Amenities</label>
      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button label="Add" onClick={() => setShowAdd(true)} />
      </div>

      {/* Table */}
      <DataTable stripedRows paginator value={amenities} rows={10}>
        {BlogCategoryColumns.map((column, index) => (
          <Column
            key={column.field}
            header={column.header}
            field={column.field}
          />
        ))}
        <Column
          bodyClassName="text-center"
          style={{ width: '9%' }}
          body={actionTemplate}
        ></Column>
      </DataTable>

      {/* Add dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Add Amenity" />}
        visible={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <AddAmenity handleCancel={handleCancel} />
      </Dialog>

      {/* Edit dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Edit Amenity" />}
        visible={showEdit}
        onHide={() => setShowEdit(false)}
      >
        <EditAmenity handleCancel={handleCancel} amenityId={amenityId} />
      </Dialog>
    </>
  );
}

export default Amenities;
