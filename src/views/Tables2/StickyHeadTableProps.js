import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const columns = [
    { id: 'name', label: 'Name', minWidth: 30 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 10 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('de-DE'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 100,
        align: 'right',
        format: (value) => value.toLocaleString('de-DE'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 10,
        align: 'right',
        format: (value) => value.toFixed(2).toLocaleString('de-DE'),
        //format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}



export const useStyles = makeStyles((theme)=>({
    root: {
        width: '100%',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    container: {
        maxHeight: 440,
    },
}));

