import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Meta } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import DialogHeader from '../Layouts/DialogHeader';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { Messages } from 'primereact/messages';

import { getData } from '../../services/Blog';
import { BlogColumns, messageTemplate } from '../../constants';
import Metadata from './Metadata';

function Blogs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [blogs, setBlogs] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState();
  const [first, setFirst] = useState(0);
  const [showMetadata, setShowMetadata] = useState(false);
  const message = useRef(null);

  const actionTemplate = (blog) => {
    return (
      <a className="link-edit" onClick={() => navigate(`/blogs/${blog.id}`)}>
        Edit
      </a>
    );
  };

  // Handle cancel click
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
  const handlePageChange = (e) => {
    setFirst(e.first);
    setPageNumber(++e.page);
  };

  // Function to get data
  const fetchData = async () => {
    const data = await getData(`blogs/listing/${pageNumber}`);
    setBlogs(data.rows);
    setTotalRecords(data.totalRecords);
  };

  // Get data
  useEffect(() => {
    fetchData();

    // Show message if state exists
    if (location.state) {
      message.current.show(
        messageTemplate('success', 'Blog saved successfully')
      );
    }
  }, [pageNumber]);

  return (
    <>
      {/* Header */}
      <label className="page-header">Blogs</label>
      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button
          label="Metadata"
          className="me-2"
          onClick={() => setShowMetadata(true)}
        />
        <Button label="Add" onClick={() => navigate('/blogs/add')} />
      </div>

      {/* Table */}
      <DataTable value={blogs} stripedRows>
        {BlogColumns.map((column, index) => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
            style={{ width: column.width }}
          />
        ))}
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
        header={<DialogHeader text="Blogs Metadata" />}
        visible={showMetadata}
      >
        <Metadata handleCancel={handleCancel} />
      </Dialog>
    </>
  );
}

export default Blogs;
