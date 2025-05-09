import React, { useLayoutEffect, useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import iwsStore from './Store'
import { MuiTable } from './MuiTable'
import { UseFetch } from './UseFetch'
import { MASTERFILE, useStore } from './Menu'
import { useNavigate } from 'react-router-dom'
import { formEnum } from '../utils/FORMS'
import { Get1 } from './CrudController'

const columns = [
  //column definitions...
  {
    accessorKey: 'id',
    header: 'Ide',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
]

const Example2 = () => {
  const { profile, menu, selected } = useStore()
  const { token, company, locale, currency, incomeStmtAcc } = profile
  const [sorting, setSorting] = useState([])
  const [iwsState, setIwsState] = useState(iwsStore.initialState)
  let navigate = useNavigate()
  const datax = useMemo(() => iwsState.get(11) ?? [], [iwsState])
  useLayoutEffect(() => {
    iwsStore.subscribe(setIwsState)
  }, [datax])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [expanded, setExpanded] = useState({}) //Record<string, boolean> | true
  //which rows have sub-rows expanded and need their direct sub-rows to be included in the API call
  const expandedRowIds = useMemo(
    () =>
      expanded === true
        ? 'all'
        : Object.entries(expanded)
            .filter(([_managerId, isExpanded]) => isExpanded)
            .map(([managerId]) => managerId),
    [expanded],
  )
  //  const token =
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MjY2ODUzMDAsImlhdCI6MTcyNTM4OTMwMCx3dWR1d2FsaTJ4fQ.7rC8QVYPXY-VVAmqVemuOq5lCBg2P1DmLx3WRgDqUdIOws_2lQSwmaLERZTmUy5RtrJKJHsYFDluc9HxrEJe5A'
  const ctx = '/mf/11/1000'
  const url = 'http://0.0.0.0:8091'
  const {
    //data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
  } = UseFetch({
    pagination,
    sorting,
    expandedRowIds,
    ctx,
    url,
  })

  //pagination, sorting, expandedRowIds, setDatax, ctx, url, token
  // console.log('data>>>>', data)
  console.log('datax>>>>', datax)
  //console.log('meta>>>>', meta)
  //const rootData = useMemo(() => datax.filter((r) => !r.managerId), [datax])
  const moduleUrl = MASTERFILE?.module.concat('/').concat(company)
  let module_ = menu && menu.get(!selected || selected === '/login' ? '/login' : selected)
  module_ = typeof module_ !== 'undefined' && module_ ? module_ : formEnum.LOGIN
  console.log('module_', module_)
  if (module_ === '11111' || module_ === 11111) return navigate('/login')
  else {
    const dataxx = Get1(moduleUrl, token, 11)
    console.log('dataxx>>>>XXXXX', dataxx)
  }
  const data = datax.filter((r) => !r.managerId)
  return (
    <MuiTable
      data={data}
      columns={columns}
      //setExpanded={setExpanded}
      setPagination={setPagination}
      setSorting={setSorting}
      expanded={expanded}
      isLoading={isLoading}
      pagination={pagination}
      //isError={isError}
      //isRefetching={isRefetching}
      //sorting={sorting}
    />
  )
}

const queryClient = new QueryClient()

const ExampleWithReactQueryProvider = () => (
  //App.tsx or AppProviders file. Don't just wrap this component with QueryClientProvider! Wrap your whole App!
  // eslint-disable-next-line react/react-in-jsx-scope
  <QueryClientProvider client={queryClient}>
    {/* eslint-disable-next-line react/react-in-jsx-scope */}
    <Example2 />
  </QueryClientProvider>
)

export default ExampleWithReactQueryProvider
