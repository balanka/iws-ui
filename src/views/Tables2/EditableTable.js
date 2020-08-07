import React, {useEffect, useState, createRef} from 'react';
import MaterialTable from 'material-table';
import {rowStyle, theme} from "../base/Tree/BasicTreeTableProps";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { makeStyles, useTheme } from "@material-ui/core/styles";

export default function EditableTable(props) {
    console.log('propsD',props);
    const {data, columns,  rowStyle,  theme, t , addRow, tableRef} = props
    console.log('props.data',props.data);
    const dx=data
    console.log('state.dx',dx);
   const [state, setState] = useState({data:dx});
    useEffect(() => {}, [props]);
    console.log('state.data',state.data);


    return (
        <MaterialTable

            tableRef={tableRef}
            //title={props.title}
            columns={columns}
            data={dx}
            icons={{
                Add: () => <Add />,
                Check: () => <Check />,
                Clear: () => <Clear />,
                Delete: () => <IndeterminateCheckBoxIcon />,
                Edit: () => <RateReviewIcon />,
                FirstPage: () => <FirstPage />,
                NextPage: () => <ChevronRight />,
                LastPage: () => <LastPage />,
                PreviousPage: () => <ChevronLeft />,
                ResetSearch: () => <Clear />,
                Search: () => <Search />
            }}
            editable={{
               /* onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data_ = [...prevState.data];
                                data_.push(newData);
                                return { ...prevState, data:data_ };
                            });
                        }, 600);
                    }),

                */
                onRowUpdate: (newData, oldData) =>

                    new Promise((resolve) => {
                        console.log('tableRef.current', tableRef.current);
                        setTimeout(() => {
                            resolve();

                            if (oldData) {
                                setState((prevState) => {
                                    const datax = [...prevState.data];
                                    datax[datax.indexOf(oldData)] = newData;
                                    return { ...prevState, data:datax };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const datax = [...prevState.data];
                                datax.splice(datax.indexOf(oldData), 1);
                                return { ...prevState, data:datax };
                            });
                        }, 600);
                    }),
            }}
            options={{
                //overflowY:false,
                toolbar:false,
                draggable:false,
                header:true,
                addRowPosition: "first",
                paging:false,
                showFirstLastPageButtons:false,
                showTitle:false,
                padding:"dense",
                filtering: false,
                search: false,
                cellStyle: {padding: '0.3em', fontSize: 10,},
                //headerStyle: {padding: '0.3em', fontSize: 10,},
                root: {
                    '&:nth-child(odd)': {
                        backgroundColor: '#fff9e6'//theme.palette.background.default,
                    },
                    color: '#eee',
                    padding: 0.5,
                    height: 3,
                    hover: true
                },
                rowStyle: rowStyle
            }}
            localization={{
                body: {
                    emptyDataSourceMessage:t('muitable.emptyDataSourceMessage'),
                    addTooltip:t('muitable.addTooltip'),
                    deleteTooltip: t('muitable.deleteTooltip'),
                    editTooltip: t('muitable.editTooltip'),
                    filterRow: {
                        filterTooltip: t('muitable.filterTooltip')
                    },
                    editRow: {
                        deleteText: t('muitable.deleteText'),
                        cancelTooltip: t('muitable.cancelTooltip'),
                        saveTooltip: t('muitable.saveTooltip'),
                    }
                },
                grouping: {
                    placeholder: t('muitable.placeholder'),
                    groupedBy: t('muitable.groupedBy'),
                },
                header: {
                    actions: t('muitable.actions'),
                },
                pagination: {
                    labelDisplayedRows: t('muitable.labelDisplayedRows'),
                    labelRowsSelect: t('muitable.labelRowsSelect'),
                    labelRowsPerPage: t('muitable.labelRowsPerPage'),
                    firstAriaLabel: t('muitable.firstAriaLabel'),
                    firstTooltip: t('muitable.firstTooltip'),
                    previousAriaLabel: t('muitable.previousAriaLabel'),
                    previousTooltip: t('muitable.previousTooltip'),
                    nextAriaLabel: t('muitable.previousTooltip'),
                    nextTooltip:t('muitable.nextTooltip'),
                    lastAriaLabel: t('muitable.lastAriaLabel'),
                    lastTooltip: t('muitable.lastTooltip'),
                },
                toolbar: {
                    addRemoveColumns: t('muitable.addRemoveColumns'),
                    nRowsSelected: t('muitable.nRowsSelected'),
                    showColumnsTitle: t('muitable.showColumnsTitle'),
                    showColumnsAriaLabel: t('muitable.showColumnsAriaLabel'),
                    exportTitle: t('muitable.exportTitle'),
                    exportAriaLabel: t('muitable.exportAriaLabel'),
                    exportName: t('muitable.exportName'),
                    searchTooltip:t('muitable.searchTooltip'),
                    searchPlaceholder: t('muitable.searchPlaceholder'),
                }
            }}
        />
    );
}