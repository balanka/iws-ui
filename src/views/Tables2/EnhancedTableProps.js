
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import {Input} from "reactstrap";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor:'#eee',//'#F9CC', //theme.palette.common.black,
    color: theme.palette.common.black, //'#eee',
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor:theme.palette.background.default,
    },
    color:'#eee',
    padding:2,
    height:5,
  },
}))(TableRow);
function descendingComparator(a, b, orderBy) {
    return (b[orderBy] < a[orderBy])?-1:(b[orderBy] > a[orderBy])?1:0
}
export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


export function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount
           , onRequestSort, headCells } = props
    const createSortHandler = (property) => (event) => onRequestSort(event, property);


    return (
        <TableHead style={{ height:20}}>
            <StyledTableRow style={{ height:10}} >
                <StyledTableCell style={{ paddingLeft:8, paddingRight:8, padding:0}}>
                    <Checkbox style={{ paddingLeft:15,'-webkit-box-shadow': '0px 0px 0px 1px;rgba(255,255,255,1)','-moz-box-shadow':'0px 0px 0px 1px; rgba(255,255,255,1)','box-shadow':'0px 0px 0px 1px rgba(255,255,255,1)'}}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={ onSelectAllClick}
                        onClick={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all' }}
                    />
                </StyledTableCell>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                  {order === 'desc' ? '' : ''}
                                 </span>
                                ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        padding:0,
        height:20,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.97),//0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
  //height:20,
}));

export const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { title, numSelected, submit, post, cancel, selected, setSelected, handleFilter, editing } = props;

     const [filterText, setFilterText] =useState('')
    function cancelEdit() {
      setSelected([]);
      setFilterText('');
      cancel();
    }

  const handleInputChange = event => {
    //event.preventDefault();

    const { name, value } = event.target;
     setFilterText(value);
    if (event.which ===13 || event.keyCode ===13) {
     // console.log('filter', handleFilter(value));
      handleFilter(value);
     // console.log('filter', handleFilter(value));
    }
  };
    return (
        <Toolbar style={{padding:0, height:10}}
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
          {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div" style ={{height:10, padding:0}}>
              {title} with Id: {selected.toString()}
            </Typography>
          ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              {title}
            </Typography>
          )}

            {numSelected > 0 && editing ? (
              <>
                <Tooltip title="Post" style={{padding:0, height:10}}>
                  <IconButton aria-label="post">
                    <SaveOutlinedIcon onClick={post}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" style={{padding:0, height:10}}>
                    <IconButton aria-label="edit">
                        <CheckBoxIcon onClick={submit}/>
                    </IconButton>
                </Tooltip>
              <Tooltip title="Cancel" style={{padding:0, height:10}}>
                <IconButton aria-label="Cancel">
                  <CancelTwoToneIcon onClick={cancelEdit}/>
                </IconButton>
              </Tooltip>
              </>
            ) : (
              <>
              <Input bsSize="sm" type="text" id="input-small" name="name" className="input-sm"
                     placeholder="Name" onKeyPress={handleInputChange}  onChange={handleInputChange} style={{padding:0, height:20}}/>
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list" >
                        <FilterListSharpIcon onClick={ (e ) => handleFilter(filterText)}/>
                    </IconButton>
                </Tooltip>
              </>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


