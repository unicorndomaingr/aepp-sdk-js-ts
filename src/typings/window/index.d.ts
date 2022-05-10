
// ? SEE https://robkendal.co.uk/blog/how-to-fix-property-does-not-exist-on-window-type-in-typescript
export {}

declare global {
  interface Window {
    chrome: {
      runtime?: any
      chrome?: boolean
    }
    browser: {
      runtime?: any
      firefox?: boolean
    }
  }
}
