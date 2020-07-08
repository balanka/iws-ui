import React from 'react'
import { Table} from "reactstrap";
import {currencyFormatDE} from "../../../utils/utils";
export default function  GenericTable (props) {
  const renderT=props.renderTotal;
  const sortFunction=(a,b)=>{ return a.id.value-b.id.value};

  return (
    <Table hover bordered striped responsive size="sm">
      <thead>
      <tr>
        {props.headers.map(header => <th>{header}</th>)}
      </tr>
      </thead>
      <tbody>{
        props.data.length > 0 ? (props.data
            .sort(props.sortFn ? props.sortFn : sortFunction)
            .map(data => props.renderData(data))) :
          <tr>
            <td colSpan={props.headers.length}>No data found</td>
          </tr>
      }
      {
        renderT?renderT(props.renderDT(props.data)):
          <tr>
            <td colSpan={props.headers.length}>"x"</td>
          </tr>
      }
      </tbody>
    </Table>
  )

}
