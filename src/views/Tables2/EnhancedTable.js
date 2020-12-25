import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {EnhancedTableHead, EnhancedTableToolbar, getComparator, stableSort} from './EnhancedTableProps'
import {StyledTableCell, StyledTableRow, useStyles_} from './EnhancedTableHelper'

export default function EnhancedTable( props) {
        const {title, columns, rows, rowsPerPageOptions, edit, editable, submit, cancel
            , post, useStylesx, handleFilter, reducerFn, renderTotal, selected} = props.props;
        const useStyles=useStylesx?useStylesx:useStyles_;
        const classes = useStyles();
        const [order, setOrder] = useState('asc');
        const [orderBy, setOrderBy] = useState('id');
        const [selected_, setSelected_] = useState(selected==='undefined'?[]:selected.filter(() => true));
        const [page, setPage] = useState(0);
        const [dense, setDense] = useState(true);
        const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

         useEffect(() => {}, [rows]);

        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const handleSelectAllClick = (event) => {
            setSelected_([]);
        };

        const handleChecked = (id) => {
    const selectedIndex = selected_.indexOf(id);
    console.log('id', id);
    console.log('selectedIndex', selectedIndex);
    edit(id);
    setSelected_([id]);

  }
        const NoData=() => <StyledTableRow><StyledTableCell colSpan={columns.length}/></StyledTableRow>
        const handleClick = (event, id) => {
            const selectedIndex = selected_.indexOf(id);
          const { name, value } = event.target;
            edit(id);
           setSelected_([id]);
        };
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };
        const handleChangePage = (event, newPage) => setPage(newPage);
        const handleChangeDense = (event) => setDense(event.target.checked);
        const isSelected = (name) => selected_.indexOf(name) !== -1;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const renderTableRow =(row, index)=>{
        const id=row?.id?row.id:row.tid
        const isItemSelected = isSelected(id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
            <StyledTableRow
                hover
                //onClick={(event) => handleClick(row.id)}
                onClick={() => handleChecked(id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={id}
                selected={isItemSelected}>
                <StyledTableCell padding="checkbox">
                    <Checkbox checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                    />
                </StyledTableCell>
                {columns.map((column) => {
                    const value = row[column.id];
                    return (
                        <StyledTableCell component="th" scope="row" align={column.numeric?"right":"left"}>
                            {column.format && (column.numeric)
                                //||((typeof value === 'boolean'))
                                ? column.format(value) : value}
                        </StyledTableCell>
                    );
                })}
            </StyledTableRow>
        );
    }
        return ( <>
                    <EnhancedTableToolbar title={title} numSelected={selected_.length} submit ={submit}
                                          cancel ={cancel}
                                          post   ={post}
                                          selected={selected_}
                                          setSelected={setSelected_}
                                          handleFilter={handleFilter}
                                          editing={editable ==='undefined'?true:editable}
                                          handleSelectAllClick={handleSelectAllClick} style={{height: 15, padding:0}}/>
                      <TableContainer className={classes.container} style={{padding:0}}>
                        <Table aria-label="sticky table"  size={dense ? 'small' : 'medium'}
                            className={classes.table}
                            aria-labelledby="tableTitle" style={{padding:0}}>
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected_.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                edit={edit}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={columns}
                                style={{height:10, padding:0}}
                            />
                            <TableBody>
                                {
                                   rows.length>0?stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => renderTableRow(row, index)):NoData()}

                                {reducerFn && (renderTotal(rows))}
                                {emptyRows > 0 && (
                                    <StyledTableRow style={{ height: (dense ? 33 : 53) /* emptyRows */ }}>
                                        <StyledTableCell colSpan={columns.length+1} />
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
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </>
        );
    }
