import React, {useState, createRef, useContext, useEffect} from 'react';

import {capitalize, currencyFormatDE} from "../../../utils/utils"
import { TreeTable, TreeState } from 'cp-react-tree-table';

//import './index.css';

import './table.css';
import './responsive.css';


export default function TreeTableView ( props)  {
  const  data  = props.data
  console.log("propsZ", props);
  const treeTableRef = createRef();
  console.log("dataZ", data);
  const [state, setState] = useState({treeValue: TreeState.create(data)});
  const handleOnChange = (newValue) => {
    console.log('newValueX', newValue)
    setState({ treeValue: newValue });
  }
  const { treeValue } = state
  console.log('treeValue', treeValue)
  const handleOnScroll = (newValue) => {
    console.log('onScroll', newValue)
  }

  const handleOnExpandAll = () => {
    console.log('Expand all');
    setState((state) => {
      return {
        treeValue: TreeState.expandAll(state.treeValue),
      };
    });
  }

  const  handleOnCollapseAll = () => {
    console.log('Collapse all');
    setState((state) => {
      return {
        treeValue: TreeState.collapseAll(state.treeValue)
      };
    });
  }




  const renderHeaderCell = (name, alignLeft = true) => {
    console.log('onScroll', treeValue)
    return () => {
      return (
          <span className={alignLeft ? 'align-left' : 'align-right'}>{name}</span>
      );
    }
  }

  const  renderIndexCell = (row) => {
    return (
        <div style={{ paddingLeft: (row.metadata.depth * 15) + 'px'}}>
          <button className={`toggle-button ${row.$state.isExpanded ? 'expanded' : ''}`}
                  onClick={row.toggleChildren}
                  disabled={!row.metadata.hasChildren}>

            <span className='id'>{row.data.id}</span>
          </button>
        </div>
    );
  }

  const renderICreditCell = (row) => {
    return (
        <span className="amount-cell">{currencyFormatDE(Number(row.data.icredit))}</span>
    );
  }
  const renderIDebitCell = (row) => {
    return (
        <span className="amount-cell">{currencyFormatDE(Number(row.data.idebit))}</span>
    );
  }

  const renderDebitCell = (row) => {
    return (
        <span className="amount-cell">{currencyFormatDE(Number(row.data.debit))}</span>
    );
  }
  const renderCreditCell = (row) => {
    return (
        <span className="amount-cell">{currencyFormatDE(Number(row.data.credit))}</span>
    );
  }
  const renderBalanceCell = (row) => {
    return (
        <span className="amount-cell">{currencyFormatDE(Number(row.data.idebit+row.data.debit) -Number(row.data.icredit+row.data.credit))}</span>
    );
  }
  const renderCurrencyCell = (row) => {
    return (
        <span className="amount-cell">{row.data.currency}</span>
    );
  }
  const  renderEditableCell = (row) => {
    return (
        <input type="text" value={row.data.name}
               onChange={(event) => {
                 row.updateData({
                   ...row.data,
                   contact: event.target.value,
                 });
               }}/>
    );
  }


  function buildForm() {
    return (<>
        <TreeTable className="tree-table"
                   height="400"
                   headerHeight="30"
                   value={treeValue}
                   onChange={handleOnChange}

                   ref={treeTableRef}
                   onScroll={handleOnScroll}  style={{ padding:5 }}>
          <TreeTable.Column renderCell={renderIndexCell} renderHeaderCell={renderHeaderCell('Id')} basis="180px"
                            grow="0"/>
          <TreeTable.Column renderCell={renderEditableCell} renderHeaderCell={renderHeaderCell('Name')}/>
          <TreeTable.Column renderCell={renderIDebitCell} renderHeaderCell={renderHeaderCell('IDebit', false)}/>
          <TreeTable.Column renderCell={renderDebitCell} renderHeaderCell={renderHeaderCell('Debit', false)}/>
          <TreeTable.Column renderCell={renderICreditCell} renderHeaderCell={renderHeaderCell('ICredit', false)}/>
          <TreeTable.Column renderCell={renderCreditCell} renderHeaderCell={renderHeaderCell('Credit', false)}/>
          <TreeTable.Column renderCell={renderBalanceCell} renderHeaderCell={renderHeaderCell('Balance', false)}/>
          <TreeTable.Column renderCell={renderCurrencyCell} renderHeaderCell={renderHeaderCell('Currency', true)}/>
        </TreeTable>
    </>);
  }
return buildForm()

}
  