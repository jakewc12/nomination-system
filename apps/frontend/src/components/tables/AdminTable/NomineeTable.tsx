import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NomineeTableEntry } from './types';
import { StyledTableContainer } from './styles';

interface Props {
  data: NomineeTableEntry[];
}
const NomineeTable: React.FC<Props> = ({ data }) => {
  return (
    <StyledTableContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Full Name</b>
              </TableCell>
              <TableCell>
                <b>Constituency</b>
              </TableCell>
              <TableCell>
                <b>Nominations</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow>
                <TableCell>{item.nominee}</TableCell>
                <TableCell>{item.constituency}</TableCell>
                <TableCell>{item.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledTableContainer>
  );
};
export default NomineeTable;