
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles, withStyles} from "@material-ui/core/styles";

export const useStyles_ = makeStyles((theme)=>({
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

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color:'#eee',
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fff9e6'//theme.palette.background.default,
    },
    color:'#eee',
    padding:0.5,
    height:3,
  },
}))(TableRow);
