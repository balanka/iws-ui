import React from 'react';
import { FileInputProps } from '../Props.ts';
import { parseExcelToFinancials } from '../utils/FileImport';
import {IAccount, ICustomer, IFinancials, ISupplier} from '../Models.ts';

function FileInput<T extends (IAccount|ICustomer|ISupplier)>(fileInputProps: FileInputProps<T>) {
  const [data, setData] = React.useState<IFinancials[]>();
  const { onImportComplete} = fileInputProps
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    parseExcelToFinancials(file, fileInputProps)
      .then((result) => {
        setData(result);
        if (onImportComplete) onImportComplete(result);
      })
      .catch((error) => console.error('Import failed:', error));
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

export default FileInput;
