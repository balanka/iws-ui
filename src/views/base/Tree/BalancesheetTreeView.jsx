import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import {getComparator, stableSort} from "../Tables2/EnhancedTableProps";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {MinusSquare, CloseSquare, PlusSquare, StyledTableCell, StyledTableRow, StyledTreeItem
    ,  useStyles_} from './CustomTreeViewHelper'
import useFetch from "../../../utils/useFetch";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function BalancesheetTreeView(props) {
    const {title, columns, rows, rowsPerPageOptions, edit, editable, submit, cancel
        , post, useStylesx, handleFilter} = props.props;
    //console.log('rowsXX', rows)
    const useStyles=useStylesx?useStylesx:useStyles_;
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    //const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const handleChangeRowsPerPage = (event) => {
        //setRowsPerPage(parseInt(event.target.value, 10));
       // setPage(0);
    };
    //const handleChangePage = (event, newPage) => setPage(newPage);
    //const handleChangeDense = (event) => setDense(event.target.checked);
    const isSelected = (name) => selected.indexOf(name) !== -1;
   // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChecked = (id) => {
        const selectedIndex = selected.indexOf(id);
        console.log('id', id);
        //console.log('selectedIndex', selectedIndex);
        //edit(id);
        setSelected([id]);

    }
    function renderTableRow (id,row, columns, isItemSelected, labelId) {
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
        {columns.map((column) => {
            const value = row[column.id];
           // console.log("valued", value)
            return (
                <StyledTableCell component="th" scope="row" align={column.numeric?"right":"left"}>
                    {column.format && (column.numeric)
                        ? column.format(value) : value}
                </StyledTableCell>
            );
        })}
    </StyledTableRow>
)
}
    function renderTreeItem (id, item, columns, isItemSelected, labelId) {
        //console.log('itemC', item)
        return (
              <StyledTreeItem nodeId={id} label={item.name}>
                 {item.subAccounts.size>0? item.subAccounts.map( row=>renderTableRow(id,row, columns, isItemSelected, labelId)):
                 renderTableRow(id, item, columns, isItemSelected, labelId)
                }
              </StyledTreeItem>

        )
    }


    return (
        <TreeView
            className={classes.root}
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}>
            <StyledTreeItem nodeId="1" label={title}>
                {    stableSort(rows, getComparator(order, orderBy)).reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                        const id=row?.id?row.id:row.tid
                        //console.log('idx', id)
                        const isItemSelected = isSelected(id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                        renderTreeItem(id, row,columns, isItemSelected, labelId ))
                    })
                }
            </StyledTreeItem>
        </TreeView>
      )

}
