import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Paginator } from 'primereact/paginator';

import DialogHeader from '../Layouts/DialogHeader';
import Metadata from './Metadata';
import { messageTemplate } from '../../constants';
import { getData } from '../../services/Property';

function Properties() {
  const message = useRef(null);
  const navigate = useNavigate();
  const [properties, setProperties] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState();
  const [first, setFirst] = useState(0);
  const [showMetadata, setShowMetadata] = useState(false);

  const actionTemplate = (blog) => {
    return (
      <a
        className="link-edit"
        onClick={() => navigate(`/properties/${blog.id}`)}
      >
        Edit
      </a>
    );
  };

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

  // Handle page change
  const handlePageChange = async (e) => {
    setFirst(e.first);
    setPageNumber(++e.page);
  };

  const fetchData = async () => {
    const data = await getData(`properties/listing/${pageNumber}`);
    setProperties(data.rows);
    setTotalRecords(data.totalRecords);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

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
        <Column header="Location" field="Location.name"></Column>
        <Column header="Type" field="PropertyType.name"></Column>
        <Column header="Price" field="price"></Column>
        <Column header="Status" field="status"></Column>
        <Column header="Slug" field="slug"></Column>
        <Column
          header=""
          className="text-center"
          style={{ width: '9%' }}
          body={actionTemplate}
        ></Column>
      </DataTable>

      {/* Pagination */}
      <Paginator
        first={first}
        rows={10}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
      />

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
