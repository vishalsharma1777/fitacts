import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useSelector } from 'react-redux';
import StarItem from './StarPerformance';
import DeletePerformance from './DeletePerformance';
import dateConverter from '../../helperFunctions/dateConverter'
import convertMsToTime from '../../helperFunctions/timeconverter'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Performance Name'
  },
  {
    id: 'activityName',
    numeric: false,
    label: 'Activity Name'
  },
  {
    id: 'distance',
    numeric: true,
    label: 'Distance (m)'
  },
  {
    id: 'duration',
    numeric: true,
    label: 'Duration (s)'
  },
  {
    id: 'speed',
    numeric: true,
    label: 'Speed (m/s)'
  },
  {
    id: 'created_at',
    numeric: true,
    label: 'Date'
  },
  {
    id: 'timeline',
    numeric: false,
    label: 'Move to Timeline'
  },
  {
    id: 'delete',
    numeric: false,
    label: 'Delete'
  }
];

function EnhancedTable({ timeline}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('distance'); 
  const tableState = useSelector((state) => state.table);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleRows = stableSort(
    tableState.tableData,
    getComparator(order, orderBy)
  );



  return (
    <Box
      sx={{
        width: '100%',
        margin: 'auto',
        marginBottom: '20px'
      }}
    >
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align='center'
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(null, headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{row.performancename}</TableCell>
                  <TableCell align='center'>{row.activityName}</TableCell>
                  <TableCell align='center'>{row.distance}</TableCell>
                  <TableCell align='center'>{convertMsToTime(row.duration)}</TableCell>
                  <TableCell align='center'>{row.speed}</TableCell>
                  <TableCell align='center'>{dateConverter(row.created_at)}</TableCell>
                  <TableCell align='center'><StarItem  performance={row} timeline={timeline}/></TableCell>
                  <TableCell align='center'><DeletePerformance performance={row}/></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default EnhancedTable;
