import React, {useState} from 'react';
import MaterialTable from 'material-table';

export default function EditableTable(props) {
    console.log('props',props);
    console.log('props',props.data);
    const [state, setState] = useState({data:props.data});
    return (
        <MaterialTable
            title={props.title}
            columns={props.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
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
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
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
        />
    );
}