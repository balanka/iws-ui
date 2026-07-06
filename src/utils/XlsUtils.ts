import * as XLSX from 'xlsx'
import {printDocProps, SaveProps} from '../Props.ts'
import {TemplateHandler} from 'easy-template-x'
import {IWSModel} from '../Models.ts'
//import JSZip from 'jszip';
import PizZip from "pizzip";
import Docxtemplater from 'docxtemplater'
import {saveAs} from 'file-saver'
//import pdf2md from '@opendocsg/pdf2md'


export const  saveXlsx =  ({fileName, sheetName, data }:SaveProps):void => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
}

export const saveFile =({templateFileName, blob}:{templateFileName: string, blob: Blob}):void => {
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
  new TemplateHandler().process(e.target.files[0], data)
    .then ((doc:Blob) => saveFile({templateFileName:templateFileName, blob:doc}))
}


export const generateDocx = async <A extends IWSModel>(
  current: A,
  templateName: () => string,
  getData: () => any
): Promise<void> => {
  const templateFileName = `template/${templateName()}`
  console.log('templateName', templateFileName)
  try {
    const response = await fetch(templateFileName)
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const zip = new PizZip(arrayBuffer)
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true })

    const data = await getData()   // <-- AWAIT HERE
    console.log('data', data)

    try {
      doc.render(data)
    } catch (error) {
      console.error('Error rendering document:', error)
      return
    }

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })

    const fileNamesAndExtension = templateFileName.split('.')
    const outFileName_ = fileNamesAndExtension[0] ?? 'NoFileName'
    const outFileExtension = fileNamesAndExtension[1] ?? 'docx'
    const outFileName = `${outFileName_}${current.id}.${outFileExtension}`
    console.log('outFileName==>', outFileName)
    saveAs(out, outFileName)
  } catch (err) {
    console.error('Error generating document:', err)
  }
}
export const  capitalizeFirst = (str:string)=> {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// export const getAsArrayBuffer = async (templateFileName:String) : Promise<ArrayBuffer|undefined> => {
//   try {
//     //@ts-ignore
//     const response = await fetch(templateFileName)
//     const blob = await response.blob()
//     const arrayBuffer = await blob.arrayBuffer()
//     console.log('arrayBuffer==>', arrayBuffer)
//     return arrayBuffer
//
//   } catch (err) {
//     console.error(`Error reading the file  ${templateFileName}:`, err);
//   }
// }

// export const    convertPdf2Text = async (file:File) => {
//   // Read the file locally (no upload!)
//   //const arrayBuffer = await file.arrayBuffer()
//
//   // Convert to markdown in the browser
//   return await pdf2md(file.arrayBuffer())
// }


