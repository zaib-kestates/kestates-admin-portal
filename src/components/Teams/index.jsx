import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { TeamColumns, messageTemplate } from '../../constants';
import { getData } from '../../services/Team';
import DialogHeader from '../Layouts/DialogHeader';
import Metadata from './Metadata';

function Team() {
  const navigate = useNavigate();
  const location = useLocation();
  const [teams, setTeams] = useState();
  const [showMetadata, setShowMetadata] = useState(false);
  const message = useRef(null);

  const actionTemplate = (team) => {
    return (
      <a className="link-edit" onClick={() => navigate(`/teams/${team.id}`)}>
        Edit
      </a>
    );
  };

  // Handle cancel metadata
  const handleCancel = (e, isSave = false) => {
    e.preventDefault();

    setShowMetadata(false);

    if (isSave) {
      message.current.show(
        messageTemplate('success', 'Metadata saved successfully')
      );
    }
  };

  // Function to get data
  const fetchData = async () => {
    const data = await getData('teams');
    setTeams(data);
  };

  // Get data
  useEffect(() => {
    fetchData();

    /*if (location.state) {
      message.current.show(
        messageTemplate('success', 'Team saved successfully')
      );
    }*/
  }, []);

  if (!teams) return;
  return (
    <>
      {/* Header */}
      <label className="page-header">Teams</label>
      <Messages ref={message} />

      <div className="d-flex justify-content-end mb-2">
        <Button
          label="Metadata"
          className="me-2"
          onClick={() => setShowMetadata(true)}
        />
        <Button label="Add" onClick={() => navigate('/teams/add')} />
      </div>

      {/* Table */}
      <DataTable value={teams} stripedRows paginator rows={10}>
        {TeamColumns.map((column, index) => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
          />
        ))}
        <Column
          header=""
          bodyClassName="text-center"
          style={{ width: '9%' }}
          body={actionTemplate}
        ></Column>
      </DataTable>

      {/* Metadata dialog */}
      <Dialog
        closable={false}
        className="dialog-category"
        header={<DialogHeader text="Teams Metadata" />}
        visible={showMetadata}
      >
        <Metadata handleCancel={handleCancel} />
      </Dialog>
    </>
  );
}

export default Team;
