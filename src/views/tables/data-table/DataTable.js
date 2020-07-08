import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable
} from '@coreui/react'
import usersData from '../../users/UsersData.js'
import { useTranslation, withTranslation, Trans } from 'react-i18next';

const DataTable = () => {
  const [details, setDetails] = useState([])
  // const [items, setItems] = useState(usersData)
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const fields = [
    { key: 'name', label:t('description.name'), _style: { width: '30%'} },
    { key: 'description', label:t('description.description'), _style: { width: '30%'} },
    'registered',
    { key: 'role', label:t('description.role'), _style: { width: '10%'} },
    { key: 'status', label:t('description.status'), _style: { width: '10%'} },
    {
      key: 'show_details',
      label:t('description.show_details'),
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  return (
    <CCard>
      <CCardHeader>
        {t('description.name')} Advanced Data Table{' '}

      </CCardHeader>

      <CCardBody>

        <CDataTable
          items={usersData}
          fields={fields}
          columnFilter
          tableFilter
          footer
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          sorter
          pagination
          // loading
          // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
          // onPageChange={(val) => console.log('new page:', val)}
          // onPagesChange={(val) => console.log('new pages:', val)}
          // onPaginationChange={(val) => console.log('new pagination:', val)}
          // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
          // onSorterValueChange={(val) => console.log('new sorter value:', val)}
          // onTableFilterChange={(val) => console.log('new table filter:', val)}
          // onColumnFilterChange={(val) => console.log('new column filter:', val)}
          scopedSlots = {{
            'status':
              (item)=>(
                <td>
                  <CBadge color={getBadge(item.status)}>
                    {item.status}
                  </CBadge>
                </td>
              ),
            'show_details':
              item => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => { toggleDetails(item.id) }}
                    >
                      { details.includes(item.id) ? 'Hide' : 'Show' }
                    </CButton>
                  </td>
                )
              },
            'details':
                item => {
                  return (
                  <CCollapse show={details.includes(item.id)}>
                    <CCardBody>
                      <h4>
                        {item.username}
                      </h4>
                      <p className="text-muted">User since: {item.registered}</p>
                      <CButton size="sm" color="info">
                        User Settings
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1">
                        Delete
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                )
              }
          }}
        />

      </CCardBody>
    </CCard>
  )
}

export default DataTable
