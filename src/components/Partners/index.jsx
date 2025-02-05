import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import AddPartner from './Add';
import EditPartner from './Edit';
import { PartnerColumns, messageTemplate } from '../../constants';
import DialogHeader from '../Layouts/DialogHeader';
import { getData } from '../../services/Partner';

function Partners() {
  const [partners, setPartners] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [partnerId, setPartnerId] = useState();
  const message = useRef(null);

  const actionTemplate = (partner) => {
    return (
      <a
        className="link-edit"
        onClick={(e) => {
          setPartnerId(partner.id);
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
        messageTemplate('success', 'Partner saved successfully')
      );

      fetchPartners();
    }
  };

  // Function to get data
  const fetchPartners = async () => {
    const data = await getData('partners');
    setPartners(data);
  };

  // Get data
  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <>
      {/* Header */}
      <label className="page-header">Partners</label>

      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button label="Add" onClick={() => setShowAdd(true)} />
      </div>

      {/* Table */}
      <DataTable stripedRows paginator value={partners} rows={10}>
        {PartnerColumns.map((column, index) => (
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
        header={<DialogHeader text="Add Partner" />}
        visible={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <AddPartner handleCancel={handleCancel} />
      </Dialog>

      {/* Edit dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Edit Partner" />}
        visible={showEdit}
        onHide={() => setShowEdit(false)}
      >
        <EditPartner handleCancel={handleCancel} partnerId={partnerId} />
      </Dialog>
    </>
  );
}

export default Partners;
