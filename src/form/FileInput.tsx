import React from 'react';
import * as XLSX from 'xlsx';

function FileInput() {
    const [data, setData] = React.useState<Accountx[]>();
    type A = { id:string, name: string, parent:string}
    type Accountx =  A & {  modelid?:number, company:string}


    const handleFileUpload = (e:any) => {
        const file:any = e.target.files[0]
        const reader = new FileReader()

        reader.onload = (event) => {
            const workbook = XLSX.read(event?.target?.result, { type: 'binary' })
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const data:A[] = XLSX.utils.sheet_to_json(sheet)
            const sheetData:Accountx[] = data.map((m:A) => {return {  ...m, modelid:9, company:'1000'}})
            setData(sheetData);
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            {data && (
                <div>
                    <h2>Imported Data:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default FileInput