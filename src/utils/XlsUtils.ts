import * as XLSX from 'xlsx'
import {printDocProps, SaveProps} from '../Props.ts'
import {TemplateHandler} from 'easy-template-x'

// export const EditRow = <A>(edited:A, isNew:boolean, setCurrent:(arg0: A) => void) =>
//     setCurrent({ ...edited, editing: !isNew })

export const  saveXlsx =  ({fileName, sheetName, data }:SaveProps):void => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
}

export const saveFile =({templateFileName, blob}:{templateFileName: string, blob: Blob}):void => {

    // get downloadable url from the blob
    console.log('filename', templateFileName);
    console.log('blob',  blob);
    const blobUrl = URL.createObjectURL(blob);
    // create temp link element
    let link:any= document.createElement("a");
    link.download = templateFileName;
    link.href = blobUrl;
    // use the link to invoke a download
    document.body.appendChild(link);
    link.click();
    // remove the link
    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
    }, 0);
}
export const showFile = async ({e, templateFileName, data}:printDocProps) => {
    e.preventDefault()
    const handler = new TemplateHandler();
    console.log('e.target.files[0]', e.target.files[0])
    console.log('data', data)
    handler.process(e.target.files[0], data).then ((doc:Blob) => saveFile({templateFileName:templateFileName, blob:doc}))
}