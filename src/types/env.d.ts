// src/types/env.d.ts
export {};

declare global {
  interface Window {
    _env_: {
      API_URL: string;
      REACT_APP_API_BASE: string;
      REACT_APP_VERSION: string;
      NODE_ENV: string;
      [key: string]: string | undefined; // Allow any additional string properties
    };
  }
}
