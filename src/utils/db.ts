import Dexie, { Table } from 'dexie';
import {CompanyType, ICompany, IAccount, MenuItem} from '../Models';

export class AppDatabase extends Dexie {
  menu!:Table<MenuItem, string>;
  companies!: Table<CompanyType, string>;
  accounts!: Table<IAccount, string>;
  company!: Table<ICompany, string>;
  constructor() {
    super('MyAppDB');
    this.version(1).stores({
      menu: 'ctx, id, name, title, state, modelid',
      companies: 'id, name',
      accounts: 'id, name, account, company, modelid',
      company: 'id, modelid, company, name, description, enterdate, changedate, postingdate, street, zip, city, state, country, phone, email, taxCode, vatCode, currency, bankAcc, purchasingClearingAcc, salesClearingAcc, paymentClearingAcc, settlementClearingAcc, balanceSheetAcc, incomeStmtAcc, cashAcc, account, oaccount, accountName, oaccountName, pageHeaderText, headerText, pageFooterText, footerText, logoContent, logoName, contentType, contact, locale, fax'
    });
  }
}

export const db = new AppDatabase();
// Initialize default data only once
export async function initDefaultData() {
  // Check if companies table is empty
  const count = await db.companies.count();
  if (count === 0) {
    await db.companies.bulkAdd([
      { id: '1000', name: 'KABA Soft GmbH' },
      { id: '2000', name: 'KABA Soft CI' },
      { id: '3000', name: 'KABA Soft Guinea' },
      { id: '4000', name: 'KABA Soft Spain' },
      { id: '5000', name: 'SALAM' },
      { id: '5500', name: 'ETOILE CHANGE' },
      { id: '5600', name: 'SPI-GUINEE' },
      { id: '5700', name: 'SIMGUI SARL' }
    ]);
  }

  // Check if company table already has the '*' entry
  const starEntry = await db.company.get('');
  if (!starEntry) {
    await db.company.add({
      id: '',
      name: '',
      description: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: '',
      email: '',
      taxCode: '-1',
      vatCode: '-1',
      currency: '',
      bankAcc: '',
      purchasingClearingAcc: '',
      salesClearingAcc: '',
      paymentClearingAcc: '',
      settlementClearingAcc: '',
      balanceSheetAcc: '',
      incomeStmtAcc: '',
      cashAcc: '',
      account: '',
      oaccount: '',
      accountName: '',
      oaccountName: '',
      enterdate: new Date(),
      postingdate: new Date(),
      changedate: new Date(),
      modelid: 10,
      pageHeaderText: '',
      headerText: '',
      pageFooterText: '',
      footerText: '',
      logoContent: '',
      logoName: '',
      contentType: '',
      contact: '',
      locale: '',
      fax: '',
      company: '',
      bankaccounts: []
    });
  }
}

// Run the initialisation without blocking the module export
initDefaultData().catch(console.error);

// Expose for console debugging
(window as any).db = db;
