// src/utils/db.ts

import Dexie, { Table } from 'dexie';
import { CompanyType, ICompany, IAccount, MenuItem } from '../Models';

// ---------------------------------------------------------------------------
// Shared message
// ---------------------------------------------------------------------------

const IDB_UNAVAILABLE_MESSAGE =
  'IndexedDB is not available in this browser context. ' +
  'Please ensure you are not in Private Browsing, that "Block all cookies" ' +
  'is disabled in Safari settings, and that the certificate for this origin ' +
  'is trusted (or use https://localhost).';

// ---------------------------------------------------------------------------
// Database schema
// ---------------------------------------------------------------------------

export class AppDatabase extends Dexie {
  menu!: Table<MenuItem, string>;
  companies!: Table<CompanyType, string>;
  accounts!: Table<IAccount, string>;
  company!: Table<ICompany, string>;

  constructor() {
    super('MyAppDB');
    this.version(1).stores({
      menu: 'ctx, id, name, title, state, modelid',
      companies: 'id, name',
      accounts: 'id, name, account, company, modelid',
      company:
        'id, modelid, company, name, description, enterdate, changedate, ' +
        'postingdate, street, zip, city, state, country, phone, email, ' +
        'taxCode, vatCode, currency, bankAcc, purchasingClearingAcc, ' +
        'salesClearingAcc, paymentClearingAcc, settlementClearingAcc, ' +
        'balanceSheetAcc, incomeStmtAcc, cashAcc, account, oaccount, ' +
        'accountName, oaccountName, pageHeaderText, headerText, ' +
        'pageFooterText, footerText, logoContent, logoName, contentType, ' +
        'contact, locale, fax'
    });
  }
}

// ---------------------------------------------------------------------------
// Default company list (also used as fallback)
// ---------------------------------------------------------------------------

export const DEFAULT_COMPANIES: CompanyType[] = [
  { id: '1000', name: 'KABA Soft GmbH' },
  { id: '2000', name: 'KABA Soft CI' },
  { id: '3000', name: 'KABA Soft Guinea' },
  { id: '4000', name: 'KABA Soft Spain' },
  { id: '5000', name: 'SALAM' },
  { id: '5500', name: 'ETOILE CHANGE' },
  { id: '5600', name: 'SPI-GUINEE' },
  { id: '5700', name: 'SIMGUI SARL' }
];

// ---------------------------------------------------------------------------
// Lazy database accessor
// ---------------------------------------------------------------------------

let _db: AppDatabase | null = null;

/**
 * Returns a live AppDatabase instance, or null if IndexedDB is unavailable
 * in the current browser context (Private Browsing, "Block all cookies",
 * insecure origin, etc.).
 *
 * Safe to call at any time. The database is only constructed on first use.
 */
export function getDb(): AppDatabase | null {
  if (typeof indexedDB === 'undefined') return null;
  if (!_db) {
    try {
      _db = new AppDatabase();
    } catch (err) {
      console.error('Failed to construct AppDatabase:', err);
      return null;
    }
  }
  return _db;
}

// ---------------------------------------------------------------------------
// "Unavailable" recursive callable proxy
// ---------------------------------------------------------------------------

/**
 * Returns a callable that:
 *   - when called, returns a rejected Promise with a clear error
 *   - when a property is accessed on it (e.g. `.companies`, `.toArray`),
 *     returns another callable of the same kind.
 *
 * This makes chains like:
 *     db.companies.toArray().then(...).catch(...)
 * resolve to a rejected Promise, so the caller's `.catch` runs.
 */
function makeUnavailableCallable(): any {
  const fn: any = function () {
    /* placeholder target; never actually executed */
  };

  return new Proxy(fn, {
    get(_target, prop) {
      // Do not pretend to be a thenable; only the *result of a call*
      // is a Promise. This avoids `await db.companies` resolving weirdly.
      if (prop === 'then') return undefined;

      // Any property access returns another callable of the same kind.
      return makeUnavailableCallable();
    },
    apply() {
      // Calling anything returns a rejected Promise so `.catch` works.
      return Promise.reject(new Error(IDB_UNAVAILABLE_MESSAGE));
    }
  });
}

// ---------------------------------------------------------------------------
// `db` export — non-null typed, guarded at runtime
// ---------------------------------------------------------------------------

/**
 * Non-null typed proxy over AppDatabase.
 *
 * When IndexedDB is available, it behaves like a normal Dexie instance.
 * When IndexedDB is unavailable, any chain of property accesses ends in a
 * rejected Promise, so `.catch(...)` handlers run as expected and the app
 * does not crash at import time.
 */
export const db: AppDatabase = new Proxy({} as AppDatabase, {
  get(_target, prop) {
    const real = getDb();

    if (!real) {
      return makeUnavailableCallable();
    }

    const value = (real as any)[prop];
    return typeof value === 'function' ? value.bind(real) : value;
  }
});

// ---------------------------------------------------------------------------
// Default data initialisation
// ---------------------------------------------------------------------------

/**
 * Populates the local database with default companies and the placeholder
 * `company` row (id = ""). Safe to call multiple times.
 *
 * Does nothing (and logs a warning) if IndexedDB is unavailable.
 */
export async function initDefaultData(): Promise<void> {
  const d = getDb();

  if (!d) {
    console.warn(
      'IndexedDB unavailable — skipping default data initialisation.'
    );
    return;
  }

  // Seed companies once
  const count = await d.companies.count();
  if (count === 0) {
    await d.companies.bulkAdd(DEFAULT_COMPANIES);
  }

  // Seed the placeholder "*" company row
  const starEntry = await d.company.get('');
  if (!starEntry) {
    await d.company.add({
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

// ---------------------------------------------------------------------------
// Console debugging helper
// ---------------------------------------------------------------------------

if (typeof indexedDB !== 'undefined') {
  (window as any).db = getDb();
} else {
  console.warn(IDB_UNAVAILABLE_MESSAGE);
}
