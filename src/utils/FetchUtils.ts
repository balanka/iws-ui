import {createGrid, GridApi, GridOptions} from "ag-grid-community";

export const EditRow = <A>(edited:A, isNew:boolean, setCurrent:(arg0: A) => void) =>
    setCurrent({ ...edited, editing: !isNew })

export const fetchData = <A>(
        url:string,
        ctx:string,
        token:string,
        gridOptions: GridOptions<A>,
        gridDiv: HTMLElement):GridApi<A> => {
        let gridApi: GridApi<A>
        fetch(url.concat(ctx), {
            headers: {
                method: 'GET',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((data: A[]) => gridApi.setGridOption("rowData", data))
        gridApi =  createGrid(gridDiv, gridOptions)
        return  gridApi
    }

