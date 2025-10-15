/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    OpenBabelModule: any;
    OpenBabel: any;
  }
}

export const openBabelPromise: Promise<any> = new Promise((resolve) => {
  const checkOpenBabel = () => {
    if (window.OpenBabelModule) {
      const OpenBabel = window.OpenBabelModule();
      OpenBabel.onRuntimeInitialized = () => {
        console.log("OpenBabel initialized");
        window.OpenBabel = OpenBabel;
        resolve(OpenBabel);
      };
    } else {
      setTimeout(checkOpenBabel, 100);
    }
  };
  checkOpenBabel();
});
