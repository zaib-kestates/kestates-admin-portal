import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import AddBlogCategory from './Add';
import EditBlogCategory from './Edit';
import { BlogCategoryColumns, messageTemplate } from '../../constants';
import DialogHeader from '../Layouts/DialogHeader';
import { getData } from '../../services/BlogCategory';
import './index.css';

function BlogCategories() {
  const [categories, setCategories] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const message = useRef(null);

  const actionTemplate = (category) => {
    return (
      <a
        className="link-edit"
        onClick={(e) => {
          setCategoryId(category.id);
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
        messageTemplate('success', 'Blog Category saved successfully')
      );

      fetchBlogCategories();
    }
  };

  // Function to get data
  const fetchBlogCategories = async () => {
    const data = await getData('blog-categories');
    setCategories(data);
  };

  // Get data
  useEffect(() => {
    fetchBlogCategories();
  }, []);

  return (
    <>
      {/* Header */}
      <label className="page-header">Blog Categories</label>
      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button label="Add" onClick={() => setShowAdd(true)} />
      </div>

      {/* Table */}
      <DataTable stripedRows paginator value={categories} rows={10}>
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
        header={<DialogHeader text="Add Blog Category" />}
        visible={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <AddBlogCategory handleCancel={handleCancel} />
      </Dialog>

      {/* Edit dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Edit Blog Category" />}
        visible={showEdit}
        onHide={() => setShowEdit(false)}
      >
        <EditBlogCategory handleCancel={handleCancel} categoryId={categoryId} />
      </Dialog>
    </>
  );
}

export default BlogCategories;
