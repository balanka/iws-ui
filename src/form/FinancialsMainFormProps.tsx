import { Dispatch, SetStateAction } from 'react';
import {IFinancials, IMasterfile, IAccount, IFmodule, ILineFinancials} from '../Models';
import { TFunction } from 'i18next';



export interface FinancialsMainFormProps {
  readonly collapse: boolean;
  readonly current: IFinancials;
  readonly setCurrent: (arg: IFinancials) => void;
  readonly t: TFunction<'translation', undefined>;
  readonly storeData: IMasterfile[];
  readonly accData: IAccount[];
  readonly modules: IFmodule[];
  readonly copyFromTransaction: IFinancials[];
  readonly handleModuleChange: (value: any) => void;
  readonly submitCopy: (id: bigint, modelid: number) => void;
  readonly accountFilter: string[];
  readonly oaccountFilter: string[];
  readonly currentLineFinancials: ILineFinancials;
  readonly setCurrentLineFinancials: Dispatch<SetStateAction<ILineFinancials>>;
  readonly height: number;
  readonly zIndex: number;
  readonly locale: string;
  readonly currency: string;
}


