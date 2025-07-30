import React, { useState, useEffect } from 'react';
import {
  AdminContainer,
  ExportCSVButton,
  HeaderRow,
  SemesterSelect,
} from './styles';
import {
  APPLICATION_TABLE_HEADERS,
  NOMINATION_TABLE_HEADERS,
} from '../../components/tables/AdminTable/constants';
import {
  TableEntry,
  NomineeTableEntry,
} from '../../components/tables/AdminTable/types';
import NomineeTable from '../../components/tables/AdminTable/NomineeTable';
import AdminTable from '../../components/tables/AdminTable';
import LoginForm from '../../components/forms/LoginForm';
import { MenuItem } from '@mui/material';
import { getFullPath } from './../../utils';

const Admin: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [nominations, setNominations] = useState<TableEntry[]>([]);
  const [applications, setApplications] = useState<TableEntry[]>([]);
  const [nominees, setNominees] = useState<NomineeTableEntry[]>([]);

  const getDataForNominees = (
    url: string,
    setData: (data: NomineeTableEntry[]) => void
  ) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const out = response.json();
        return out;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('OVER 20:', error);
      });
  };

  const getData = (url: string, setData: (data: TableEntry[]) => void) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const out = response.json();
        return out;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching:', error);
      });
  };
  useEffect(() => {
    getDataForNominees(getFullPath('/api/nominations/over/20'), setNominees);
  }, []);
  useEffect(() => {
    getData(getFullPath('/api/nominations'), setNominations);
  }, []);
  useEffect(() => {
    getData(getFullPath('/api/applications'), setApplications);
  }, []);

  if (!loggedIn) return <LoginForm setLoginStatus={setLoggedIn} />;

  const exportToCsv = (
    data: TableEntry[],
    filename: string,
    headers: string[]
  ) => {
    const formatCsvValue = (value: string) =>
      // just make it so that if the value itself contains a comma it does not format weirdly
      value.includes(',') ? `"${value.replace(/"/g, '""')}"` : value;

    const someData =
      headers.join(',') + '\n' +
      data.map(row => Object.values(row).map(formatCsvValue).join(',')).join('\n');

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
      <label htmlFor="semester">Choose a semester: </label>
      <br></br>
      <br></br>
      <SemesterSelect
        name="semester"
        id="semester"
        style={{ backgroundColor: "white", width: "200px", marginLeft: "20px" }}
        >
        <MenuItem value="Spring2025">Fall 2025</MenuItem>
      </SemesterSelect>

      <br />
      <br />

      <HeaderRow>20+ Nominations</HeaderRow>
      <NomineeTable data={nominees} />

      <br />

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

      <br />

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
