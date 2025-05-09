import { keepPreviousData, useQuery } from '@tanstack/react-query'
import iwsStore from './Store'
import { useStore } from './Menu'

export const UseFetch = (props) => {
  const { pagination, sorting, expandedRowIds, ctx, url } = props
  const { profile } = useStore()
  const { token } = profile
  return useQuery({
    queryKey: [
      ctx, //'mf', //give a unique key for this query
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
      expandedRowIds,
    ],
    queryFn: async () => {
      const fetchURL = new URL(
        ctx, //'/mf/11/1000',
        url, //'http://0.0.0.0:8091',
      )
      // read our state and pass it to the API as query params
      fetchURL.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`)
      fetchURL.searchParams.set('size', `${pagination.pageSize}`)
      fetchURL.searchParams.set('start', 0)
      fetchURL.searchParams.set('size', 20)
      fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []))
      fetchURL.searchParams.set(
        'expandedRowIds',
        expandedRowIds === 'all' ? 'all' : JSON.stringify(expandedRowIds ?? []),
      )
      //use whatever fetch library you want, fetch, axios, etc
      //return await fetch('http://0.0.0.0:8091/mf/6/1000', {
      return await fetch(fetchURL.href, {
        headers: { method: 'GET', Accept: 'application/json', Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('response', data)
          iwsStore.put(11, data)
          return data
        })
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  })
}
