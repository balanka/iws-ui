import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { Card,  CardBody, CardHeader, Col, Collapse,FormGroup, Row} from "reactstrap";
import {columns, rows, useStyles} from './StickyHeadTableProps';

export default function StickyHeadTable( props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    const toggle= ()=> {
        setState({ collapse: !state.collapse,fadeIn:false, timeout: 300});
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
         <Row lassName ={classes.root}>
            <Col xs="12" md="12">
            <Card>
                <CardHeader style={{ height: 60, padding:10 }}>
                    <FormGroup row className ="flex-row" style={{ height: 50, padding:10 }}>
                        <Col sm="1">
                            <strong>Account</strong>
                        </Col>
                        <Col sm="10"/>
                        <Col sm="1" style={{  align: 'right' }}>
                            <div className="card-header-actions" style={{ height: 5, padding:1, }}>
                                <IconButton color="primary"   aria-label="add to shopping cart" onClick={toggle} style={{border:0, background:'none', float:'right', 'padding':0}}>
                                    <AddIcon/>
                                    <ClearIcon/>
                                    {state.collapse?<KeyboardArrowDown/>:<KeyboardArrowUp/>}
                                </IconButton>

                            </div>
                        </Col>
                    </FormGroup>
                </CardHeader>
                <Collapse isOpen={state.collapse} id="JScollapse" style={{height:70,padding:2}}>
           <CardBody>
              <Box color="text.primary">

              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Box>
       </CardBody>
     </Collapse>
     </Card>
    </Col>
    </Row>
    );
}
