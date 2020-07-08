import React from 'react'
import {Button,Table} from "reactstrap";
import useSortableData from '../../utils/SortableDataHook';
import '../../scss/table.scss';
export default function  GenericTable (props) {
  const { items, requestSort, sortConfig } = useSortableData(props.data);
  const renderT=props.renderTotal;
  const  renderHeaders= (requestSort, sortConfig, colNames)=>{
    const classNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const renderHeader =(colName)=>(
      <th>
        <Button  size="sm" block outline color="primary"
                 type="button"
                 onClick={() => requestSort(colName.name)}
                 className={classNamesFor(colName.name)} id={colName.name}
                 style={{border:'none',padding:0, background:'none'}}>
          <i className="mb-3 mb-xl-0" ></i>
          {colName.title}
        </Button>

      </th>
    )
    return <tr>
      {colNames.map(renderHeader)}
    </tr>
  }



  const NoData=(props) => <tr><td colSpan={props.headers.length}></td></tr>
  return (

    <Table hover bordered striped responsive  size="sm">
      <thead>
      {renderHeaders(requestSort, sortConfig, props.headers)}
      </thead>
         <tbody >{items.length > 0 ? (items.map(data => props.renderData(data))):NoData(props)}
         {renderT?renderT(props.renderDT(props.data)):NoData(props)}
        </tbody>
    </Table>
  )

}
