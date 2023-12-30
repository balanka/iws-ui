import React from 'react'
import MaterialTable from '@material-table/core'
import tableIcons from './TableIcons.js'

export default function EditableTable(props) {
  const handleClick = (event, rowData) => (edit ? edit(rowData) : void 0)
  // eslint-disable-next-line react/prop-types
  const {
    // eslint-disable-next-line react/prop-types
    Options, // eslint-disable-next-line react/prop-types
    flag, // eslint-disable-next-line react/prop-types
    data, // eslint-disable-next-line react/prop-types
    columns, // eslint-disable-next-line react/prop-types
    t, // eslint-disable-next-line react/prop-types
    tableRef, // eslint-disable-next-line react/prop-types
    edit, // eslint-disable-next-line react/prop-types
    editable, // eslint-disable-next-line react/prop-types
    setSelectedRows, // eslint-disable-next-line react/prop-types
    parentChildData,
  } = props
  var editFunction = typeof edit === 'function'

  return (
    <MaterialTable
      style={{ padding: '0 8px', paddingTop: 5 }}
      headerStyle={{
        height: 10,
        maxHeight: 10,
        paddingTop: 20,
        backgroundColor: '#039be5',
        color: '#FFF',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
      editable={flag ? null : editable}
      tableRef={tableRef}
      columns={columns}
      data={data}
      icons={tableIcons}
      options={Options} //, columnResizable:true, doubleHorizontalScroll:true, padding:'dense'
      parentChildData={parentChildData}
      onRowClick={handleClick}
      onSelectionChange={(rows, rowData) => {
        setSelectedRows(rows)
        // eslint-disable-next-line react/prop-types
        if (Options.selection && editFunction && rows.length > 0) {
          edit({ ...(rowData ? rowData : rows[0]) })
        } else editFunction && rows.length > 0 ? edit(rows) : void false
      }}
      localization={{
        body: {
          emptyDataSourceMessage: t('muitable.emptyDataSourceMessage'),
          addTooltip: t('muitable.addTooltip'),
          deleteTooltip: t('muitable.deleteTooltip'),
          editTooltip: t('muitable.editTooltip'),
          filterRow: {
            filterTooltip: t('muitable.filterTooltip'),
          },
          editRow: {
            deleteText: t('muitable.deleteText'),
            cancelTooltip: t('muitable.cancelTooltip'),
            saveTooltip: t('muitable.saveTooltip'),
          },
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
          //labelRowsSelect: t('muitable.labelRowsSelect'),
          labelRowsPerPage: t('muitable.labelRowsPerPage'),
          firstAriaLabel: t('muitable.firstAriaLabel'),
          firstTooltip: t('muitable.firstTooltip'),
          previousAriaLabel: t('muitable.previousAriaLabel'),
          previousTooltip: t('muitable.previousTooltip'),
          nextAriaLabel: t('muitable.previousTooltip'),
          nextTooltip: t('muitable.nextTooltip'),
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
          searchTooltip: t('muitable.searchTooltip'),
          searchPlaceholder: t('muitable.searchPlaceholder'),
        },
      }}
    />
  )
}
