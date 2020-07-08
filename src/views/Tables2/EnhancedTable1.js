
import React, {useContext, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {EnhancedTableToolbar, EnhancedTableHead, getComparator, stableSort}
             from './EnhancedTableProps'
import Box from "@material-ui/core/Box/Box";
import {makeStyles, withStyles} from "@material-ui/core/styles";

const useStyles_ = makeStyles((theme)=>({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    maxHeight: 580,
  },

}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color:'#eee',
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fff9e6'//theme.palette.background.default,
    },
    color:'#eee',
    padding:2,
    height:5,
  },
}))(TableRow);
export default function EnhancedTable( props) {
        const {title, columns, rows, rowsPerPageOptions, edit, submit, cancel, useStylesx, handleFilter} = props.props;
        const useStyles=useStylesx?useStylesx:useStyles_;
        const classes = useStyles();
        const [order, setOrder] = useState('asc');
        const [orderBy, setOrderBy] = useState('id');
        const [selected, setSelected] = useState([]);
        const [page, setPage] = useState(0);
        const [dense, setDense] = useState(true);
        const [rowsPerPage, setRowsPerPage] = useState(5);

       columns.map((column) =>  console.log("column", column));


        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const handleSelectAllClick = (event) => {
            setSelected([]);
        };

  const handleChecked = (id) => {
    const selectedIndex = selected.indexOf(id);
    console.log('id', id);
    console.log('selectedIndex', selectedIndex);
    edit(id);
    setSelected([id]);
  }
        const handleClick = (event, id) => {
            const selectedIndex = selected.indexOf(id);
            console.log('id', id);
           console.log('selectedIndex', selectedIndex);
            edit(id);
           setSelected([id]);
            /*
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
          console.log('newSelected', newSelected);
         setSelected(newSelected);
             */

        };

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const handleChangeDense = (event) => {
            setDense(event.target.checked);
        };

        const isSelected = (name) => selected.indexOf(name) !== -1;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <div className={classes.root} style={{padding:0}}>
                <Paper className={classes.paper} style={{padding:0}}>
                    <EnhancedTableToolbar title={title} numSelected={selected.length} submit ={submit}
                                          cancel ={cancel}
                                          selected={selected}
                                          setSelected={setSelected}
                                          handleFilter={handleFilter}
                                          handleSelectAllClick={handleSelectAllClick} style={{padding:0}}/>
                    <Box color="text.primary" style={{padding:0}}>
                      <TableContainer className={classes.container} style={{padding:0}}>
                        <Table aria-label="sticky table"  size={dense ? 'small' : 'medium'}
                            className={classes.table}
                            aria-labelledby="tableTitle" style={{padding:0}}>
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                edit={edit}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={columns}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <StyledTableRow
                                                hover
                                                //onClick={(event) => handleClick(event, row.id)}
                                                onChecked={(event) => handleChecked(row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}>
                                                <StyledTableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.id}
                                                </StyledTableCell>
                                                <StyledTableCell>{row.name}</StyledTableCell>
                                                <StyledTableCell>{row.description}</StyledTableCell>
                                                <StyledTableCell align="right">{row.modelid}</StyledTableCell>
                                                <StyledTableCell>{row.parent}</StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <StyledTableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <StyledTableCell colSpan={6} />
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        );
    }
