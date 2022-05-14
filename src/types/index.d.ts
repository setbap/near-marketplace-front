export {};

declare global {
  interface Window {
    contract: any;
    walletConnection: any;
    accountId: any;
    nearInitPromise: any;
  }
}
