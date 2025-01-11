import React, { useState, useEffect } from 'react';
import { AdminContainer, ExportCSVButton, HeaderRow } from './styles';
import {
  APPLICATION_TABLE_HEADERS,
  NOMINATION_TABLE_HEADERS,
} from '../../components/tables/AdminTable/constants';
import { TableEntry } from '../../components/tables/AdminTable/types';
import AdminTable from '../../components/tables/AdminTable';
import LoginForm from '../../components/forms/LoginForm';

import { getFullPath } from './../../utils';


const Admin: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [nominations, setNominations] = useState<TableEntry[]>([]);
  const [applications, setApplications] = useState<TableEntry[]>([]);
  const getData = (url: string, setData: (data: TableEntry[]) => void) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log('errored');
          throw new Error('Failed to fetch data');
        }
        console.log('didnt error');
        const out = response.json();
        console.log(out);
        return out;
      })
      .then((data) => {
        console.log('data:', data);
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching:', error);
      });
  };
  useEffect(() => {
    getData('https://nomination-system-2.onrender.com/api/nominations', setNominations);
  }, []);
  useEffect(() => {
    getData('https://nomination-system-2.onrender.com/api/applications', setApplications);
  }, []);

  if (!loggedIn) return <LoginForm setLoginStatus={setLoggedIn} />;
  
  console.log('HEREEE')
  

  const exportToCsv = (
    data: TableEntry[],
    filename: string,
    headers: string[]
  ) => {
    const someData =
      headers + data.map((row) => Object.values(row).join(',')).join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + someData;
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <AdminContainer>
      <HeaderRow>
        Applications
        <ExportCSVButton
          variant="contained"
          onClick={() =>
            exportToCsv(
              applications,
              'applications.csv',
              APPLICATION_TABLE_HEADERS
            )
          }
        >
          Export Applications to CSV
        </ExportCSVButton>
      </HeaderRow>
      <AdminTable data={applications} />

      <HeaderRow>
        Nominations
        <ExportCSVButton
          variant="contained"
          onClick={() =>
            exportToCsv(
              nominations,
              'nominations.csv',
              NOMINATION_TABLE_HEADERS
            )
          }
        >
          Export Nominations to CSV
        </ExportCSVButton>
      </HeaderRow>
      <AdminTable data={nominations} />
    </AdminContainer>
  );
};

export default Admin;
