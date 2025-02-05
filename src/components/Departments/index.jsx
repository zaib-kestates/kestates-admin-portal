import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import AddDepartment from './Add';
import EditDepartment from './Edit';
import { DepartmentColumns, messageTemplate } from '../../constants';
import DialogHeader from '../Layouts/DialogHeader';
import { getDepartments } from '../../services/Department';

function Departments() {
  const [departments, setDepartments] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [departmentId, setDepartmentId] = useState();
  const message = useRef(null);

  const actionTemplate = (department) => {
    return (
      <a
        className="link-edit"
        onClick={(e) => {
          setDepartmentId(department.id);
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
        messageTemplate('success', 'Department saved successfully')
      );

      fetchDepartments();
    }
  };

  // Function to get data
  const fetchDepartments = async () => {
    const data = await getDepartments('departments');
    setDepartments(data);
  };

  // Get data
  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      <label className="page-header">Departments</label>

      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button label="Add" onClick={() => setShowAdd(true)} />
      </div>

      {/* Table */}
      <DataTable stripedRows paginator value={departments} rows={10}>
        {DepartmentColumns.map((column, index) => (
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
        header={<DialogHeader text="Add Department" />}
        visible={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <AddDepartment handleCancel={handleCancel} />
      </Dialog>

      {/* Edit dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Edit Department" />}
        visible={showEdit}
        onHide={() => setShowEdit(false)}
      >
        <EditDepartment
          handleCancel={handleCancel}
          departmentId={departmentId}
        />
      </Dialog>
    </>
  );
}

export default Departments;
