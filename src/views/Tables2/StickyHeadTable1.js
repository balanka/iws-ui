import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Card,  CardBody, CardHeader, Col, Collapse,FormGroup, Row} from "reactstrap";

const columns = [
    { id: 'name', label: 'Name', minWidth: 30 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 10 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('de-DE'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('de-DE'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 10,
        align: 'right',
        format: (value) => value.toFixed(2).toLocaleString('de-DE'),
        //format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable1() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [state, setState]= useState({collapse: true, fadeIn: true, timeout: 300});
    const UP="chevron-up";
    const DOWN="chevron-down";
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
       //
         <Row>
            <Col xs="12" md="12">
            <Card>
                <CardHeader style={{ height: 40, padding:20 }}>
                    <FormGroup row className ="flex-row" style={{ height: 30, padding:20 }}>
                        <Col sm="1">
                            <strong>Account</strong>
                        </Col>
                        <Col sm="10"/>
                        <Col sm="1" style={{  align: 'right' }}>
                            <div className="card-header-actions" style={{ height: 30, padding:2 }}>
                                {/*eslint-disable-next-line*/}
                                <a href="#" className="card-header-action btn btn-setting"><i className="icon-settings"></i></a>
                                {/*eslint-disable-next-line*/}
                                <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={toggle}>
                                    <i className={state.collapse?UP:DOWN}></i></a>
                            </div>
                        </Col>
                    </FormGroup>
                </CardHeader>
                <Collapse isOpen={state.collapse} id="JScollapse" style={{height:70,padding:2}}>
                <CardBody>
          <Paper className={classes.root}>
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
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
          </Paper>
       </CardBody>
     </Collapse>
     </Card>
    </Col>
    </Row>
    );
}
