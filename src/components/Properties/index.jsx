import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import DialogHeader from '../Layouts/DialogHeader';
import Metadata from './Metadata';
import { messageTemplate } from '../../constants';

const properties = [
  {
    title: 'Leading Wall Paint Colors in 2025 for a Modern Home',
    location: 'Tilal Al Ghaf',
    type: 'Appartment',
    price: '12000',
    slug: 'L-W-',
  },
  {
    title: '12 Most Beautiful Restaurants in Dubai: Dine in Luxury',
    location: 'Sobha Reserve',
    type: 'Villa',
    price: '12222',
    slug: 'D-I-',
  },
];

function Properties() {
  const message = useRef(null);
  const navigate = useNavigate();
  const [showMetadata, setShowMetadata] = useState(false);

  // Handle metadata cancel click
  const handleCancel = (e, isSave = false) => {
    e.preventDefault();

    setShowMetadata(false);

    if (isSave) {
      message.current.show(
        messageTemplate('success', 'Metadata saved successfully')
      );
    }
  };

  return (
    <>
      {/* Header */}
      <label className="page-header">Properties</label>
      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button
          label="Metadata"
          className="me-2"
          onClick={() => setShowMetadata(true)}
        />
        <Button label="Add" onClick={() => navigate('/properties/add')} />
      </div>

      <DataTable value={properties} stripedRows>
        <Column header="Title" field="title" style={{ width: '30%' }}></Column>
        <Column header="Location" field="location"></Column>
        <Column header="Type" field="type"></Column>
        <Column header="Price" field="price"></Column>
        <Column header="Slug" field="slug"></Column>
      </DataTable>

      {/* Metadata dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Properties Metadata" />}
        visible={showMetadata}
      >
        <Metadata handleCancel={handleCancel} />
      </Dialog>
    </>
  );
}

export default Properties;
