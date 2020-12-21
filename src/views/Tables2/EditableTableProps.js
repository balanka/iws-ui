const removeTableData = (datax) => {
    const clonex = JSON.parse(JSON.stringify(datax));
    for (const element of clonex) {
        //console.log("element", element);
        delete element.tableData;
    }
    return clonex;
};

export const Editable = (data, setData) => ({
    onRowAdd: (newData) =>
        new Promise((resolve) => {
            setTimeout(() => {
                const datax = Object.values(data);
                const datax1 = datax;
                console.log("dataxI0", datax);
                console.log("dataxI1", datax1);
                datax1.push(newData);

                setData(datax1);
                console.log("dataxI1", datax1);
                console.log("data", data);
                resolve();
            }, 600);
        }),
    onRowUpdate: (newData, oldData) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                console.log("oldData", oldData);
                const datax = Object.values(data);
                const datax1 = Object.values(data);
                console.log("datax0", datax);
                console.log("length", datax1.length);
                const index = datax.indexOf(oldData);
                console.log("index", index);
                datax[index] = newData;
                setData(datax, () => resolve());
                const data2x = removeTableData(datax);
                console.log("data2x ", data2x);
            }, 600);
        }),
    onRowDelete: (oldData) =>
        new Promise((resolve) => {
            setTimeout(() => {
                const datax = JSON.parse(JSON.stringify(data));
                const datax12 = JSON.parse(JSON.stringify(data));
                console.log("datax12", datax12);
                const index = datax.indexOf(oldData);
                const datax1 = datax.splice(index, 1);
                console.log("index", index);
                console.log("datax", datax);
                console.log("datax1", datax1);
                console.log("datax12", datax12);
                console.log("data", data);
                setData(datax, () => resolve());
            }, 900);
        })
});
