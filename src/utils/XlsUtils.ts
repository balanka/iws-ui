import * as XLSX from 'xlsx'
import {printDocProps, SaveProps} from '../Props.ts'
import {TemplateHandler} from 'easy-template-x'
import {ILineTransaction, ITransaction, IWSLine, IWSTransaction} from "../Models.ts";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import {saveAs} from "file-saver";


export const  saveXlsx =  ({fileName, sheetName, data }:SaveProps):void => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
}

export const saveFile =({templateFileName, blob}:{templateFileName: string, blob: Blob}):void => {

    // get downloadable url from the blob
    // console.log('filename', templateFileName);
    // console.log('blob',  blob);
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

export const generateDocx = async <A extends IWSTransaction<L>, L extends IWSLine>( current:A, templateName:() =>String
                                       , buildTotal:(arg:A)=>Number, formatLines: (arg:L)=>L) : Promise<void> => {
  const templateFileName = templateName()
  console.log('templateName', templateFileName)

  try {
    //@ts-ignore
    const response = await fetch(templateFileName)
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const zip = new PizZip(arrayBuffer)
    const doc = new Docxtemplater(zip, {paragraphLoop: true, linebreaks: true,})
    doc.setData({transdate: current.transdate, total: Number(buildTotal(current)).toFixed(2),
      lines: current.lines.map((line:L) =>  formatLines(line)),
    });

    try {
      doc.render()
    } catch (error) {
      console.error('Error rendering document:', error);
      return;
    }

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    //saveAs(out, 'Goodreceiving.docx');
    const fileNamesAndExtenstion= templateFileName.split('.')
    const outFileName_= fileNamesAndExtenstion[0]??'NoFileName'
    const outFileExtension= fileNamesAndExtenstion[1]??'docx'
    const outFileName= `${outFileName_}${current.id}.${outFileExtension}`
    console.log('outFileName==>', outFileName)
    saveAs(out, outFileName)
  } catch (err) {
    console.error('Error generating document:', err);
  }
}

export const generateTransactionDocx = async ( current:ITransaction, templateName:() =>String) => {
  const templateFileName = templateName()
  console.log('templateName', templateFileName)
  const calcTotal = (current: ITransaction) =>
    current?.lines?.reduce((acc: number, line: ILineTransaction) => acc + line.quantity * line.price + line.vat, 0.0)


  const getNet = (line:ILineTransaction):ILineTransaction =>  {
    // @ts-ignore
    const v:ILineTransaction= {
      ...line
      // @ts-ignore
      , quantity: Number(line.quantity).toFixed(2)
      // @ts-ignore
      , price: Number(line.price).toFixed(2)
      // @ts-ignore
      , vat: Number(line.vat).toFixed(2)
      // @ts-ignore
      , net: Number((line.quantity * line.price) + line.vat).toFixed(2)
    }
    // @ts-ignore
    return v
  }

  try {
    // @ts-ignore
    const response = await fetch(templateFileName)
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const zip = new PizZip(arrayBuffer)
    const doc = new Docxtemplater(zip, {paragraphLoop: true, linebreaks: true,})
    doc.setData({transdate: current.transdate, total: Number(calcTotal(current)).toFixed(2),
      lines: current.lines.map((line:ILineTransaction)=>  getNet(line)),
    });

    try {
      doc.render()
    } catch (error) {
      console.error('Error rendering document:', error);
      return;
    }

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    //saveAs(out, 'Goodreceiving.docx');
    const fileNamesAndExtenstion= templateFileName.split('.')
    const outFileName_= fileNamesAndExtenstion[0]??'NoFileName'
    const outFileExtension= fileNamesAndExtenstion[1]??'docx'
    const outFileName= `${outFileName_}${current.id}.${outFileExtension}`
    console.log('outFileName==>', outFileName)
    saveAs(out, outFileName)
  } catch (err) {
    console.error('Error generating document:', err);
  }
}
