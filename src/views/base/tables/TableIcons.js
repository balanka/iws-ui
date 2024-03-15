import React, { forwardRef } from 'react'
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // tableIcons
  // eslint-disable-next-line react/display-name
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}
