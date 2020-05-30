import React, {useState, useContext} from 'react'
import {currencyFormatDE, dateFormat} from "../../../utils/utils";
import {FormGroup} from "reactstrap";
import Grid from "react-fast-grid";
import GenericTable from "../Tables2/GenericTable";
import EditDetails from "./EditDetails";
import {accountContext} from "./AccountContext";

export default function DetailsFormFinancials( props) {
  const {current, initialState, lineHeaders, data, setCurrent, getCurrentRow } = props.detailsProps;
  const value = useContext(accountContext);
  const posted=current.posted
  console.log('current', current);
  const [state, setState] = useState(initialState);

  const getInitState={...value.initialState.lines[0], editing:false};
  const initAddLine =()=> {
    const row = getInitState; //{...value.initialState.lines[0], transid:current.tid, editing:false};
    const lines_ = current.lines;
    console.log('rowN', row);
    console.log('lines_', lines_);
    const index_ = lines_.findIndex(obj => obj?.lid === row?.lid);
    const index= index_!=-1?index_:lines_.length+1
    lines_[index]= row;
    const current_={ ...current, lines:lines_};
    console.log('current_', current_);
    setState(row);
    //editLine(row);
    //value.editRow(row, false);
    setCurrent(current_);
  };
  const mapping = item => <option key={item.id} value={item.id}>
    {item.id+ " ".concat (item.name)}</option>;

  const editLine =(myCurrent)=> {
    console.log('myCurrent', myCurrent);
    const current_={...myCurrent, transid:current.tid}
    setState(current_);
    console.log('myCurrentcurrent_record', state);
    console.log('myCurrentcurrent_', current_);
    //value.editRow(row, false);
    //setCurrent(current1);
  };
  function replaceCurrentLine(lines_, newCurrent, row) {
    const index = lines_.findIndex(obj => obj.lid === newCurrent.lid);
    lines_[index] = newCurrent;
    const current_ = {...row, lines: lines_}
    return current_;
  }
  const removeLine =(myCurrent)=> {
    console.log('myCurrent', myCurrent);
    const newCurrent={...myCurrent, transid:-2}
    const lines_ = current.lines.filter(obj => typeof obj !=='undefined')
    const row = getCurrentRow
    const index = lines_.findIndex(obj => obj.lid === myCurrent.lid);
    lines_[index] = newCurrent;
    const current_ = {...row, lines: lines_}
    setState(current_);
    value.submitEdit(current_, data);
    const linesAfterRemoval = lines_.filter(obj => obj.transid === myCurrent.transid)
    const current_x= { ...row, lines:linesAfterRemoval}
    setCurrent(current_x);
    console.log('myCurrentcurrent_record', state);
    console.log('myCurrentcurrent_', current_x);
    setState(getInitState);
    //value.editRow(row, false);
    //setCurrent(current1);
  };
  const submitEditLine =(myCurrent)=> {
    const lines_ = current.lines.filter(obj => typeof obj !=='undefined')
                                       //&& obj.account && obj.oaccount)
    const duedate=myCurrent.duedate;
    const newCurrent= {...myCurrent, transid:current.tid, duedate:new Date(duedate).toISOString()};
    console.log('myCurrent', myCurrent);
    console.log('newCurrent', newCurrent);
    const row =getCurrentRow
    console.log('lines_', lines_);
    const current_ = replaceCurrentLine(lines_, newCurrent, row);
    console.log('myCurrentcurrent_', current_);
    setState(newCurrent);
    setCurrent(current_);
    //value.submitEdit(current_, data);

  };
  const sortFunctionD=(a,b)=>{ return a.id-b.id}
  const init ={lid:0, transid:0, account:"", side:true, oaccount:""
    , amount:"", currency:"", duedate:""
    , text:"", company: "", posted:true};
  const reducerFn =(a,b)  =>({lid:'', transid:'', account:"", side:true, oaccount:""
    , amount:Number(a.amount)+Number(b.amount)
    , currency:b.currency, duedate:"", text:"", company: "", posted:true});

  const  addRunningTotal = (data) => data.length>0?data.reduce(reducerFn, init):init;
  const renderDT=(data)=> addRunningTotal(data);
  const renderTotal = (record) =>(
    <tr key={Number.MAX_SAFE_INTEGER + 1}>
      <td className='amount Total' colSpan="7">{currencyFormatDE(Number(record.amount))}</td>
      <td className='Total'>{record.currency}</td>
      <td></td>
    </tr>
  );
  const renderDetails = datax => {
    {console.log('datax', datax)}
    return <>
      { (typeof datax !=='undefined')?
        (<tr key={datax.lid}>
          <td>{datax.lid}</td>
          <td>{datax.account}</td>
          <td>{datax.side.toString()}</td>
          <td>{datax.oaccount}</td>
          <td>{dateFormat(datax.duedate, "dd mm yy")}</td>
          <td>{datax.text}</td>
          <td className='amount'>{currencyFormatDE(Number(datax.amount))}</td>
          <td>{datax.currency}</td>
          <td>
            <button
              onClick={(e) => {
                e.preventDefault();
                editLine(datax);
              }}
              className="button muted-button"
              disabled={posted}>
              Edit
            </button>
            <button
              onClick={() => removeLine(datax)}
              className="button muted-button"
              disabled={posted}>
              Delete
            </button>
          </td>
        </tr>)
        : (<div>NULL</div>)
      }
    </>
  }

  return (<>
          <GenericTable data={(current.lines&&current.lines.length) > 0 ? current.lines:[value.initialState.lines[0]]}
                        renderData={renderDetails}
                        renderTotal={renderTotal}
                        renderDT = {renderDT}
                        headers= {lineHeaders}
                        sortFn={sortFunctionD} disabled={posted}/>
          <EditDetails props={{value:value, initState:state, title:value.lineTitle, submitEditLine:submitEditLine
            , initAddLine:initAddLine, posted:posted, mapping:mapping}} />
        </>
  );
}
